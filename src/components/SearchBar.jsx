import { useState, useContext, useEffect } from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { MovieContext } from "../context/MovieContext";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { searchMoviesByQuery, lastSearch } = useContext(MovieContext);

  useEffect(() => {
    if (lastSearch) {
      setQuery(lastSearch);
    }
  }, [lastSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchMoviesByQuery(query, true);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
