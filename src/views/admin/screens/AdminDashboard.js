import React from "react";
import { Grid, Typography, Box, keyframes } from "@mui/material";
import "./AdminDashboard.css";
import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";

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
  return (
    <Layout>
      <PageHeader title="Dashboard" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              animation: `${fadeInUp} 0.6s ease-out`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3
              }
            }}
          >
            <Typography 
              variant="subtitle1" 
              color="textSecondary" 
              gutterBottom 
              fontWeight={600} 
              textTransform="uppercase" 
              fontSize="0.75rem" 
              letterSpacing="0.05em"
              sx={{ animation: `${fadeInUp} 0.8s ease-out` }}
            >
              Total Orders
            </Typography>
            <Typography 
              variant="h3" 
              fontWeight={700} 
              color="primary.main" 
              my={1}
              sx={{ 
                animation: `${countUp} 1s ease-out`,
                background: 'linear-gradient(45deg, primary.main, primary.dark)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              24
            </Typography>
            <Box sx={{ mt: 2, height: 4, bgcolor: 'primary.main', borderRadius: 2, width: '60%', animation: `${fadeInScale} 1.2s ease-out` }} />
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              animation: `${fadeInUp} 0.6s ease-out 0.1s`,
              animationFillMode: 'both',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3
              }
            }}
          >
            <Typography 
              variant="subtitle1" 
              color="textSecondary" 
              gutterBottom 
              fontWeight={600} 
              textTransform="uppercase" 
              fontSize="0.75rem" 
              letterSpacing="0.05em"
              sx={{ animation: `${fadeInUp} 0.8s ease-out 0.1s`, animationFillMode: 'both' }}
            >
              Total Sales
            </Typography>
            <Typography 
              variant="h3" 
              fontWeight={700} 
              color="secondary.main" 
              my={1}
              sx={{ 
                animation: `${countUp} 1s ease-out 0.1s`,
                animationFillMode: 'both',
                background: 'linear-gradient(45deg, secondary.main, secondary.dark)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              24
            </Typography>
            <Box sx={{ mt: 2, height: 4, bgcolor: 'secondary.main', borderRadius: 2, width: '75%', animation: `${fadeInScale} 1.2s ease-out 0.1s`, animationFillMode: 'both' }} />
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              animation: `${fadeInUp} 0.6s ease-out 0.2s`,
              animationFillMode: 'both',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3
              }
            }}
          >
            <Typography 
              variant="subtitle1" 
              color="textSecondary" 
              gutterBottom 
              fontWeight={600} 
              textTransform="uppercase" 
              fontSize="0.75rem" 
              letterSpacing="0.05em"
              sx={{ animation: `${fadeInUp} 0.8s ease-out 0.2s`, animationFillMode: 'both' }}
            >
              Total Customers
            </Typography>
            <Typography 
              variant="h3" 
              fontWeight={700} 
              color="text.primary" 
              my={1}
              sx={{ 
                animation: `${countUp} 1s ease-out 0.2s`,
                animationFillMode: 'both',
                background: 'linear-gradient(45deg, text.primary, text.secondary)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              24
            </Typography>
            <Box sx={{ mt: 2, height: 4, bgcolor: 'text.primary', borderRadius: 2, width: '45%', animation: `${fadeInScale} 1.2s ease-out 0.2s`, animationFillMode: 'both' }} />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AdminDashboard;
