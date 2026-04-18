import React from "react";
import { Chip } from "@mui/material";

const StatusBadge = ({ status }) => {
  let color = "default";
  
  const s = status ? status.toLowerCase() : "";
  
  if (s === "active" || s === "delivered") color = "success";
  else if (s === "inactive" || s === "cancelled") color = "error";
  else if (s === "pending") color = "warning";
  
  return <Chip label={status || "Unknown"} color={color} size="small" />;
};

export default StatusBadge;
