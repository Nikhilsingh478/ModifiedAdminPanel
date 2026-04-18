import React, { useEffect } from "react";
import AddBrand from "../components/AddBrand";
import { brandsList } from "../../../redux/actions/admin/brandAction";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from '../../../helper/FormatDateTime';

import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";
import StatusBadge from "../../../components/common/StatusBadge";

const ManageBrands = () => {
  const dispatch = useDispatch();

  //brands list state
  const brandState = useSelector((state) => state.brandsList);
  const { loading, brands } = brandState;

  //add brand state
  const addBrandState = useSelector((state) => state.addBrand);
  const { success } = addBrandState;

  useEffect(() => {
    dispatch(brandsList());
  }, [dispatch, success]);

  const columns = [
    { label: "#id", field: "id" },
    { label: "Brand Name", field: "brandName" },
    { label: "Date Added", field: "createdDateTime" },
    { label: "Status", field: "status" },
  ];

  return (
    <Layout>
      <PageHeader title="Manage Brands" actionButton={<AddBrand />} />
      <DataTable
        columns={columns}
        data={brands || []}
        loading={loading}
        renderCell={(row, col, rowIndex) => {
          if (col.field === "id") return rowIndex + 1;
          if (col.field === "createdDateTime") return formatDate(row.createdDateTime);
          if (col.field === "status") return <StatusBadge status={row.isActive === 1 ? 'Active' : 'DeActive'} />;
          return row[col.field];
        }}
      />
    </Layout>
  );
};

export default ManageBrands;
