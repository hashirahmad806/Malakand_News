
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
} from "@mui/material";
import { motion } from "framer-motion";
export default function SciNewsPage({ searchTerm }) {
  const [articles, setArticles] = useState([]);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const fetchScienceNews = async () => {
    try {
      const query = encodeURIComponent(
        "science OR space OR physics OR chemistry OR biology OR astronomy OR research OR innovation"
      );

      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${API_KEY}`
      );
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching science news:", error);
    }
  };

  useEffect(() => {
    fetchScienceNews();
  }, []);

  const filteredNews = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: "transparent", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ background: "#0288d1" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Science News
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Intro Section */}
      <Container sx={{ py: 4, bgcolor: " #0288d1" }}>
        <Typography variant="h4" gutterBottom>
          Exploring the Frontiers of Science
        </Typography>
        <Typography variant="body1" paragraph>
          Science is the key to understanding our universe, from the smallest
          particles to the largest galaxies. Here, you'll find the latest
          discoveries, breakthroughs, and research from around the world.
        </Typography>
        <Typography variant="body1" paragraph>
          Whether it's groundbreaking space missions, innovative medical
          research, or new technological advancements, our curated news keeps
          you informed about how science is shaping the future.
        </Typography>
      </Container>

      <Container
  maxWidth="lg"
  sx={{
    py: 6,
    backgroundColor: "transparent", // Transparent background
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
              <Typography
                variant="body2"
                sx={{
                  color: "#2c3e50", // Deep news-like color
                  fontWeight: 500, // Slightly bold
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
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
                    // backgroundColor: mode === "light" ? "#1565c0" : "#64b5f6",
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

    </Box>
  );
}
