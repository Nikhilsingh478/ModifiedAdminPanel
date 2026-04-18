import React from "react";
import { Box, Typography } from "@mui/material";

const StatusBadge = ({ status }) => {
  let bgColor = "#f1f5f9";
  let color = "#475569";
  
  const s = status ? status.toLowerCase() : "";
  
  if (s === "active" || s === "delivered") {
    bgColor = "#dcfce7";
    color = "#166534";
  } else if (s === "inactive" || s === "cancelled") {
    bgColor = "#fee2e2";
    color = "#991b1b";
  } else if (s === "pending") {
    bgColor = "#fef9c3";
    color = "#854d0e";
  }
  
  return (
    <Box 
      component="span"
      sx={{ 
        bgcolor: bgColor, 
        color: color, 
        px: 1.5, 
        py: 0.5, 
        borderRadius: '16px',
        fontWeight: 600,
        fontSize: '0.75rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {status || "Unknown"}
    </Box>
  );
};

export default StatusBadge;
