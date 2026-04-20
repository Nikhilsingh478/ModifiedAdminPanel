import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const PageHeader = ({ title, subtitle, actionButton }) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        mb: 4,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -16,
          left: 0,
          width: '60px',
          height: '3px',
          background: 'linear-gradient(90deg, #A7F3D0, #7DD3FC)',
          borderRadius: '2px',
        }
      }}
    >
      <Box>
        <Typography 
          variant="h4" 
          sx={{
            fontWeight: 800,
            background: theme.palette.mode === 'light' 
              ? 'linear-gradient(135deg, #A7F3D0 0%, #7DD3FC 100%)'
              : 'linear-gradient(135deg, #7DD3FC 0%, #A7F3D0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            mb: 1,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="body1" 
            color="textSecondary" 
            sx={{ 
              mt: 0.5,
              fontSize: '1rem',
              fontWeight: 500,
              opacity: 0.8,
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {actionButton && (
        <Box sx={{ ml: 2 }}>
          {actionButton}
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;
