import React from "react";
import Sidebar from "../components/Sidebar";
import { Card, Grid, Divider } from "@mui/material";
import { Box } from "@mui/system";
import "./AdminDashboard.css";
import AppLogout from "../../../AppLogout";


const AdminDashboard = () => {
  return (
    <>
    <AppLogout>

      <div className="dashboar-section">
        <div className="sidebar-div">
          <Sidebar />
        </div>

        <div
          style={{
            marginLeft: "16%",
          }}
        >
          <Grid container spacing={1} className="">
            <Grid item xs={12} md={6} lg={3}> 
              <Box p={1}>
                <Card
                  style={{
                    boxShadow: "none",
                    border: "1px solid #e8eaf6",
                  }}
                  className="product-card"
                  sx={{ maxWidth: 700 }}
                >
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
                <Card
                  style={{
                    boxShadow: "none",
                    border: "1px solid #e8eaf6",
                  }}
                  className="product-card"
                  sx={{ maxWidth: 700 }}
                >
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
                <Card
                  style={{
                    boxShadow: "none",
                    border: "1px solid #e8eaf6",
                  }}
                  className="product-card"
                  sx={{ maxWidth: 700 }}
                >
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
        </div>
      </div>
      </AppLogout>
    
    </>
  );
};

export default AdminDashboard;
