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
  useTheme,
} from "@mui/material";

const DataTable = ({ columns, data, renderCell, loading }) => {
  const theme = useTheme();
  
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        mb: 3, 
        maxHeight: "680px",
        borderRadius: '16px',
        background: theme.palette.mode === 'light' 
          ? 'rgba(255, 255, 255, 0.9)' 
          : 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(226, 232, 240, 0.8)' : 'rgba(30, 41, 59, 0.8)'}`,
        boxShadow: theme.palette.mode === 'light' 
          ? '0 4px 16px -4px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.05)'
          : '0 4px 16px -4px rgba(0, 0, 0, 0.4), 0 2px 8px -2px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(135deg, #A7F3D0 0%, #7DD3FC 100%)',
          borderRadius: '4px',
        },
      }}
    >
      {loading && (
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          p: 4,
          minHeight: 200,
        }}>
          <CircularProgress 
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </Box>
      )}
      {!loading && (
        <Table 
          stickyHeader 
          sx={{ 
            minWidth: 650,
            '& .MuiTableCell-root': {
              borderColor: '#2A2F3A',
            }
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell 
                  key={idx} 
                  size={col.size || "medium"}
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: theme.palette.text.secondary,
                    backgroundColor: '#232833',
                    borderBottom: '2px solid #2A2F3A',
                    '&:first-child': {
                      borderTopLeftRadius: '16px',
                    },
                    '&:last-child': {
                      borderTopRightRadius: '16px',
                    },
                  }}
                >
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
                  sx={{ 
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(167, 243, 208, 0.1)',
                      transform: 'scale(1.005)',
                    },
                    '&:last-child td': {
                      borderBottom: 'none',
                      '&:first-child': {
                        borderBottomLeftRadius: '16px',
                      },
                      '&:last-child': {
                        borderBottomRightRadius: '16px',
                      },
                    },
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <TableCell 
                      key={colIndex}
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {renderCell ? renderCell(row, col, rowIndex) : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={columns.length} 
                  align="center"
                  sx={{
                    py: 4,
                    fontSize: '1rem',
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    fontStyle: 'italic',
                  }}
                >
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
