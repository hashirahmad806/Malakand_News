// components/NewsCard.jsx
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Badge
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function NewsCard({ article }) {
  const { title, description, url, urlToImage, publishedAt, source } = article;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 4,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8
        }
      }}
    >
      {urlToImage && (
        <CardMedia
          component="img"
          height="160"
          image={urlToImage}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Tooltip title={title}>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {title}
          </Typography>
        </Tooltip>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mt: 1
          }}
        >
          {description}
        </Typography>

        <Typography variant="caption" color="text.secondary" mt={2}>
          {new Date(publishedAt).toLocaleDateString()} | {source?.name}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
        <Button
          size="small"
          href={url}
          target="_blank"
          variant="outlined"
          color="primary"
        >
          Read More
        </Button>
        <IconButton>
          <Badge badgeContent={Math.floor(Math.random() * 100)} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </CardActions>
    </Card>
  );
}
