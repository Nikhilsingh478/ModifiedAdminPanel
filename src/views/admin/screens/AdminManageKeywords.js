import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddKeywords from "../components/AddKeywords";
import { keywordsList } from "../../../redux/actions/admin/ManageKeywordAction";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../helper/FormatDateTime";
import UpdateKeywords from "../components/UpdateKeywords";

import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";
import StatusBadge from "../../../components/common/StatusBadge";

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
  }, [dispatch, success, updateSuccess]);

  const columns = [
    { label: "#id", field: "id" },
    { label: "Keywords", field: "keywords" },
    { label: "Date Added", field: "createdDateTime" },
    { label: "Status", field: "status" },
    { label: "Action", field: "action" },
  ];

  return (
    <Layout>
      <PageHeader title="Manage Keywords" actionButton={<AddKeywords />} />

      <DataTable
        columns={columns}
        data={keywords || []}
        loading={loading}
        renderCell={(row, col, rowIndex) => {
          if (col.field === "id") return rowIndex + 1;
          if (col.field === "createdDateTime") return formatDate(row.createdDateTime);
          if (col.field === "status") return <StatusBadge status={row.isActive === 1 ? "Active" : "DeActive"} />;
          if (col.field === "action") return (
            <IconButton aria-label="edit" sx={{ color: '#A7F3D0' }}>
              <EditIcon onClick={() => openModel(row.id, row.keywords)} />
            </IconButton>
          );
          return row[col.field];
        }}
      />

      <UpdateKeywords
        open={open}
        setOpen={setOpen}
        updatekeyID={updatekeyID}
        updatekeyText={updatekeyText}
        setUpdatekeyText={setUpdatekeyText}
      />
    </Layout>
  );
};

export default AdminManageKeywords;
