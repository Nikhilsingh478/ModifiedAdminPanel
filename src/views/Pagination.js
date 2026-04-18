import React from "react";
import { Button } from "@mui/material";

const Pagination = ({ page, setPage }) => {
  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if(page > 1){
      setPage(page - 1);
    }
    
  };

  return (
    <>
      <div
        className="pagination"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{ justifyContent: "space-between" }}
          onClick={prevPage}
          variant="outlined"
        >
          PREV
        </Button>

        <Button
          sx={{ justifyContent: "space-between" }}
          onClick={nextPage}
          variant="outlined"
        >
          NEXT
        </Button>
      </div>
    </>
  );
};

export default Pagination;
