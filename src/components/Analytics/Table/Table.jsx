import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import { ActionButton, TableWrapper } from "../Styles/Styles";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Fragment } from "react";

const AnalyticsTable = ({ filteredRows, columns, handleActions, action = true }) => {
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
              <TableCell style={{ fontWeight: "700", textAlign: "left" }}>STT</TableCell>
              {columns.map((col, index) => (
                <TableCell key={index} style={{ fontWeight: "700", textAlign: col?.align || "left" }}>
                  {col?.label}
                </TableCell>
              ))}
              {action &&
                <TableCell style={{ fontWeight: "700", textAlign: "center" }}>Hành động</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows?.length > 0 ?
              <Fragment>{filteredRows?.map((row, index) => (
                <TableRow key={row.classId}>
                  <TableCell style={{ textAlign: "left" }}>{index + 1}</TableCell>
                  {columns.map((col, idx) => (
                    <TableCell key={idx} style={{ textAlign: col.align || "left" }}>
                      {row[col.id]}
                    </TableCell>
                  ))}
                  {action && <TableCell style={{ textAlign: "center" }}>
                    <VisibilityIcon
                      color="primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleActions(row.classId)} />
                  </TableCell>}
                </TableRow>
              ))}</Fragment> :
              <TableRow>
                <TableCell colSpan={columns.length + 2} style={{ textAlign: "center", padding: "20px", fontSize: "16px" }}>
                  Chưa có dữ liệu để hiển thị
                </TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

export default AnalyticsTable;