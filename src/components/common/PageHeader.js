import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const PageHeader = ({ title, subtitle, actionButton }) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: { xs: "flex-start", sm: "center" }, 
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 1.5, sm: 0 },
        mb: { xs: 2.5, md: 4 },
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: { xs: -10, sm: -16 },
          left: 0,
          width: { xs: "48px", sm: "60px" },
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
            fontSize: { xs: "1.6rem", sm: "2rem" },
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
              fontSize: { xs: "0.9rem", sm: "1rem" },
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
        <Box
          sx={{
            ml: { xs: 0, sm: 2 },
            alignSelf: { xs: "stretch", sm: "center" },
            width: { xs: "100%", sm: "auto" },
            "& > *": {
              width: { xs: "100%", sm: "auto" },
            },
          }}
        >
          {actionButton}
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;
