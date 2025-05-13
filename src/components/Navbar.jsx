import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Favorite,
  Home,
  Login,
  Logout,
  Menu,
} from "@mui/icons-material";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const theme = useTheme();
  const { toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        backgroundColor: "white", // Force white for mobile drawer
        color: "black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: theme.spacing(2),
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6">Movie Explorer</Typography>
        </Link>
      </Box>
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <Home sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/favorites"
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <Favorite sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </ListItem>

        {user ? (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Logout sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem
            button
            component={Link}
            to="/login"
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon>
              <Login sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
      <Divider />
      <Box sx={{ padding: theme.spacing(2), textAlign: "center" }}>
        <IconButton color="inherit" onClick={toggleTheme}>
          {theme.palette.mode === "dark" ? (
            <Brightness7 sx={{ color: "black" }} />
          ) : (
            <Brightness4 sx={{ color: "black" }} />
          )}
        </IconButton>
        <Typography variant="body2" color="textPrimary">
          {theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "black", // Force black for desktop appbar
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}
          <Typography
            component={Link}
            variant="h6"
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Movie Explorer
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                color="inherit"
                component={Link}
                to="/"
                startIcon={<Home />}
                sx={{ mx: 1 }}
              >
                Home
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/favorites"
                startIcon={<Favorite />}
                sx={{ mx: 1 }}
              >
                Favorites
              </Button>

              {user ? (
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<Logout />}
                  sx={{ mx: 1 }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  startIcon={<Login />}
                  sx={{ mx: 1 }}
                >
                  Login
                </Button>
              )}

              <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
                {theme.palette.mode === "dark" ? (
                  <Brightness7 />
                ) : (
                  <Brightness4 />
                )}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 250,
              backgroundColor: "white", // Force white background
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Content padding for AppBar */}
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Navbar;
