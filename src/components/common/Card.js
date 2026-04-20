import React from "react";
import { Paper, useTheme } from "@mui/material";

const Card = ({ children, sx, ...props }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: '16px',
        background: '#1B1F26',
        backdropFilter: 'blur(10px)',
        border: '1px solid #2A2F3A',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'light' 
          ? '0 4px 16px -4px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.05)'
          : '0 4px 16px -4px rgba(0, 0, 0, 0.4), 0 2px 8px -2px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: theme.palette.mode === 'light' 
            ? '0 12px 32px -8px rgba(167, 243, 208, 0.15), 0 8px 16px -4px rgba(167, 243, 208, 0.1)'
            : '0 12px 32px -8px rgba(167, 243, 208, 0.2), 0 8px 16px -4px rgba(167, 243, 208, 0.15)',
          borderColor: '#A7F3D0',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #A7F3D0, #7DD3FC, #C4B5FD)',
          opacity: 0,
          transition: 'opacity 0.4s ease',
          borderRadius: '16px 16px 0 0',
        },
        '&:hover::before': {
          opacity: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(30, 58, 138, 0.05) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        },
        '&:hover::after': {
          opacity: 1,
        },
        ...sx 
      }} 
      {...props}
    >
      {children}
    </Paper>
  );
};

export default Card;
