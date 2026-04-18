import React from "react";
import { Paper } from "@mui/material";

const Card = ({ children, sx, ...props }) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 3, 
        borderRadius: '12px', 
        ...sx 
      }} 
      {...props}
    >
      {children}
    </Paper>
  );
};

export default Card;
