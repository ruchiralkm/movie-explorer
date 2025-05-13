import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { CssBaseline, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MoviePage from "./pages/MoviePage";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Box>
  );
}

export default App;
