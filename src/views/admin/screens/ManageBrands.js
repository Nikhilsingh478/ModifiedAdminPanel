import React, { useState,useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress,Switch } from "@mui/material";
import AddBrand from "../components/AddBrand";
import { brandsList } from "../../../redux/actions/admin/brandAction";
import { useDispatch, useSelector } from "react-redux";
import AppLogout from "../../../AppLogout";
import { formatDate } from '../../../helper/FormatDateTime';

const ManageBrands = () => {
  const dispatch = useDispatch();

    //brands list state
   const brandState = useSelector((state) => state.brandsList);
  const { loading, brands, error } = brandState;


  //add brand state
  const addBrandState = useSelector((state) => state.addBrand);
  const {  success } = addBrandState;

  useEffect(() => {
    dispatch(brandsList());
  }, [success]);


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
          <AddBrand />

          <TableContainer
            component={Paper}
            style={{
              margin: "1rem",
            }}
            sx={{ maxHeight: "680px", maxWidth: "98%" }}
          >
            <Table
              style={{
                width: "95%",
              }}
             stickyHeader aria-label="sticky table"
            >
              <div className="loading-style">
                {loading && (
                  <>
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  </>
                )}
              </div>
              <TableHead>
                <TableRow>
                  <TableCell size="small" >#id</TableCell>
                  <TableCell size="small">Brand Name</TableCell>
                  <TableCell>Date Added</TableCell>
                  <TableCell>Status</TableCell>
                  
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {brands &&
                  brands.map((cur, ind) => {
                    return (
                      <>
                        <TableRow
                        hover
                          key={ind}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                    
                        >
                          <TableCell>{ind + 1}</TableCell>
                         
                          <TableCell>
                            {cur.brandName}
                          </TableCell>
                               <TableCell>{formatDate(cur.createdDateTime)}</TableCell>
                          <TableCell>
                           { cur.isActive === 1 ? 'Active' : 'DeActive'}
                          </TableCell>
                     
                        
                        </TableRow>
                      </>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      </AppLogout>
    
    </>
  );
};

export default ManageBrands;
