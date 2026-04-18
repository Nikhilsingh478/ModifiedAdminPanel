import React, { useEffect } from "react";
import AppLogout from "../../../AppLogout";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Paper,
  TableBody,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import AddHSNcode from "../components/AddHSNcode";
import { useDispatch, useSelector } from "react-redux";
import { hsnCodeList } from "../../../redux/actions/admin/hsnCodeAction";
import { formatDate } from '../../../helper/FormatDateTime';


const columns = [
  { id: "1", label: "#id", maxWidth: 20 },
  { id: "2", label: "hSN Number", maxWidth: 50 },
  { id: "3", label: "Date Added", maxWidth: 50 },
];

const HsncodeScreen = () => {
  const dispatch = useDispatch();

  //hsn code load state
  const hsnCodeState = useSelector((state) => state.hsncodeList);
  const { loading, hsnCodes } = hsnCodeState;

  //add HSN state
  const addHsnCodeState = useSelector((state) => state.addHSN);
  const { addloading } = addHsnCodeState;

  useEffect(() => {
    dispatch(hsnCodeList());
  }, [addloading, dispatch]);

  return (
    <>
      <AppLogout>
        <Box>
          <Sidebar />
          <div
            style={{
              marginLeft: "16%",
              marginTop: "-30px",
            }}
          >
            <AddHSNcode />
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
              <Paper
                sx={{ width: "100%", overflow: "hidden", minHeight: "90vh" }}
              >
                {loading ? (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "auto",
                        marginLeft: "auto",
                        height: "75vh",
                      }}
                    />
                  </Box>
                ) : (
                  <>
                    <TableContainer sx={{ mt: 2 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                // style={{ maxWidth: column.maxWidth }}
                                width={column.maxWidth}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {hsnCodes &&
                            hsnCodes.map((cur, ind) => {
                              return (
                                <>
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={cur.id}
                                  >
                                    <TableCell>{ind + 1}</TableCell>
                                    <TableCell>{cur.hsnNumber}</TableCell>
                                    <TableCell>{formatDate(cur.createdDateTime)}</TableCell>
                                  </TableRow>
                                </>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </Paper>
            </Box>
          </div>
        </Box>
      </AppLogout>
    </>
  );
};

export default HsncodeScreen;
