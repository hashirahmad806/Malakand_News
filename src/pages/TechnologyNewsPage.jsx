

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
  useTheme,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

export default function TechnologyNewsPage({ searchTerm }) {
  const theme = useTheme();
  const [articles, setArticles] = useState([]);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  // Video Modal state
  const [openVideo, setOpenVideo] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState("");

  // Demo video IDs
  const extraVideoIds = [
    "ogcSQ-cFRVM",
    "aqz-KE-bpKQ",
    "Cf6CHpLbf5w",
    "msCLJBLooXo",
    "w4rG5GY9IlA",
    "dQw4w9WgXcQ",
   "YWGZ12ohMJU","2Vv-BfVoq4g","w4rG5GY9IlA","wv779vmyPVY","nQp1ZSrzZQE","hHW1oY26kxQ" ,"hmtuvNfytjM"  ,"o3K_HbpWNpg"
    
  ];

  const fetchTechNews = async () => {
    try {
      const query = encodeURIComponent(
        "technology OR tech OR gadgets OR AI OR artificial intelligence OR software OR hardware OR programming"
      );
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${API_KEY}`
      );
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching technology news:", error);
    }
  };

  useEffect(() => {
    fetchTechNews();
  }, []);

  const filteredNews = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  // Video Modal functions
  const openModal = (id, title) => {
    setActiveVideoId(id);
    setActiveVideoTitle(title);
    setOpenVideo(true);
  };
  const closeModal = () => {
    setOpenVideo(false);
    setActiveVideoId(null);
    setActiveVideoTitle("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor:
          theme.palette.mode === "dark" ? "#0c0c0c" : "#f4f6f8",
        color: theme.palette.text.primary,
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Navbar */}
      <AppBar position="sticky" sx={{ background: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Technology News
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Hero Video autoplay */}
      <Box sx={{ position: "relative", height: { xs: "50vh", md: "60vh" }, bgcolor: "#000" }}>
        <iframe
          src={`https://www.youtube.com/embed/${extraVideoIds[0]}?autoplay=1&mute=1&controls=1&rel=0`}
          title="Featured Tech Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: 0 }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)",
            display: "flex",
            alignItems: "flex-end",
            p: 3,
          }}
        >
          <Typography variant="h4" fontWeight={700} color="white">
            Top Technology Trends
          </Typography>
        </Box>
      </Box>

      {/* Intro Paragraphs */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="body1" sx={{ mb: 2, fontSize: "1.1rem" }}>
          Stay updated with cutting-edge technology news, AI breakthroughs, software releases, and hardware reviews.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem" }}>
          Explore videos, tutorials, and expert insights to keep ahead in the tech world. Click any video below to watch instantly!
        </Typography>
      </Container>




       {/* Video Gallery */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          Explore More Videos
        </Typography>
        <Grid container spacing={3}>
          {extraVideoIds.map((id, index) => (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  sx={{
                    cursor: "pointer",
                    borderRadius: 2,
                    boxShadow: 3,
                    "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                  }}
                  onClick={() => openModal(id, `Tech Video ${index + 1}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                    alt={`Tech Video ${index + 1}`}
                  />
                  <CardContent>
                    <Typography variant="h6">Tech Video {index + 1}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tap to watch in popup
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>


      {/* Top Technology News Articles */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          Latest Tech Articles
        </Typography>
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
                    maxWidth: 330,
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

     
      {/* Video Modal with autoplay */}
      <Dialog
        open={openVideo}
        onClose={closeModal}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <Box sx={{ position: "relative", pt: "56.25%" }}>
          <IconButton
            onClick={closeModal}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}
          >
            <CloseIcon />
          </IconButton>
          {activeVideoId && (
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
              title={activeVideoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
}
