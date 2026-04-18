import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, Box, Button, Dialog } from "@mui/material";
import Switch from "@mui/material/Switch";
import toast, { Toaster } from "react-hot-toast";
import {
  customerList,
  activeInactiveUser,
  customerImg,
  clearErrors,
} from "../../../redux/actions/admin/adminCustomerAction";
import { useDispatch, useSelector } from "react-redux";
import AppLogout from "../../../AppLogout";
import CustomersNoti from "../components/CustomersNoti";
import { formatDate } from "../../../helper/FormatDateTime";

const CustomersList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [inactiveUserList, setInactiveUserList] = useState([]);
  const [open, setOpen] = useState(false);
  //customer state
  const customerState = useSelector((state) => state.customersList);
  const { loading, customers } = customerState;

  //customer img state
  const customerImage = useSelector((state) => state.customerImgData);
  const { customerImages, loadingImages } = customerImage;

  //active inactive user state
  const activeInactiveState = useSelector(
    (state) => state.activeInactiveCustomer
  );
  const { activeInactivesuccess, activeInactiveerror } = activeInactiveState;

  function notiCount() {
    const inactiveUsers = customers
      ? customers.filter((user) => !user.isActive)
      : null;
    setInactiveUserList(inactiveUsers);
  }

  //active user
  const activeUser = async (id) => {
    if (window.confirm("are you sure")) {
      dispatch(activeInactiveUser(id));
    }
  };

  //customer img
  const viewCustomerImg = async (id) => {
    setOpen(true);
    dispatch(customerImg(id));
  };

  useEffect(() => {
    notiCount();
    dispatch(customerList());
    if (activeInactiveerror) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
      dispatch(clearErrors());
    }
    if (activeInactivesuccess) {
      toast.success("success", {
        position: "top-center",
      });
      dispatch({ type: "ACTIVE_INACTIVE_RESET" });
    }
  }, [dispatch, activeInactiveerror, activeInactivesuccess]);

  return (
    <>
      <AppLogout>
        <div className="customerlist-section">
          <div className="sidebar-div">
            <Sidebar />
          </div>

          <div
            style={{
              marginLeft: "16%",
            }}
          >
            <CustomersNoti users={inactiveUserList} setSearch={setSearch} />

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
                aria-label="a dense table"
                stickyHeader
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
                    <TableCell size="small">FullName</TableCell>
                    <TableCell>EmailId</TableCell>
                    <TableCell>MobileNo</TableCell>

                    <TableCell>Date Added</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers
                    ? customers
                        .reverse()
                        .filter((u) =>
                          u.fullName
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                        .map((user, ind) => {
                          return (
                            <>
                              <TableRow
                                hover
                                key={user.fullName}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                                // onClick={() => setOpen(true)}
                              >
                                <TableCell>{ind + 1}</TableCell>
                                <TableCell>{user.fullName}</TableCell>
                                <TableCell>{user.emailId}</TableCell>
                                <TableCell>{user.mobilenumber}</TableCell>

                                <TableCell>
                                  {formatDate(user.createdDateTime)}
                                </TableCell>
                                
                              </TableRow>
                            </>
                          );
                        })
                    : null}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
              <div
                style={{
                  margin: "1.5rem",
                }}
              >
                {" "}
                <div className="loading-style">
                  {loadingImages && (
                    <>
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    </>
                  )}
                </div>
                {customerImages
                  ? customerImages.map((cur) => {
                      return (
                        <>
                          <Box m={2}>
                            <img
                              src={`data:image;base64,${cur.photo}`}
                              alt="user-img"
                              style={{
                                width: "400px",
                                height: "200px",
                              }}
                            />
                          </Box>
                        </>
                      );
                    })
                  : null}
              </div>
            </Dialog>

            <Toaster />
          </div>
        </div>
      </AppLogout>
    </>
  );
};

export default CustomersList;
