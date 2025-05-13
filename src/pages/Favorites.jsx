import { useContext } from "react";
import { Grid, Box, Typography, Alert } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../context/MovieContext";

const Favorites = () => {
  const { favorites } = useContext(MovieContext);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Movies
      </Typography>

      {favorites.length === 0 ? (
        <Alert severity="info">
          You haven't added any movies to your favorites yet.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
