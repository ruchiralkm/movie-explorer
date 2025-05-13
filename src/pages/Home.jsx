import { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { MovieContext } from "../context/MovieContext";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const {
    trendingMovies,
    searchResults,
    loading,
    error,
    lastSearch,
    hasMore,
    searchMoviesByQuery,
    loadTrendingMovies,
  } = useContext(MovieContext);

  const [showTrending, setShowTrending] = useState(true);

  useEffect(() => {
    if (searchResults.length > 0) {
      setShowTrending(false);
    } else {
      setShowTrending(true);
    }
  }, [searchResults]);

  const loadMore = () => {
    if (lastSearch) {
      searchMoviesByQuery(lastSearch, false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <SearchBar />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading && searchResults.length === 0 && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {showTrending ? (
        <>
          <Typography variant="h5" gutterBottom>
            Trending Movies
          </Typography>
          <Grid container spacing={3}>
            {trendingMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Search Results for "{lastSearch}"
          </Typography>
          <InfiniteScroll
            dataLength={searchResults.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
              </Box>
            }
            endMessage={
              <Typography variant="body1" align="center" my={2}>
                No more movies to load
              </Typography>
            }
          >
            <Grid container spacing={3}>
              {searchResults.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </>
      )}
    </Box>
  );
};

export default Home;
