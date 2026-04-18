import React, { useEffect, useState } from "react";
import { circularProgressClasses, Box, Dialog, CircularProgress } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import {
  customerList,
  activeInactiveUser,
  customerImg,
  clearErrors,
} from "../../../redux/actions/admin/adminCustomerAction";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../helper/FormatDateTime";

import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";

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
  }, [dispatch, activeInactiveerror, activeInactivesuccess, customers]);

  const columns = [
    { label: "#id", field: "id" },
    { label: "FullName", field: "fullName" },
    { label: "EmailId", field: "emailId" },
    { label: "MobileNo", field: "mobilenumber" },
    { label: "Date Added", field: "createdDateTime" },
  ];

  const processedData = customers ? [...customers].reverse().filter((u) => u.fullName.toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <Layout>
      <PageHeader 
        title="Customers List" 
        actionButton={
          <input 
            type="text" 
            placeholder="Search User..." 
            onChange={(e) => setSearch(e.target.value)} 
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        } 
      />
      
      <DataTable
        columns={columns}
        data={processedData}
        loading={loading}
        renderCell={(row, col, rowIndex) => {
          if (col.field === "id") return rowIndex + 1;
          if (col.field === "createdDateTime") return formatDate(row.createdDateTime);
          return row[col.field];
        }}
      />

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
    </Layout>
  );
};

export default CustomersList;
