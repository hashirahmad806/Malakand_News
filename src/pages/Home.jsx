



import React, { useEffect, useState, useMemo } from "react";
import {
  Box, Button, Card, CardActionArea, CardContent, CardMedia,
  Container, Dialog, IconButton, Grid, Stack, Typography,
  useMediaQuery, useTheme, Fab
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { motion } from "framer-motion";

export default function Home({ searchTerm }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [articles, setArticles] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [error, setError] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [openVideo, setOpenVideo] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState("");

  const featuredVideoId = "JpYA7WXkHyI";
  const extraVideoIds = ["YWGZ12ohMJU", "dQw4w9WgXcQ", "w4rG5GY9IlA", "wv779vmyPVY", "nQp1ZSrzZQE", "hHW1oY26kxQ",
     "ogcSQ-cFRVM",
    "aqz-KE-bpKQ",
    "Cf6CHpLbf5w",
    "msCLJBLooXo",
    "hmtuvNfytjM" ,"o3K_HbpWNpg"
  ];

  const headlines = useMemo(() => [
    "Breaking News. Clear. Fast.",
    "Your Window to the World.",
    "Stories That Matter — Daily."
  ], []);
  const [headlineIndex, setHeadlineIndex] = useState(0);

  // slower headline rotation
  useEffect(() => {
    const t = setInterval(() => setHeadlineIndex(i => (i + 1) % headlines.length), 6000);
    return () => clearInterval(t);
  }, [headlines.length]);

  // Load news articles + dummy extra
  useEffect(() => {
    async function load() {
      try {
        setLoadingNews(true);
        setError("");
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`);
        const data = await res.json();
        if (data?.status !== "ok") throw new Error(data?.message || "Failed to fetch news");
        const extraDummy = Array.from({ length: 6 }, (_, i) => ({
          title: `Random News Article ${i+1}`,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
          urlToImage: `https://picsum.photos/400/200?random=${i+10}`,
          url: "#",
          publishedAt: new Date().toISOString(),
          source: { name: "Random Source" }
        }));
        setArticles([...data.articles, ...extraDummy]);
      } catch (e) {
        setError(e.message || "Something went wrong fetching news.");
      } finally {
        setLoadingNews(false);
      }
    }
    load();
  }, []);

  const filteredArticles = articles.filter(a =>
    a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Back to top
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: isDark ? "#121212" : "#f4f6f8", color: theme.palette.text.primary }}>

      {/* Breaking News Ticker */}
      <Box sx={{
        bgcolor: isDark ? "#222" : "#f5dc52ff",
        color: isDark ? "#fff" : "#000",
        py: 0.5,
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontWeight: 600
      }}>
        <Box component="div" sx={{ display: "inline-block", animation: "ticker 50s linear infinite" }}>
          {articles.map((a, i) => (
            <span key={i} style={{ marginRight: 50 }}>{a.title}</span>
          ))}
        </Box>
      </Box>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {/* Hero Video */}
      <Box sx={{ position: "relative", height: { xs: "56vw", md: "70vh" }, overflow: "hidden", bgcolor: isDark ? "#000" : "#e3f2fd" }}>
        <iframe
          src={`https://www.youtube.com/embed/${featuredVideoId}?autoplay=1&mute=1&rel=0`}
          title="Featured News"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: 0 }}
        />
      </Box>

      {/* Featured Videos */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Featured Videos</Typography>
        <Grid container spacing={3}>
          {extraVideoIds.map((id, i) => (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <Card component={motion.div} whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(0,0,0,0.2)" }} sx={{ borderRadius: 3, cursor: "pointer", backgroundColor: isDark ? "#1a1a1a" : "#fff" }}>
                <CardActionArea onClick={() => openModal(id, `Video ${i + 1}`)}>
                  <CardMedia component="img" height="200" image={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={`Video ${i + 1}`} />
                  <CardContent>
                    <Typography variant="h6" color={isDark ? "#fff" : "text.primary"}>News Video {i + 1}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>Tap to play — a quick briefing.</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Latest News Articles */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Latest Headlines</Typography>
        {error && <Box sx={{ p: 2, mb: 3, borderRadius: 2, border: "1px solid", borderColor: "error.light", color: "error.main" }}>{error}</Box>}
        {loadingNews ? (
          <Grid container spacing={3}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box sx={{ height: 280, borderRadius: 3, backgroundColor: isDark ? "#222" : "#eaeaea" }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {filteredArticles.map((a, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card component={motion.div} whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0,0,0,0.15)" }} sx={{ borderRadius: 3, backgroundColor: isDark ? "#1a1a1a" : "#fff", maxWidth: 345 }}>
                  {a.urlToImage && <CardMedia component="img" height="200" image={a.urlToImage} alt={a.title} />}
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: .5 }}>{new Date(a.publishedAt).toLocaleString()}</Typography>
                    <Typography variant="h6" sx={{ mb: 1 }}>{a.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {a.description?.length > 120 ? a.description.slice(0, 120) + "..." : a.description}
                    </Typography>
                    <Button size="small" variant="contained" href={a.url} target="_blank" sx={{ mt: 1 }}>Read More</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Back to top button */}
      {showBackToTop && (
        <Fab color="primary" size="small" onClick={scrollToTop} sx={{ position: "fixed", bottom: 30, right: 30 }}>
          <KeyboardArrowUpIcon />
        </Fab>
      )}

      {/* Video Modal */}
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
              key={activeVideoId}
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=1&rel=0`}
              title={activeVideoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "80%",
                border: 0,
              }}
            />
          )}
        </Box>
      </Dialog>

    </Box>
  );
}
