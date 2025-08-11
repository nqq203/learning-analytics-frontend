'use client';
import React, { useState, useMemo, useRef } from "react";
import {
  Box, Typography, TableContainer, Paper, Table, TableHead, TableRow,
  TableCell, TableBody, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, CircularProgress, Checkbox, Tooltip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import * as XLSX from "xlsx";
import dynamic from 'next/dynamic';
import { usePDF } from 'react-to-pdf';

export default function PredictResultModal({
  resultModalOpen,
  setResultModalOpen,
  predictState,
  targetText,
  studentsGrade,
}) {
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const pdfRef = useRef(null);

  const { toPDF, targetRef } = usePDF({
    filename: `goi-y-cai-thien_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.pdf`,
    options: { orientation: "portrait", unit: "pt", format: "a4" },
    method: "save",
  });


  const studentIdToCode = useMemo(() => {
    const map = {};
    if (studentsGrade) {
      studentsGrade.forEach((s) => {
        map[s.studentId] = s.identificationCode;
      });
    }
    return map;
  }, [studentsGrade]);

  const data = Array.isArray(predictState.result?.data)
    ? predictState.result.data
    : [];

  const allIds = useMemo(() => data.map((s) => s.studentId).filter(Boolean), [data]);

  const isAllChecked = allIds.length > 0 && allIds.every((id) => selectedIds.has(id));
  const isPartiallyChecked = selectedIds.size > 0 && !isAllChecked;

  const getRowsForExport = () => {
    if (selectedIds.size === 0) return data;
    return data.filter((s) => selectedIds.has(s.studentId));
  };

  const handleExportExcel = () => {
    const rows = getRowsForExport();
    if (!rows.length) return;

    const sheetData = rows.map((s, idx) => ({
      STT: idx + 1,
      MSSV: s.identificationCode ?? studentIdToCode[s.studentId] ?? "",
      "Điểm CK dự đoán": s.predictedFinalGrade ?? "",
      "Điểm CK thực tế": s.actualFinalGrade ?? "",
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(wb, ws, "DuDoanDiemCK");

    XLSX.writeFile(wb, `du-doan-diem-ck_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.xlsx`);
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      if (isAllChecked) return new Set();
      return new Set(allIds);
    });
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleRowExpand = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const parseSuggestion = (str) => {
    const lines = str.split("\n").map(l => l.trim().replace(/^- /, "")); // bỏ "- "
    let result = {};
    lines.forEach(line => {
      if (/^\*\*Bước/.test(line)) {
        result.step = line.replace(/\*\*/g, "");
      } else if (line.startsWith("Hành động:")) {
        result.action = line.replace("Hành động:", "").trim();
      } else if (line.startsWith("Lý do:")) {
        result.reason = line.replace("Lý do:", "").trim();
      } else if (line.startsWith("Thời gian:")) {
        result.time = line.replace("Thời gian:", "").trim();
      } else if (line.startsWith("Công cụ:")) {
        result.tools = line.replace("Công cụ:", "").trim();
      }
    });
    return result;
  };

  const renderBoldUpper = (text) => {
    if (!text) return null;
    // Tách theo **…** ; phần trong **…** sẽ được wrap <b> + UPPERCASE
    const parts = text.split(/\*\*(.+?)\*\*/g);
    return parts.map((p, i) =>
      i % 2 === 1 ? <b key={i} style={{ textTransform: 'uppercase' }}>{p}</b> : p
    );
  };

  return (
    <Dialog
      open={resultModalOpen}
      onClose={() => setResultModalOpen(false)}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>🎯 Kết quả dự đoán</DialogTitle>

      <DialogContent>
        {predictState.loading ? (
          <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>
        ) : (
          <>
            {/* Nút xuất */}
            <Box mb={2}>
              <Button variant="outlined" onClick={handleExportExcel} sx={{ mr: 1 }}>
                Xuất Excel (điểm)
              </Button>
              <Button variant="outlined" onClick={() => requestAnimationFrame(toPDF)}>
                Xuất PDF (gợi ý)
              </Button>
            </Box>

            {/* Bảng kết quả */}
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={isPartiallyChecked}
                        checked={isAllChecked}
                        onChange={toggleSelectAll}
                      />
                    </TableCell>
                    <TableCell />
                    <TableCell align="center">MSSV</TableCell>
                    <TableCell align="center">Điểm CK dự đoán</TableCell>
                    <TableCell align="center">Điểm CK thực tế</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((s, idx) => (
                    <React.Fragment key={s.studentId || idx}>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedIds.has(s.studentId)}
                            onChange={() => toggleSelectOne(s.studentId)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => toggleRowExpand(s.studentId)}>
                            {expandedRows[s.studentId] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">{s.identificationCode}</TableCell>
                        <TableCell align="center">{s.predictedFinalGrade || "--"}</TableCell>
                        <TableCell align="center">{s.actualFinalGrade || "--"}</TableCell>
                      </TableRow>
                      {expandedRows[s.studentId] && (
                        <TableRow>
                          <TableCell colSpan={5}>
                            <Typography fontWeight={700}>Gợi ý cải thiện</Typography>
                            {Array.isArray(s.suggestions) && s.suggestions.length > 0
                              ? s.suggestions.map((sg, i) => {
                                const sug = parseSuggestion(sg);
                                return (
                                  <Box
                                    key={i}
                                    sx={{
                                      border: "1px solid #90caf9",
                                      borderRadius: 2,
                                      p: 2,
                                      mb: 1.5,
                                      background: "#f0f7ff",
                                    }}
                                  >
                                    <Typography variant="subtitle1" fontWeight={700} color="#1976d2" mb={1}>
                                      {renderBoldUpper(sug.step)}
                                    </Typography>
                                    <Typography fontSize={15}><b>Hành động:</b> {renderBoldUpper(sug.action)}</Typography>
                                    <Typography fontSize={15}><b>Lý do:</b> {renderBoldUpper(sug.reason)}</Typography>
                                    <Typography fontSize={15}><b>Thời gian:</b> {renderBoldUpper(sug.time)}</Typography>
                                    <Typography fontSize={15}><b>Công cụ:</b> {renderBoldUpper(sug.tools)}</Typography>
                                  </Box>
                                );
                              })
                              : "-"}
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* PDF hidden content */}
            <Box
              ref={targetRef}
              sx={{
                position: "fixed",
                left: -99999,
                top: -99999,
                width: 794,
                p: 2,
                bgcolor: "#fff",
              }}
            >
              <Typography variant="h6" align="center" fontWeight={700} mb={2}>
                Gợi ý cải thiện
              </Typography>
              {getRowsForExport().map((s, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 3,
                    // Break mỗi sinh viên một trang khi in PDF
                    pageBreakAfter: 'always',
                    breakAfter: 'page',
                    WebkitBreakAfter: 'page',
                    backgroundColor: '#fff'
                  }}
                  style={{
                    height: "1123px",
                  }}
                >
                  <Typography variant="h6" fontWeight={700} color="#1976d2" mb={1}>
                    Thông tin sinh viên
                  </Typography>
                  <Typography><b>MSSV:</b> {s.identificationCode}</Typography>
                  <Typography><b>Điểm CK dự đoán:</b> {s.predictedFinalGrade ?? "--"}</Typography>
                  <Typography><b>Điểm CK thực tế:</b> {s.actualFinalGrade ?? "--"}</Typography>

                  <Typography mt={2} fontWeight={700} color="#1976d2" mb={1}>
                    Gợi ý cải thiện
                  </Typography>
                  {(s.suggestions ?? []).map((sg, j) => {
                    const sug = parseSuggestion(sg);
                    return (
                      <Box key={j} mb={1.5}>
                        <Typography fontWeight={700}>{renderBoldUpper(sug.step)}</Typography>
                        <Typography><b>Hành động:</b> {renderBoldUpper(sug.action)}</Typography>
                        <Typography><b>Lý do:</b> {renderBoldUpper(sug.reason)}</Typography>
                        <Typography><b>Thời gian:</b> {renderBoldUpper(sug.time)}</Typography>
                        <Typography><b>Công cụ:</b> {renderBoldUpper(sug.tools)}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              ))}
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setResultModalOpen(false)}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}
