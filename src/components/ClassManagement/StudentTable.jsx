import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableWrapper } from "../Analytics/Styles/Styles";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fragment, use } from "react";
import { useEffect } from "react";
const StudentTable = ({ filteredRows, columns, handleDelete,handleEdit,summary, action = true }) => {
  const cellStyle = {
    fontSize: "16px",
    textAlign: "center",
  };
  const headerCellStyle = {
    ...cellStyle,
    fontWeight: "700",
  };
  
  return (
    <TableWrapper className="scroll-view">
      <TableContainer
        component={Paper}
        className="TableContainer"
        style={{
          maxHeight: "550px",
          overflow: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>

            <TableRow>
              <TableCell style={headerCellStyle}>STT</TableCell>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  style={{
                    ...headerCellStyle,
                    textAlign:  "center",
                  }}
                >
                  {col?.label}
                </TableCell>
              ))}
              {action && (
                <TableCell style={headerCellStyle}>Sửa</TableCell>
              )}
              {action && (
                <TableCell style={headerCellStyle}>Xóa</TableCell>
              )}
              
              
            </TableRow>


          </TableHead>


          <TableBody>
            {filteredRows?.length > 0 ?
              <Fragment>{filteredRows?.map((row, index) => (
                <TableRow key={row.classId}>
                  <TableCell style={{ textAlign: "center" }}>{index + 1}</TableCell>
                  {columns.map((col, idx) => (
                    <TableCell key={idx} style={{ textAlign: "center" }}>
                      {row[col.id]}
                    </TableCell>
                  ))}
                  
                  {action && <TableCell style={{ textAlign: "center" }}>
                    <EditIcon
                      color="warning"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(row.id)} />
                  </TableCell>}

                   {action && <TableCell style={{ textAlign: "center" }}>
                    <DeleteIcon 
                      color="error"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(row.id)} />
                  </TableCell>}

                  
                </TableRow>
              ))}</Fragment> :

              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  style={{ ...cellStyle, padding: "20px" }}
                >
                  Chưa có dữ liệu để hiển thị
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

export default StudentTable;
