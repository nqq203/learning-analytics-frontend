// src/components/ClassManagement/StudentGradeTable.jsx
import React, { useEffect, useRef } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from '@mui/material';
import { TableWrapper } from '../Analytics/Styles/Styles';

export default function StudentGradeTable({
  rows = [],             // list of student-grade objects
  columns = [],          // e.g. [{ id: 'identificationCode', label: 'MSSV', align: 'center' }, …]
  selected = new Set(),  // Set of studentId that are checked
  onSelect,              // fn(studentId) to toggle selection
  onLoadMore,            // optional infinite scroll callback
}) {
  const containerRef = useRef();

  // infinite-scroll listener
  useEffect(() => {
    if (!onLoadMore) return;
    const el = containerRef.current;
    const handleScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
        onLoadMore();
      }
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [onLoadMore]);

  const cellStyle = {
    fontSize: "16px",
    textAlign: "center",
  };
  const headerCellStyle = {
    ...cellStyle,
    fontWeight: "700",
  };

  return (
    <TableWrapper>
      <TableContainer
        component={Paper}
        ref={containerRef}
        style={{ maxHeight: 550, overflow: 'auto' }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>STT</TableCell>
              {columns.map(col => (
                <TableCell key={col.id} align={col.align || 'left'} style={headerCellStyle}>
                  {col.label}
                </TableCell>
              ))}
              <TableCell style={headerCellStyle}>Chọn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, idx) => (
                <TableRow hover key={row.studentId}>
                  <TableCell style={cellStyle}>{idx + 1}</TableCell>
                  {columns.map(col => (
                    <TableCell
                      key={col.id}
                      align={col.align || 'left'}
                      style={cellStyle}
                    >
                      {row[col.id] ?? '–'}
                    </TableCell>
                  ))}
                  <TableCell padding="checkbox" style={cellStyle}>
                    <Checkbox
                      size="small"
                      checked={selected.has(row.studentId)}
                      onChange={() => onSelect(row.studentId)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 2} align="center" style={cellStyle}>
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
