import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableWrapper } from "../Styles/Styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";

const AnalyticsTable = ({
  filteredRows,
  columns,
  handleActions,
  onScrollEnd,
  loading,
  action = true,
}) => {
  const [isFetching, setIsFetching] = useState(false);

  const cellStyle = {
    fontSize: "16px",
  };

  const headerCellStyle = {
    ...cellStyle,
    fontWeight: "700",
  };
  const renderCell = (value) => {
    return value !== null && value !== undefined && value !== "" ? value : "--";
  };

  const handleScroll = (e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.target;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
  
          if (isAtBottom && !isFetching && !loading) {
          setIsFetching(true);
          onScrollEnd();
          }
      };
  
  useEffect(() => {
      // khi dữ liệu mới được add, reset flag
      if (!loading) {
      setIsFetching(false);
      }
  }, [filteredRows, loading]);

  return (
    <TableWrapper className="scroll-view">
      <TableContainer
        onScroll={handleScroll}
        component={Paper}
        className="TableContainer"
        style={{ maxHeight: "550px", overflow: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ ...headerCellStyle, textAlign: "center" }}>
                STT
              </TableCell>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  style={{
                    ...headerCellStyle,
                    textAlign: col.align || "center",
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
              {action && (
                <TableCell style={{ ...headerCellStyle, textAlign: "center" }}>
                  Chi tiết
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows?.length > 0 ? (
              filteredRows.map((row, index) => (
                <TableRow key={row.classId || index}>
                  <TableCell style={{ ...cellStyle, textAlign: "center" }}>
                    {index + 1}
                  </TableCell>

                  {columns.map((col, idx) => (
                    <TableCell
                      key={idx}
                      style={{ ...cellStyle, textAlign: col.align || "center" }}
                    >
                      {renderCell(row[col.id])}
                    </TableCell>
                  ))}

                  {action && (
                    <TableCell style={{ ...cellStyle, textAlign: "center" }}>
                      <VisibilityIcon
                        color="primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleActions(row.classId, row.className, row.courseName)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (action ? 2 : 1)}
                  style={{ ...cellStyle, padding: "20px", textAlign: "center" }}
                >
                  Chưa có dữ liệu để hiển thị
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

export default AnalyticsTable;