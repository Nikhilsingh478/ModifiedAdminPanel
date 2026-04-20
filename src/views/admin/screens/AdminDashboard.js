import React from "react";
import { Grid, Typography, Box, keyframes, useTheme, Avatar } from "@mui/material";
import "./AdminDashboard.css";
import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";

// Animation definitions
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const countUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const AdminDashboard = () => {
  const theme = useTheme();
  
  return (
    <Layout>
      <PageHeader 
        title="Dashboard" 
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  background: 'linear-gradient(135deg, #A7F3D0 0%, #7DD3FC 100%)',
                  width: 40,
                  height: 40,
                  mr: 2,
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 20, color: 'white' }} />
              </Avatar>
              <Typography 
                variant="subtitle2" 
                color="textSecondary" 
                fontWeight={500}
              >
                Total Orders
              </Typography>
            </Box>
            <Typography 
              variant="h4" 
              fontWeight={600} 
              color="textPrimary"
            >
              --
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  background: 'linear-gradient(135deg, #C4B5FD 0%, #FCA5A5 100%)',
                  width: 40,
                  height: 40,
                  mr: 2,
                }}
              >
                <AttachMoneyIcon sx={{ fontSize: 20, color: 'white' }} />
              </Avatar>
              <Typography 
                variant="subtitle2" 
                color="textSecondary" 
                fontWeight={500}
              >
                Total Sales
              </Typography>
            </Box>
            <Typography 
              variant="h4" 
              fontWeight={600} 
              color="textPrimary"
            >
              --
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  background: 'linear-gradient(135deg, #FDE68A 0%, #86EFAC 100%)',
                  width: 40,
                  height: 40,
                  mr: 2,
                }}
              >
                <PeopleIcon sx={{ fontSize: 20, color: 'white' }} />
              </Avatar>
              <Typography 
                variant="subtitle2" 
                color="textSecondary" 
                fontWeight={500}
              >
                Total Customers
              </Typography>
            </Box>
            <Typography 
              variant="h4" 
              fontWeight={600} 
              color="textPrimary"
            >
              --
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AdminDashboard;
