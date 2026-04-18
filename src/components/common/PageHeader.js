import React from "react";
import { Box, Typography } from "@mui/material";

const PageHeader = ({ title, subtitle, actionButton }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
      <Box>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actionButton && (
        <Box>
          {actionButton}
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;
