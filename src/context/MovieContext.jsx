import { createContext, useState, useEffect } from "react";
import {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
} from "../services/tmdb";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lastSearch, setLastSearch] = useState("");

  useEffect(() => {
    const storedFavorites = localStorage.getItem("movieExplorerFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const storedLastSearch = localStorage.getItem("movieExplorerLastSearch");
    if (storedLastSearch) {
      setLastSearch(storedLastSearch);
    }

    loadTrendingMovies();
  }, []);

  const loadTrendingMovies = async () => {
    setLoading(true);
    try {
      const movies = await fetchTrendingMovies();
      setTrendingMovies(movies);
      setError(null);
    } catch (err) {
      setError("Failed to load trending movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const searchMoviesByQuery = async (query, newSearch = true) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const currentPage = newSearch ? 1 : page + 1;
      const results = await searchMovies(query, currentPage);

      if (newSearch) {
        setSearchResults(results);
        setPage(1);
        setLastSearch(query);
        localStorage.setItem("movieExplorerLastSearch", query);
      } else {
        setSearchResults((prev) => [...prev, ...results]);
        setPage(currentPage);
      }

      setHasMore(results.length > 0);
      setError(null);
    } catch (err) {
      setError("Failed to search movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadMovieDetails = async (id) => {
    setLoading(true);
    try {
      const details = await fetchMovieDetails(id);
      setMovieDetails(details);
      setError(null);
    } catch (err) {
      setError("Failed to load movie details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(
      "movieExplorerFavorites",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        searchResults,
        movieDetails,
        favorites,
        loading,
        error,
        lastSearch,
        hasMore,
        loadTrendingMovies,
        searchMoviesByQuery,
        loadMovieDetails,
        toggleFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
