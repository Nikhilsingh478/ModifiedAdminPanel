import React from "react";
import { Paper } from "@mui/material";

const Card = ({ children, sx, ...props }) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 2, 
        borderRadius: 2, 
        ...sx 
      }} 
      {...props}
    >
      {children}
    </Paper>
  );
};

export default Card;
