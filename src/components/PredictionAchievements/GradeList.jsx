import React, { useEffect, useRef } from "react";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableWrapper } from "../Analytics/Styles/Styles";

export default function GradeList({ grades, toggleOne, selected, onLoadMore, loading }) {
  const containerRef = useRef();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !onLoadMore) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        onLoadMore();
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [onLoadMore]);

  const cellStyle = {
    fontSize: "16px",
    textAlign: "center",
  };

  const headerStyle = {
    ...cellStyle,
    fontWeight: "700",
  };

  return (
    <TableWrapper>
      <TableContainer
        component={Paper}
        ref={containerRef}
        sx={{ maxHeight: 550, overflow: "auto" }}
      > 
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={headerStyle}>STT</TableCell>
              <TableCell sx={headerStyle}>MSSV</TableCell>
              <TableCell sx={headerStyle}>Bài tập</TableCell>
              <TableCell sx={headerStyle}>Giữa kỳ</TableCell>
              <TableCell sx={headerStyle}>Đồ án</TableCell>
              <TableCell sx={headerStyle}>Thực hành</TableCell>
              <TableCell sx={headerStyle}>Cuối kỳ</TableCell>
              <TableCell sx={headerStyle}>Điểm cộng</TableCell>
              <TableCell sx={headerStyle}>Tổng kết</TableCell>
              <TableCell sx={headerStyle} padding="checkbox" />
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.length > 0 ? (
              grades.map((g, idx) => (
                <TableRow hover key={g.studentId}>
                  <TableCell sx={cellStyle}>{idx + 1}</TableCell>
                  <TableCell sx={cellStyle}>{g.identificationCode}</TableCell>
                  <TableCell sx={cellStyle}>{g.assignmentQuizGrade ?? "-"}</TableCell>
                  <TableCell sx={cellStyle}>{g.midtermGrade ?? "-"}</TableCell>
                  <TableCell sx={cellStyle}>{g.projectGrade ?? "-"}</TableCell>
                  <TableCell sx={cellStyle}>{g.practiceGrade ?? "-"}</TableCell>
                  <TableCell sx={cellStyle}>{g.finalGrade ?? "-"}</TableCell>
                  <TableCell sx={cellStyle}>{g.bonus ?? "-"}</TableCell>
                  <TableCell sx={cellStyle}>{g.totalGrade ?? "-"}</TableCell>
                  <TableCell sx={cellStyle} padding="checkbox">
                    <Checkbox
                      checked={selected.has(g.studentId)}
                      onChange={() => toggleOne(g.studentId)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={cellStyle}>
                  Chưa có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
}
