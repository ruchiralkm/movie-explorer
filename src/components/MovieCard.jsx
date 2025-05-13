import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Rating,
  Grow,
  styled,
  Tooltip,
  Zoom,
} from "@mui/material";
import { Favorite, FavoriteBorder, Info } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
}));

const MovieCard = ({ movie, index }) => {
  const { favorites, toggleFavorite } = useContext(MovieContext);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <Grow in timeout={500 + (index % 10) * 100}>
      <StyledCard>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="400" // Fixed height with proper aspect ratio
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder-movie.png"
            }
            alt={movie.title}
            sx={{
              objectFit: "cover",
              width: "100%",
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 20%)",
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "white",
                fontWeight: "bold",
                textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
                lineHeight: 1.2,
              }}
            >
              {movie.title}
            </Typography>
            <Box display="flex" alignItems="center" mt={0.5}>
              <Rating
                value={movie.vote_average / 2}
                precision={0.5}
                readOnly
                size="small"
                sx={{
                  "& .MuiRating-icon": {
                    color: "white",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  ml: 1,
                  fontWeight: "bold",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                }}
              >
                {movie.vote_average.toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, px: 2, py: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="text.secondary">
              {movie.release_date?.split("-")[0] || "N/A"}
            </Typography>
            {movie.original_language && (
              <Tooltip
                title="Original language"
                arrow
                TransitionComponent={Zoom}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    px: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {movie.original_language}
                </Typography>
              </Tooltip>
            )}
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            size="small"
            startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
            onClick={() => toggleFavorite(movie)}
            sx={{
              flexGrow: 1,
              justifyContent: "flex-start",
              color: isFavorite ? "error.main" : "inherit",
            }}
          >
            {isFavorite ? "Favorite" : "Add"}
          </Button>
          <Tooltip title="View details" arrow TransitionComponent={Zoom}>
            <Button
              size="small"
              component={Link}
              to={`/movie/${movie.id}`}
              variant="contained"
              color="primary"
              startIcon={<Info />}
              sx={{
                minWidth: "unset",
                px: 1.5,
              }}
            >
              <span className="sr-only">Details</span>
            </Button>
          </Tooltip>
        </CardActions>
      </StyledCard>
    </Grow>
  );
};

export default MovieCard;
