







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
  Stack,
  useTheme,
} from "@mui/material";

export default function EntertainmentNewsPage({ searchTerm }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [articles, setArticles] = useState([]);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const fetchEntertainmentNews = async () => {
    try {
      const query = encodeURIComponent(
        "entertainment OR movies OR music OR celebrities OR hollywood OR bollywood OR tv shows OR film"
      );

      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${API_KEY}`
      );
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching entertainment news:", error);
    }
  };

  useEffect(() => {
    fetchEntertainmentNews();
  }, []);

  const filteredNews = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Featured YouTube video (replace with a trending entertainment video)
  const featuredVideoId = "2Vv-BfVoq4g"; // example video

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 2,
        background: isDark
          ? "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
          : "linear-gradient(135deg, #fefefe, #f5f5f5, #dcdcdc)",
        backgroundSize: "600% 600%",
        animation: "gradientBG 15s ease infinite",
        color: isDark ? "#f0f0f0" : "#000",
      }}
    >
      <style>{`
        @keyframes gradientBG { 
          0% {background-position:0% 50%} 
          50% {background-position:100% 50%} 
          100% {background-position:0% 50%} 
        }
      `}</style>

      {/* Navbar */}
      <AppBar position="sticky" sx={{ background: isDark ? "#1a1a1a" : "#1976d2" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Entertainment News
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Featured Video Hero */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ position: "relative", height: { xs: "50vw", md: "50vh" }, mb: 4 }}>
          <iframe
            src={`https://www.youtube.com/embed/${featuredVideoId}?autoplay=0&mute=1&controls=1&rel=0`}
            title="Featured Entertainment Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "0", borderRadius: 8 }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
              color: "#fff",
              p: 2,
              borderRadius: "0 0 8px 8px",
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Featured Entertainment Video
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Watch trending clips from music, movies, and celebrities.
            </Typography>
          </Box>
        </Box>

        {/* Intro Paragraph */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Entertainment & Celebrity Updates
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
            Stay in the loop with the latest in movies, music, TV shows, and celebrity gossip.
            We bring you breaking stories, behind-the-scenes insights, and all the buzz from
            Hollywood, Bollywood, and global entertainment.
          </Typography>
        </Box>

        {/* News Grid */}
        <Grid container spacing={4}>
          {filteredNews.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: isDark ? "#fff" : "#000" }}
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={isDark ? "grey.300" : "text.secondary"}
                  >
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
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
