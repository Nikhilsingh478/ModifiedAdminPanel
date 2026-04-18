import React from "react";
import { Paper } from "@mui/material";

const Card = ({ children, sx, ...props }) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 3, 
        borderRadius: '12px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          elevation: 3,
          transform: 'translateY(-2px)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, primary.main, secondary.main)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover::before': {
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
