import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function PredictResultModal({
  resultModalOpen,
  setResultModalOpen,
  predictState,
  targetText,
  studentsGrade,
}) {
  const [expandedRows, setExpandedRows] = useState({});
  const studentIdToCode = useMemo(() => {
    const map = {};
    if (studentsGrade) {
      studentsGrade.forEach((s) => {
        map[s.studentId] = s.identificationCode;
      });
    }
    return map;
  }, [studentsGrade]);
  const handleToggleRow = (studentId) => {
    setExpandedRows((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };
  return (
    <Dialog
      open={resultModalOpen}
      onClose={() => setResultModalOpen(false)}
      maxWidth="lg"
      fullWidth
      className="scroll-view"
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: 1,
        }}
      >
        🎯 Kết quả dự đoán
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        {predictState.loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : predictState.error ? (
          <Typography color="error">{predictState.error}</Typography>
        ) : (
          (() => {
            if (
              predictState.result &&
              typeof predictState.result === "object" &&
              (!Array.isArray(predictState.result.data) ||
                !predictState.result.success)
            ) {
              return (
                <Box textAlign="center">
                  <Typography color="error" fontWeight={600} fontSize={18}>
                    {predictState.result.message}
                  </Typography>
                  <Typography color="text.secondary">
                    Mã lỗi: {predictState.result.code}
                  </Typography>
                </Box>
              );
            }
            return (
              <Box display="flex" flexDirection="column" gap={3}>
                {targetText && (
                  <Box
                    mb={2}
                    sx={{
                      background: "#f0f7ff",
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid #90caf9",
                    }}
                  >
                    <Typography fontWeight={700} color="#1976d2" mb={1}>
                      Mục tiêu:
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        whiteSpace: "pre-line",
                        fontSize: 15,
                        textAlign: "justify",
                      }}
                    >
                      {targetText}
                    </Typography>
                  </Box>
                )}
                {Array.isArray(predictState.result?.data) &&
                predictState.result.data.length > 0 ? (
                  <TableContainer
                    component={Paper}
                    sx={{ mt: 0.5, borderRadius: 2, boxShadow: 2 }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ background: "#f5f7fa" }}>
                          <TableCell />
                          <TableCell align="center" sx={{ fontWeight: 700 }}>
                            MSSV
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700 }}>
                            Điểm mong muốn
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700 }}>
                            Điểm TB dự đoán
                          </TableCell>
                           <TableCell align="center" sx={{ fontWeight: 700 }}>
                            Điểm TB thực tế
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700 }}>
                            Điểm CK dự đoán
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700 }}>
                            Điểm CK thực tế
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700 }}>
                            Đủ điều kiện?
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700 }}>
                            Trung Bình
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {predictState.result.data.map((s, idx) => (
                          <React.Fragment key={s.studentId || idx}>
                            <TableRow>
                              <TableCell align="center" sx={{ width: 40 }}>
                                <IconButton
                                  size="small"
                                  onClick={() => handleToggleRow(s.studentId)}
                                >
                                  {expandedRows[s.studentId] ? (
                                    <ExpandLessIcon />
                                  ) : (
                                    <ExpandMoreIcon />
                                  )}
                                </IconButton>
                              </TableCell>
                              <TableCell align="center">
                                {s.identificationCode}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontWeight: 600,
                                  color: "#1976d2",
                                  whiteSpace: "pre-line",
                                  maxWidth: 180,
                                  wordBreak: "break-word",
                                }}
                              >
                                {s.targetGrade || "--"}
                              </TableCell>
                              <TableCell align="center">
                                {s.predictedTotalGrade || "--"}
                              </TableCell>
                              <TableCell align="center">
                                {s.actualTotalGrade || "--"}
                              </TableCell>
                              <TableCell align="center">
                                {s.predictedFinalGrade || "--"}
                              </TableCell>
                              <TableCell align="center">
                                {s.actualFinalGrade || "--"}
                              </TableCell>
                              <TableCell align="center">
                                {s.feasible ? (
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={1}
                                  >
                                    <span
                                      style={{
                                        color: "green",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Đạt
                                    </span>
                                    <span role="img" aria-label="success">
                                      ✅
                                    </span>
                                  </Box>
                                ) : (
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={1}
                                  >
                                    <span
                                      style={{
                                        color: "red",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Không đạt
                                    </span>
                                    <span role="img" aria-label="fail">
                                      ❌
                                    </span>
                                  </Box>
                                )}
                              </TableCell>
                              <TableCell align="center">
                                {s.mean || "--"}
                              </TableCell>
                            </TableRow>
                            {expandedRows[s.studentId] && (
                              <TableRow>
                                <TableCell
                                  colSpan={8}
                                  sx={{ background: "#f7fbff", p: 2 }}
                                >
                                  <Typography
                                    fontWeight={700}
                                    color="#1976d2"
                                    mb={1}
                                    fontSize={16}
                                  >
                                    Gợi ý cải thiện
                                  </Typography>
                                  {Array.isArray(s.suggestions) &&
                                  s.suggestions.length > 0 ? (
                                    <Box
                                      display="flex"
                                      flexDirection="column"
                                      gap={2}
                                    >
                                      {(() => {
                                        // Parse suggestions into steps (with color for step titles)
                                        const steps = [];
                                        let currentStep = null;
                                        s.suggestions.forEach((sg, i) => {
                                          const match = sg.match(/^[-•]\s*\*\*B[ưu]ớc\s*(\d+)\*\*/i);
                                          if (match) {
                                            if (currentStep) steps.push(currentStep);
                                            currentStep = {
                                              title: sg.replace(/^[-•]\s*/, ""),
                                              details: [],
                                            };
                                          } else if (currentStep) {
                                            currentStep.details.push(sg.replace(/^[-•]\s*/, ""));
                                          }
                                        });
                                        if (currentStep) steps.push(currentStep);
                                        if (steps.length === 0) {
                                          return s.suggestions.map((sg, i) => (
                                            <Box
                                              key={i}
                                              sx={{
                                                border: "1px solid #e0e0e0",
                                                borderRadius: 2,
                                                p: 1.2,
                                                mb: 1,
                                                background: "#fafbfc",
                                              }}
                                            >
                                              {sg.split('\n').map((line, idx) => {
                                                const isStep = /^\*\*B[ưu]ớc\s*\d+\*\*/i.test(line.trim());
                                                if (isStep) {
                                                  return (
                                                    <Typography
                                                      key={idx}
                                                      fontWeight={700}
                                                      color="#1976d2"
                                                      sx={{ display: 'block', whiteSpace: 'pre-line' }}
                                                    >
                                                      {line.replace(/\*\*/g, "")}
                                                    </Typography>
                                                  );
                                                } else {
                                                  // For normal lines, preserve line breaks by using Typography with whiteSpace: pre-line
                                                  return (
                                                    <Typography
                                                      key={idx}
                                                      fontSize={15}
                                                      color="text.secondary"
                                                      sx={{ display: 'block', whiteSpace: 'pre-line' }}
                                                    >
                                                      {line}
                                                    </Typography>
                                                  );
                                                }
                                              })}
                                            </Box>
                                          ));
                                        }
                                        return steps.map((step, idx) => (
                                          <Box
                                            key={idx}
                                            sx={{
                                              border: "1.5px solid #90caf9",
                                              borderRadius: 2,
                                              p: 1.5,
                                              background: "#f0f7ff",
                                              mb: 1,
                                            }}
                                          >
                                            <Typography
                                              fontWeight={700}
                                              color="#1976d2"
                                              mb={0.5}
                                              sx={{ display: 'block', whiteSpace: 'pre-line' }}
                                            >
                                              {step.title.replace(/\*\*/g, "")}
                                            </Typography>
                                            <Box pl={1}>
                                              {step.details.map((d, j) =>
                                                d.split('\n').map((line, idx) => (
                                                  <Typography
                                                    key={j + '-' + idx}
                                                    fontSize={15}
                                                    color="text.secondary"
                                                    mb={0.5}
                                                    sx={{ display: 'block', whiteSpace: 'pre-line' }}
                                                  >
                                                    {line}
                                                  </Typography>
                                                ))
                                              )}
                                            </Box>
                                          </Box>
                                        ));
                                      })()}
                                    </Box>
                                  ) : (
                                    <span>-</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            )}
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography textAlign="center">
                    Không có dữ liệu sinh viên.
                  </Typography>
                )}
              </Box>
            );
          })()
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setResultModalOpen(false)}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}
