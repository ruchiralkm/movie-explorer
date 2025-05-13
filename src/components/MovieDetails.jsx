import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Chip,
  Grid,
  Paper,
  Avatar,
  Divider,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Favorite, FavoriteBorder, PlayArrow } from "@mui/icons-material";
import { MovieContext } from "../context/MovieContext";

const MovieDetails = () => {
  const { id } = useParams();
  const {
    movieDetails,
    loading,
    error,
    toggleFavorite,
    favorites,
    loadMovieDetails,
  } = useContext(MovieContext);
  const isFavorite = favorites.some((fav) => fav.id === movieDetails?.id);

  useEffect(() => {
    if (id) {
      loadMovieDetails(id);
    }
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box my={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!movieDetails) {
    return null;
  }

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={movieDetails.poster_path || "/placeholder-movie.png"}
              alt={movieDetails.title}
            />
            <CardContent>
              <Button
                fullWidth
                variant="contained"
                startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                onClick={() => toggleFavorite(movieDetails)}
                sx={{ mb: 2 }}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
              {movieDetails.trailer && (
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PlayArrow />}
                  component="a"
                  href={`https://www.youtube.com/watch?v=${movieDetails.trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Trailer
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom>
            {movieDetails.title}
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Rating
              value={movieDetails.vote_average / 2}
              precision={0.5}
              readOnly
            />
            <Typography variant="body1" ml={1}>
              {movieDetails.vote_average.toFixed(1)} ({movieDetails.vote_count}{" "}
              votes)
            </Typography>
            <Typography variant="body1" ml={2}>
              {movieDetails.runtime} min
            </Typography>
            <Typography variant="body1" ml={2}>
              {movieDetails.release_date}
            </Typography>
          </Box>
          <Box mb={3}>
            {movieDetails.genres?.map((genre) => (
              <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <Typography paragraph>{movieDetails.overview}</Typography>

          {movieDetails.cast?.length > 0 && (
            <>
              <Typography variant="h6" gutterBottom mt={4}>
                Cast
              </Typography>
              <Grid container spacing={2}>
                {movieDetails.cast.map((actor) => (
                  <Grid item xs={6} sm={4} md={3} key={actor.id}>
                    <Paper sx={{ p: 2, display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={actor.profile_path}
                        alt={actor.name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1">
                          {actor.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {actor.character}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieDetails;
