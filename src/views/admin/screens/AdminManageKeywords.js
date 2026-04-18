import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { Box, CircularProgress, IconButton } from "@mui/material";
import AddKeywords from "../components/AddKeywords";
import { keywordsList } from "../../../redux/actions/admin/ManageKeywordAction";
import { useDispatch, useSelector } from "react-redux";
import AppLogout from "../../../AppLogout";
import { formatDate } from "../../../helper/FormatDateTime";
import UpdateKeywords from "../components/UpdateKeywords";

const AdminManageKeywords = () => {


  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [updatekeyID, setUpdatekeyID] = useState("");
  const [updatekeyText, setUpdatekeyText] = useState("");

  //load keywords state
  const keywordsState = useSelector((state) => state.keywordsList);
  const { loading, keywords } = keywordsState;

  //add keywords state
  const addKeywordsState = useSelector((state) => state.addKeywords);
  const { success } = addKeywordsState;

    //update primary cate state
  const updateKeywordState = useSelector((state) => state.updateKey);
  const { updateSuccess } = updateKeywordState;


  const openModel = (id, keys) => {
    setOpen(true);
    setUpdatekeyID(id);
    setUpdatekeyText(keys);
  };

  useEffect(() => {
    dispatch(keywordsList());
  }, [success,updateSuccess]);

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
            <AddKeywords />

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
                stickyHeader
                aria-label="sticky table"
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
                    <TableCell size="small">#id</TableCell>
                    <TableCell size="small">Keywords</TableCell>
                    <TableCell>Date Added</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {keywords &&
                    keywords.map((cur, ind) => {
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

                            <TableCell>{cur.keywords}</TableCell>
                            <TableCell>
                              {formatDate(cur.createdDateTime)}
                            </TableCell>
                            <TableCell>
                              {cur.isActive === 1 ? "Active" : "DeActive"}
                            </TableCell>
                            <IconButton aria-label="edit" color="primary">
                              <EditIcon
                                onClick={() => openModel(cur.id, cur.keywords)}
                              />
                            </IconButton>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            <UpdateKeywords
              open={open}
              setOpen={setOpen}
              updatekeyID={updatekeyID}
              updatekeyText={updatekeyText}
              setUpdatekeyText = {setUpdatekeyText}
            />
          </div>
        </div>
      </AppLogout>
    </>
  );
};

export default AdminManageKeywords;
