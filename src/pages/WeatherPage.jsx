// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   Box,
// } from "@mui/material";

// export default function WeatherNewsPage({searchTerm}) {
//   const [articles, setArticles] = useState([]);
//   const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

//   const fetchWeatherNews = async () => {
//     try {
//       const keywords = [
//         "weather",
//         "climate",
//         "flood",
//         "storm",
//         "hurricane",
//         "rainfall",
//         "cyclone",
       
//       ];

//       let allArticles = [];

//       // Fetch for each keyword and merge results
//       for (let keyword of keywords) {
//         const res = await fetch(
//           `https://newsapi.org/v2/everything?q=${encodeURIComponent(
//             keyword
//           )}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${API_KEY}`
//         );
//         const data = await res.json();
//         if (data.articles) {
//           allArticles = [...allArticles, ...data.articles];
//         }
//       }

//       // Remove duplicates based on title
//       const uniqueArticles = Array.from(
//         new Map(allArticles.map((item) => [item.title, item])).values()
//       );

//       // Sort by latest publish date
//       uniqueArticles.sort(
//         (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
//       );

//       setArticles(uniqueArticles);
//     } catch (error) {
//       console.error("Error fetching weather news:", error);
//     }
//   };
  

//   useEffect(() => {
//     fetchWeatherNews();
//   }, []);

    
//      const filteredNews = articles.filter(
//     (article) =>
//       article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       article.description?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
//       <AppBar position="sticky" sx={{ background: "#1976d2" }}>
//         <Toolbar>
//           <Typography variant="h5" sx={{ flexGrow: 1 }}>
//             Weather & Climate News
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Container   maxWidth='lg' sx={{ py: 4 }}>
//         <Grid container spacing={4}>
//           {filteredNews.map((article, index) => (
//             <Grid item xs={14} sm={6} md={3} key={index}  maxWidth='lg'>
//               <Card sx={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 maxWidth: 345,
                
//                    boxShadow: 3,
//                         borderRadius: 2,
//                         // overflow: "hidden",
//                         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                         "&:hover": {
//                           transform: "translateY(-5px)",
//                           boxShadow: 6,
//                         },
                
//               }}>
//                 {article.urlToImage && (
                 
                  
                  
//                   <CardMedia
//                     component="img"
//                     height="200"
//                      sx={{
//                             transition: "transform 0.4s ease",
//                             "&:hover": { transform: "scale(1.05)" },
//                           }}
//                     image={article.urlToImage}
//                     alt={article.title}
//                   />
//                 )}
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography variant="h6" gutterBottom>
//                     {article.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {article.description || "No description available."}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     size="small"
//                     sx={{ mt: 2 }}
//                     href={article.url}
//                     target="_blank"
//                   >
//                     Read More
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }






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
} from "@mui/material";

export default function WeatherNewsPage({ searchTerm }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [articles, setArticles] = useState([]);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const fetchWeatherNews = async () => {
    try {
      const keywords = [
        "weather",
        "climate",
        "flood",
        "storm",
        "hurricane",
        "rainfall",
        "cyclone",
      ];

      let allArticles = [];

      for (let keyword of keywords) {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            keyword
          )}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${API_KEY}`
        );
        const data = await res.json();
        if (data.articles) {
          allArticles = [...allArticles, ...data.articles];
        }
      }

      // Remove duplicates based on title
      const uniqueArticles = Array.from(
        new Map(allArticles.map((item) => [item.title, item])).values()
      );

      // Sort by latest publish date
      uniqueArticles.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      setArticles(uniqueArticles);
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

      <AppBar position="sticky" sx={{ background: isDark ? "#1a1a1a" : "#1976d2" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Weather & Climate News
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Intro paragraph */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Stay Updated on Weather and Climate
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
            From local storms to global climate changes, we bring you the latest news, insights, and
            analysis about weather patterns, natural disasters, and environmental shifts. Stay informed
            and prepared with accurate, up-to-date reporting from trusted sources.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {filteredNews.map((article, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
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
