// components/PredictionAchievements/PredictModal.jsx
import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, CircularProgress, Typography, Box
} from '@mui/material';
import axios from 'axios';

export default function PredictModal({ open, onClose, classId, studentIds }) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!open) return;
    const fetchPredictions = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post('/api/predict/grades_batch', {
          students: studentIds.map(id => ({ student_id: id, class_id: classId }))
        });
        setResults(data.data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPredictions();
  }, [open, classId, studentIds]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Dự đoán điểm cuối kỳ</DialogTitle>
      <DialogContent>
        {loading
          ? <Box display="flex" justifyContent="center" p={4}><CircularProgress/></Box>
          : results.length > 0
            ? (
              <TableContainer component={Paper}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>MSSV</TableCell>
                      <TableCell>Điểm giữa kỳ</TableCell>
                      <TableCell>Điểm đồ án</TableCell>
                      <TableCell>Điểm thực hành</TableCell>
                      <TableCell>Điểm dự đoán CK</TableCell>
                      <TableCell>Gợi ý</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map((r, idx) => (
                      <TableRow key={r.student_id}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{r.student_id}</TableCell>
                        <TableCell>{r.midterm}</TableCell>
                        <TableCell>{r.project}</TableCell>
                        <TableCell>{r.practice}</TableCell>
                        <TableCell>{r.predicted_final_grade}</TableCell>
                        <TableCell>
                          {r.suggestions.map((s, i) => (
                            <Typography key={i} variant="body2">• {s}</Typography>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
            : <Typography align="center" p={4}>Không có dữ liệu dự đoán</Typography>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}
