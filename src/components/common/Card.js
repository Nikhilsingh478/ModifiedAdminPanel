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
        background: theme.palette.mode === "light" ? "#FFFFFF" : "#1B1F26",
        backdropFilter: theme.palette.mode === "light" ? "blur(6px)" : "blur(10px)",
        border: `1px solid ${theme.palette.mode === "light" ? "#D6DEE9" : "#2A2F3A"}`,
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'light' 
          ? '0 4px 16px -4px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.05)'
          : '0 4px 16px -4px rgba(0, 0, 0, 0.4), 0 2px 8px -2px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.palette.mode === 'light' 
            ? '0 8px 18px -10px rgba(15, 23, 42, 0.35)'
            : '0 8px 18px -10px rgba(0, 0, 0, 0.55)',
          borderColor: theme.palette.mode === 'light' ? 'rgba(148, 163, 184, 0.5)' : '#334155',
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
