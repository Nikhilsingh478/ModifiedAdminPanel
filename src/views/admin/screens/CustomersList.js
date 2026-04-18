import React, { useEffect, useState } from "react";
import { OutlinedInput } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import {
  customerList,
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
  //customer state
  const customerState = useSelector((state) => state.customersList);
  const { loading, customers } = customerState;

  
  //active inactive user state
  const activeInactiveState = useSelector(
    (state) => state.activeInactiveCustomer
  );
  const { activeInactivesuccess, activeInactiveerror } = activeInactiveState;

  
  
  useEffect(() => {
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
          <OutlinedInput 
            size="small"
            placeholder="Search User..." 
            onChange={(e) => setSearch(e.target.value)} 
            sx={{ width: '250px' }}
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

      <Toaster />
    </Layout>
  );
};

export default CustomersList;
