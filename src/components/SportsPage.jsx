// src/pages/SportsPage.jsx
import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Tabs,
  Tab,
  Box
} from "@mui/material";

// ✅ Local Pakistani sports news
import { localSportsNews } from "../Apidata/Sports";

export default function SportsPage({ searchTerm }) {
  const [tabValue, setTabValue] = useState(0);
  const [internationalSports, setInternationalSports] = useState([]);
  const [loading, setLoading] = useState(false); // only for API

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchInternationalNews = async () => {
      if (!apiKey) return;

      setLoading(true);
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?category=sports&language=en&apiKey=${apiKey}`
        );
        const data = await res.json();
        setInternationalSports(data.articles || []);
      } catch (err) {
        console.error("Error fetching international news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternationalNews();
  }, [apiKey]);

  // 👇 Choose dataset
  const sportsData = tabValue === 0 ? localSportsNews : internationalSports;

  // 🔍 Search filter
  const search = searchTerm?.trim().toLowerCase() || "";
  const filteredNews = search
    ? sportsData.filter((article) =>
        article.title?.toLowerCase().includes(search)
      )
    : sportsData;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Sports News
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="🇵🇰 Local (Pakistani)" />
        <Tab label="🌍 International" />
      </Tabs>

      {loading && tabValue === 1 ? (
        <Typography>Loading international sports news...</Typography>
      ) : filteredNews.length > 0 ? (
        <Grid container spacing={2}>
          {filteredNews.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: 3,
                  boxShadow: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {(article.urlToImage || article.image) && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={article.urlToImage || article.image}
                    alt={article.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" noWrap>
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1,
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    {article.description}
                  </Typography>

                  {/* 🧡 Show likes for local news */}
                  {tabValue === 0 && article.likes !== undefined && (
                    <Typography variant="body2" color="text.secondary">
                      ❤️ {article.likes} Likes
                    </Typography>
                  )}

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    {new Date(
                      article.publishedAt || article.date
                    ).toLocaleDateString()}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    href={article.url || "#"}
                    target="_blank"
                    disabled={!article.url}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No sports news found.
        </Typography>
      )}
    </Box>
  );
}
