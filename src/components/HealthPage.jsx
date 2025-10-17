// src/pages/HealthPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
  Box,
  Button,
  Divider,
} from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const healthArticles = [
  {
    title: "💧 Stay Hydrated",
    content: "Drinking enough water each day is crucial for many reasons: regulating body temperature, keeping joints lubricated, preventing infections, and delivering nutrients to cells.",
  },
  {
    title: "🏃‍♂️ Exercise Regularly",
    content: "Physical activity can improve your brain health, help manage weight, reduce the risk of disease, strengthen bones and muscles, and improve your ability to do everyday activities.",
  },
  {
    title: "🥗 Eat Balanced Meals",
    content: "A balanced diet includes a variety of food groups: fruits, vegetables, protein, dairy, and grains. Aim to make half your plate fruits and vegetables.",
  },
];

const HealthPage = ({searchTerm}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [API_KEY]);

  
     const filteredNews = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Top App Bar */}
      <AppBar position="sticky" color="primary" elevation={4}>
        <Toolbar>
          <HealthAndSafetyIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Health News
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4, maxWidth: '100%' }}>
        {/* Static Health Tips */}
        <Typography variant="h5" gutterBottom>
          🩺 Health & Wellness Tips
        </Typography>
        <Grid container spacing={4} sx={{ mb: 3 }}>
          {healthArticles.map((article, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.content}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Latest News */}
        <Typography variant="h5" gutterBottom>
          📰 Latest Health News
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center"  width={100} mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredNews.map((article, index) => (
              <Grid item key={index}   xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                 maxWidth: 345,
                  borderRadius: 3,
                  boxShadow: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                    boxShadow: 4,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 6,
                    },
                  }}
                >
                  {/* Image */}
                  {article.urlToImage && (
                    <CardMedia
                      component="img"
                      image={article.urlToImage}
                      alt={article.title}
                      sx={{
                        height: 180,
                        objectFit: 'cover',
                         width:'100'
                      }}
                    />
                  )}

                  {/* Content + Button */}
                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }} noWrap>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.description?.slice(0, 100)}...
                      </Typography>
                    </CardContent>

                    <Box textAlign="center" pb={2}>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default HealthPage;
