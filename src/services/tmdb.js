import axios from "axios";

const API_KEY = "459b3176a801d99efaf2f8868aeeb93f";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await api.get("/trending/movie/week");
    return data.results.map((movie) => ({
      ...movie,
      poster_path: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : null,
    }));
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const { data } = await api.get("/search/movie", {
      params: {
        query,
        page,
      },
    });
    return data.results.map((movie) => ({
      ...movie,
      poster_path: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : null,
    }));
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const { data } = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: "videos,credits",
      },
    });

    return {
      ...data,
      poster_path: data.poster_path
        ? `${IMAGE_BASE_URL}${data.poster_path}`
        : null,
      backdrop_path: data.backdrop_path
        ? `${IMAGE_BASE_URL}${data.backdrop_path}`
        : null,
      trailer: data.videos.results.find((video) => video.type === "Trailer"),
      cast: data.credits.cast.slice(0, 10).map((actor) => ({
        ...actor,
        profile_path: actor.profile_path
          ? `${IMAGE_BASE_URL}${actor.profile_path}`
          : null,
      })),
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
