






import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  useTheme
} from "@mui/material";
import { motion } from "framer-motion";

export default function General({ searchTerm }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [articles, setArticles] = useState([]);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const fetchWeatherNews = async () => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=weather&sortBy=publishedAt&language=en&apiKey=${API_KEY}`
      );
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching weather news:", error);
    }
  };

  useEffect(() => {
    fetchWeatherNews();
  }, []);

  const filteredNews = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 2,
        background: isDark
          ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
          : "linear-gradient(135deg, #cfd9df, #e2ebf0, #b0c4de)",
        backgroundSize: "600% 600%",
        animation: "gradientBG 15s ease infinite",
        color: isDark ? "#f0f0f0" : "#000"
      }}
    >
      <style>{`
        @keyframes gradientBG { 
          0% {background-position:0% 50%} 
          50% {background-position:100% 50%} 
          100% {background-position:0% 50%} 
        }
      `}</style>

      <AppBar position="sticky" sx={{ background: isDark ? "#1a1a1a" : "#1976d2" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            General News
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {filteredNews.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 345,
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    backgroundColor: isDark ? "#1c1c1c" : "#fff",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6
                    }
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
                        "&:hover": { transform: "scale(1.05)" }
                      }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: isDark ? "#fff" : "#000" }}>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color={isDark ? "grey.300" : "text.secondary"}>
                      {article.description || "No description available."}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 2 }}
                      href={article.url}
                      target="_blank"
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
    </Box>
  );
}
