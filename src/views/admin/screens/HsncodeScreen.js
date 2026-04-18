import React, { useEffect } from "react";
import AddHSNcode from "../components/AddHSNcode";
import { useDispatch, useSelector } from "react-redux";
import { hsnCodeList } from "../../../redux/actions/admin/hsnCodeAction";
import { formatDate } from '../../../helper/FormatDateTime';

import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";

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
  }, [dispatch]);

  const columns = [
    { label: "#id", field: "id" },
    { label: "HSN Number", field: "hsnNumber" },
    { label: "Date Added", field: "createdDateTime" },
  ];

  return (
    <Layout>
      <PageHeader title="Manage HSN Code" actionButton={<AddHSNcode />} />
      <DataTable
        columns={columns}
        data={hsnCodes || []}
        loading={loading}
        renderCell={(row, col, rowIndex) => {
          if (col.field === "id") return rowIndex + 1;
          if (col.field === "createdDateTime") return formatDate(row.createdDateTime);
          return row[col.field];
        }}
      />
    </Layout>
  );
};

export default HsncodeScreen;
