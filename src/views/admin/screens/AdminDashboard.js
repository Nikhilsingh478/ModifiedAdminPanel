import React from "react";
import { Grid, Typography } from "@mui/material";
import "./AdminDashboard.css";
import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";

const AdminDashboard = () => {
  return (
    <Layout>
      <PageHeader title="Dashboard" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}> 
          <Card>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom fontWeight={600} textTransform="uppercase" fontSize="0.75rem" letterSpacing="0.05em">
              Total Orders
            </Typography>
            <Typography variant="h3" fontWeight={700} color="primary.main" my={1}>
              24
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}> 
          <Card>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom fontWeight={600} textTransform="uppercase" fontSize="0.75rem" letterSpacing="0.05em">
              Total Sales
            </Typography>
            <Typography variant="h3" fontWeight={700} color="secondary.main" my={1}>
              24
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}> 
          <Card>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom fontWeight={600} textTransform="uppercase" fontSize="0.75rem" letterSpacing="0.05em">
              Total Customers
            </Typography>
            <Typography variant="h3" fontWeight={700} color="text.primary" my={1}>
              24
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AdminDashboard;
