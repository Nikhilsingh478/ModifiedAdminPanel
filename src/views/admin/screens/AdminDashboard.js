import React from "react";
import { Grid, Divider } from "@mui/material";
import { Box } from "@mui/system";
import "./AdminDashboard.css";
import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";

const AdminDashboard = () => {
  return (
    <Layout>
      <PageHeader title="Dashboard" />
      <Grid container spacing={1} className="">
        <Grid item xs={12} md={6} lg={3}> 
          <Box p={1}>
            <Card className="product-card">
              <div className="total-orders-div">Total Orders</div>
              <Divider />
              <br />
              <div className="">
                <div className="total-orders-div">24</div>
              </div>
            </Card>
          </Box>
        </Grid>

         <Grid item xs={12} md={6} lg={3}> 
          <Box p={1}>
            <Card className="product-card">
              <div className="total-orders-div">Total Sales</div>
              <Divider />
              <br />
              <div className="">
                <div className="total-orders-div">24</div>
              </div>
            </Card>
          </Box>
        </Grid>

         <Grid item xs={12} md={6} lg={3}> 
          <Box p={1}>
            <Card className="product-card">
              <div className="total-orders-div">Total Customers</div>
              <Divider />
              <br />
              <div className="">
                <div className="total-orders-div">24</div>
              </div>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AdminDashboard;
