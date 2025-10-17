
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CssBaseline,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";



export default function BusinessNews(     {searchTerm , parentMode}) {
  const [mode, setMode] = useState(parentMode || "light");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (parentMode) setMode(parentMode);
  }, [parentMode]);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setArticles(data.articles || []))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "background-color 0.4s ease, color 0.4s ease",
          },
        },
      },
    },
  });

     const filteredNews = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Business News
          </Typography>
          {!parentMode && (
            <IconButton
              color="inherit"
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            >
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Container
  maxWidth="lg"
  sx={{
    py: 6,
    backgroundColor: "transparent", // ✅ Transparent background
    boxShadow: "none", // ✅ Remove any default shadows
  }}
>
  <Grid container spacing={3}>
    {filteredNews.map((article, index) => (
      <Grid item xs={12} sm={4} md={2} key={index}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.07 }}
        >
          <Card
            sx={{
              height: "110%",
              maxWidth: 330,
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
              borderRadius: 2,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            {article.urlToImage && (
              <CardMedia
                component="img"
                height="200"
                image={article.urlToImage}
                alt={article.title}
                sx={{
                  transition: "transform 0.4s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.description || "No description available."}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                href={article.url}
                target="_blank"
                sx={{
                  mt: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: mode === "light" ? "#1565c0" : "#64b5f6",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    ))}
  </Grid>
</Container>

        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}
