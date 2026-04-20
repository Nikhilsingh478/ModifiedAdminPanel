import React from "react";
import { Grid, Typography, Box, Avatar } from "@mui/material";
import "./AdminDashboard.css";
import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";

const AdminDashboard = () => {
  const dashboardCards = [
    {
      title: "Total Orders",
      value: "--",
      icon: <ShoppingCartIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: "white" }} />,
      gradient: "linear-gradient(135deg, #A7F3D0 0%, #7DD3FC 100%)",
    },
    {
      title: "Total Sales",
      value: "--",
      icon: <AttachMoneyIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: "white" }} />,
      gradient: "linear-gradient(135deg, #C4B5FD 0%, #FCA5A5 100%)",
    },
    {
      title: "Total Customers",
      value: "--",
      icon: <PeopleIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: "white" }} />,
      gradient: "linear-gradient(135deg, #FDE68A 0%, #86EFAC 100%)",
    },
  ];

  return (
    <Layout>
      <PageHeader title="Dashboard" subtitle="Overview of your storefront performance" />
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        {dashboardCards.map((card) => (
          <Grid item xs={12} sm={6} lg={4} key={card.title}>
            <Card
              sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: { xs: "12px", sm: "16px" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 1.25, sm: 1.75 } }}>
                <Avatar
                  sx={{
                    background: card.gradient,
                    width: { xs: 34, sm: 40 },
                    height: { xs: 34, sm: 40 },
                    mr: 1.5,
                  }}
                >
                  {card.icon}
                </Avatar>
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 600, fontSize: { xs: "0.82rem", sm: "0.88rem" } }}>
                  {card.title}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "1.5rem", sm: "1.9rem" },
                  fontWeight: 700,
                  color: "textPrimary",
                  lineHeight: 1.2,
                }}
              >
                {card.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default AdminDashboard;
