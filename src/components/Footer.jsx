import React from 'react';
import { Box, Typography, IconButton, Tooltip, Stack, useTheme } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // TikTok

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0c151f 0%, #1a2733 50%, #223344 100%)'
          : 'linear-gradient(135deg, #f5f9ff 0%, #dbe9f4 50%, #b8d8f7 100%)',
        color: theme.palette.text.primary,
        py: 6,
        mt: 6,
        textAlign: 'center',
        borderTop: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.4s ease',
      }}
    >
      {/* Tagline */}
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
        Malakand News — Stay Informed, Stay Ahead
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: theme.palette.text.secondary }}>
        Bringing you the latest headlines from around the world, 24/7.
      </Typography>

      {/* Social Icons */}
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 4 }}>
        {[
          { icon: <InstagramIcon />, url: 'https://www.instagram.com', color: '#E1306C' },
          { icon: <MusicNoteIcon />, url: 'https://www.tiktok.com', color: '#000' },
          { icon: <FacebookIcon />, url: 'https://www.facebook.com', color: '#1877F2' },
          { icon: <LinkedInIcon />, url: 'https://www.linkedin.com', color: '#0A66C2' },
          { icon: <YouTubeIcon />, url: 'https://www.youtube.com', color: '#FF0000' },
        ].map(({ icon, url, color }, idx) => (
          <Tooltip key={idx} title={url.split('//')[1].split('.')[0]} arrow>
            <IconButton
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#fff',
                backgroundColor: color,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: `0 0 15px ${color}`,
                  transform: 'scale(1.1)',
                },
              }}
            >
              {icon}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>

      {/* Footer Links (Optional) */}
      <Stack direction="row" justifyContent="center" spacing={3} sx={{ mb: 3 }}>
        <Typography variant="body2" component='a' href="#" sx={{ textDecoration: 'none', color: theme.palette.text.secondary, '&:hover': { textDecoration: 'underline' } }}>
          About
        </Typography>
        <Typography variant="body2" component='a' href="#" sx={{ textDecoration: 'none', color: theme.palette.text.secondary, '&:hover': { textDecoration: 'underline' } }}>
          Privacy Policy
        </Typography>
        <Typography variant="body2" component='a' href="#" sx={{ textDecoration: 'none', color: theme.palette.text.secondary, '&:hover': { textDecoration: 'underline' } }}>
          Contact
        </Typography>
      </Stack>

      {/* Copyright */}
      <Typography variant="caption" display="block" sx={{ color: theme.palette.text.secondary }}>
        &copy; {new Date().getFullYear()} Malakand News. All rights reserved.
      </Typography>
    </Box>
  );
}
