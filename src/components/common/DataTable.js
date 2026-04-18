import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";

const DataTable = ({ columns, data, renderCell, loading }) => {
  return (
    <TableContainer component={Paper} sx={{ mb: 2, maxHeight: "680px" }}>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell key={idx} size={col.size || "medium"}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow
                  hover
                  key={row.id || rowIndex}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex}>
                      {renderCell ? renderCell(row, col, rowIndex) : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default DataTable;
