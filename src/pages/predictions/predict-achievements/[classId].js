// pages/classes/[id]/students.js
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { clearStudentList } from '@/redux/slice/dataSlice';
import { fetchStudentList } from '@/redux/thunk/dataThunk';
import { TableWrapper } from '@/components/Analytics/Styles/Styles';
import PredictModal from '@/components/PredictionAchievements/PredictModal';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { predictGradesBatchThunk } from '@/redux/thunk/predictThunk';
import { clearPredictResult } from '@/redux/slice/predictSlice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function StudentListPage() {
  const router = useRouter();
  const { classId } = router.query;
  const dispatch = useDispatch();

  const { loading, studentsGrade, page, amount, hasMore } = useSelector(s => s.data);
  const predictState = useSelector(s => s.predict);

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [weightModalOpen, setWeightModalOpen] = useState(false);
  const containerRef = useRef();

  const [weights, setWeights] = useState({
    midterm: 25,
    final: 50,
    project: 15,
    practice: 10,
  });
  const [weightError, setWeightError] = useState('');
  const [goal, setGoal] = useState('');
  const [goalError, setGoalError] = useState('');
  const [targetText, setTargetText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [analyzeResult, setAnalyzeResult] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  const studentIdToCode = useMemo(() => {
    const map = {};
    studentsGrade.forEach(s => {
      map[s.studentId] = s.identificationCode;
    });
    return map;
  }, [studentsGrade]);

  const handleWeightChange = (field, value) => {
    const num = Number(value);
    setWeights(prev => ({ ...prev, [field]: isNaN(num) ? '' : num }));
  };

  const handleSaveWeights = () => {
    const total =
      Number(weights.midterm) +
      Number(weights.final) +
      Number(weights.project) +
      Number(weights.practice);
    if (total !== 100) {
      setWeightError('Tổng phần trăm phải bằng 100%');
      return;
    }
    setWeightError('');
    setWeightModalOpen(false);
  };
  useEffect(() => {
    if (!classId) return;
    dispatch(clearStudentList());
    dispatch(fetchStudentList({
      classId,
      type: 'summary',
      page: 1,
      amount,
      search,
    }));
    setSelected(new Set());
  }, [classId, search, dispatch, amount]);

  useEffect(() => {
    console.log("stdeutn: ", studentsGrade);
    console.log(classId)
  }, [studentsGrade, classId]);


  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      if (loading || !hasMore) return;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
        dispatch(fetchStudentList({
          classId,
          type: 'summary',
          page: page + 1,
          amount,
          search,
        }));
      }
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [loading, hasMore, page, classId, amount, search, dispatch]);


  const toggleOne = id => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };


  const allIds = useMemo(() => studentsGrade.map(s => s.studentId), [studentsGrade]);
  const toggleAll = () => {
    setSelected(prev =>
      prev.size === allIds.length
        ? new Set()
        : new Set(allIds)
    );
  };

  const goPredict = () => {
    if (selected.size === 0) return;
    setWeightModalOpen(true);
  };

  const cellStyle = { fontSize: 16, textAlign: 'center' };
  const headerStyle = { ...cellStyle, fontWeight: 700 };

  const handleToggleRow = (studentId) => {
    setExpandedRows(prev => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  return (
    <Box sx={{ p: 3, position: 'relative' }}>
      <Typography variant="h5" gutterBottom>
        Điểm sinh viên – Lớp {classId}
      </Typography>

      {/* Search + select + predict */}
      <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Tìm MSSV…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && dispatch(clearStudentList())}
          sx={{ flex: 1, minWidth: 240 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => dispatch(clearStudentList())}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={allIds.length > 0 && selected.size === allIds.length}
              indeterminate={selected.size > 0 && selected.size < allIds.length}
              onChange={toggleAll}
            />
          }
          label="Chọn tất cả"
        />

        <Button
          variant="contained"
          disabled={selected.size === 0}
          onClick={() => setWeightModalOpen(true)}
        >
          Dự đoán ({selected.size})
        </Button>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#ccc' }} />

      {/* Grades table */}
      <TableWrapper>
        <TableContainer component={Paper} ref={containerRef} sx={{ maxHeight: 550, overflow: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={headerStyle}>STT</TableCell>
                <TableCell sx={headerStyle}>MSSV</TableCell>
                <TableCell sx={headerStyle}>Giữa kỳ</TableCell>
                <TableCell sx={headerStyle}>Cuối kỳ</TableCell>
                <TableCell sx={headerStyle}>Đồ án</TableCell>
                <TableCell sx={headerStyle}>Thực hành</TableCell>
                <TableCell sx={headerStyle}>Tổng kết</TableCell>
                <TableCell sx={headerStyle}>Loại ĐK</TableCell>
                <TableCell sx={headerStyle}>Trạng thái</TableCell>
                <TableCell sx={headerStyle} padding="checkbox" />
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsGrade.length > 0 ? studentsGrade.map((g, idx) => (
                <TableRow hover key={g.studentId}>
                  <TableCell sx={cellStyle}>{idx + 1}</TableCell>
                  <TableCell sx={cellStyle}>{g.identificationCode}</TableCell>
                  <TableCell sx={cellStyle}>{g.midtermGrade ?? '-'}</TableCell>
                  <TableCell sx={cellStyle}>{g.finalGrade ?? '-'}</TableCell>
                  <TableCell sx={cellStyle}>{g.projectGrade ?? '-'}</TableCell>
                  <TableCell sx={cellStyle}>{g.practiceGrade ?? '-'}</TableCell>
                  <TableCell sx={cellStyle}>{g.totalGrade ?? '-'}</TableCell>
                  <TableCell sx={cellStyle}>{g.registrationType}</TableCell>
                  <TableCell sx={cellStyle}>{g.status}</TableCell>
                  <TableCell sx={cellStyle} padding="checkbox">
                    <Checkbox
                      checked={selected.has(g.studentId)}
                      onChange={() => toggleOne(g.studentId)}
                    />
                  </TableCell>
                </TableRow>
              )) : (
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

      {loading && (
        <Box
          position="absolute"
          inset={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(255,255,255,0.6)"
          zIndex={10}
        >
          <CircularProgress />
        </Box>
      )}
      <PredictModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        classId={classId}
        studentIds={Array.from(selected)}
      />

      <Dialog open={weightModalOpen} onClose={() => setWeightModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Thiết lập phần trăm điểm</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Điểm mong muốn"
              value={goal}
              onChange={e => {
                setGoal(e.target.value.toUpperCase());
                setGoalError('');
              }}
              placeholder="Nhập A, B, C, D hoặc F"
              inputProps={{ maxLength: 1 }}
              error={!!goalError}
              helperText={goalError || 'Chỉ nhập 1 ký tự: A, B, C, D, F'}
            />
            <TextField
              label="Mục tiêu"
              value={targetText}
              onChange={e => setTargetText(e.target.value)}
              placeholder="Nhập mục tiêu của bạn ví dụ: Đạt điểm A, cải thiện kỹ năng, ..."
              multiline
              minRows={2}
              maxRows={4}
              fullWidth
            />
            <TextField
              label="Giữa kỳ (%)"
              type="number"
              value={weights.midterm}
              onChange={e => handleWeightChange('midterm', e.target.value)}
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              label="Cuối kỳ (%)"
              type="number"
              value={weights.final}
              onChange={e => handleWeightChange('final', e.target.value)}
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              label="Đồ án (%)"
              type="number"
              value={weights.project}
              onChange={e => handleWeightChange('project', e.target.value)}
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              label="Thực hành (%)"
              type="number"
              value={weights.practice}
              onChange={e => handleWeightChange('practice', e.target.value)}
              inputProps={{ min: 0, max: 100 }}
            />
            {weightError && (
              <Box color="error.main" fontSize={14}>{weightError}</Box>
            )}
            <Box fontSize={13} color="text.secondary">
              Tổng các phần trăm phải bằng 100%. Ví dụ: Giữa kỳ 25, Cuối kỳ 50, Đồ án 15, Thực hành 10.
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWeightModalOpen(false)} disabled={analyzing}>Hủy</Button>
          <Button variant="contained" onClick={async () => {
            const total = Number(weights.midterm) + Number(weights.final) + Number(weights.project) + Number(weights.practice);
            if (total !== 100) {
              setWeightError('Tổng phần trăm phải bằng 100%');
              return;
            }
            // Validate điểm mong muốn
            if (!['A', 'B', 'C', 'D', 'F'].includes(goal)) {
              setGoalError('Chỉ được nhập 1 ký tự: A, B, C, D, F');
              return;
            }
            setWeightError('');
            setGoalError('');
            setAnalyzing(true);
           
            const selectedStudents = studentsGrade.filter(s => selected.has(s.studentId));
            
            const students = selectedStudents.map(s => {
              const scores = {};
              if (s.midtermGrade !== undefined && s.midtermGrade !== null) scores.midterm = s.midtermGrade;
              if (s.finalGrade !== undefined && s.finalGrade !== null) scores.final = s.finalGrade;
              if (s.projectGrade !== undefined && s.projectGrade !== null) scores.project = s.projectGrade;
              if (s.practiceGrade !== undefined && s.practiceGrade !== null) scores.practice = s.practiceGrade;
              if (s.quiz1Grade !== undefined && s.quiz1Grade !== null) scores.quiz1 = s.quiz1Grade;
              const weightsObj = {};
              if (weights.midterm !== undefined && weights.midterm !== null) weightsObj.midterm = Number(weights.midterm);
              if (weights.final !== undefined && weights.final !== null) weightsObj.final = Number(weights.final);
              if (weights.project !== undefined && weights.project !== null) weightsObj.project = Number(weights.project);
              if (weights.practice !== undefined && weights.practice !== null) weightsObj.practice = Number(weights.practice);
              if (weights.quiz1 !== undefined && weights.quiz1 !== null) weightsObj.quiz1 = Number(weights.quiz1);
              return {
                studentId: s.studentId,
                identificationCode: s.identificationCode,
                courseName: s.courseName || '',
                targetGrade: goal,
                scores,
                weights: weightsObj,
              };
            });
            dispatch(clearPredictResult());
            try {
              await dispatch(predictGradesBatchThunk({ outcomes: goal, students })).unwrap();
            } catch (err) {
             
            } finally {
              setAnalyzing(false);
              setWeightModalOpen(false);
              setResultModalOpen(true);
            }
          }} disabled={analyzing}>
            {analyzing ? <CircularProgress size={22} color="inherit" /> : 'Phân tích'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={resultModalOpen} onClose={() => setResultModalOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>
          🎯 Kết quả dự đoán 
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {predictState.loading ? (
            <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>
          ) : predictState.error ? (
            <Typography color="error">{predictState.error}</Typography>
          ) : (
            (() => {
              if (
                predictState.result &&
                typeof predictState.result === 'object' &&
                (!Array.isArray(predictState.result.data) || !predictState.result.success)
              ) {
                return (
                  <Box textAlign="center">
                    <Typography color="error" fontWeight={600} fontSize={18}>
                      {predictState.result.message}
                    </Typography>
                    <Typography color="text.secondary">Mã lỗi: {predictState.result.code}</Typography>
                  </Box>
                );
              }
              return (
                <Box display="flex" flexDirection="column" gap={3}>
                  {targetText && (
                    <Box
                    mb={2}
                    sx={{
                      background: '#f0f7ff',
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid #90caf9',
                    }}
                  >
                    <Typography fontWeight={700} color="#1976d2" mb={1}>
                     Mục tiêu:
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        whiteSpace: 'pre-line',
                        fontSize: 15,
                        textAlign: 'justify',
                      }}
                    >
                      {targetText}
                    </Typography>
                  </Box>
                  
                  )}
                  {Array.isArray(predictState.result?.data) && predictState.result.data.length > 0 ? (
                    <TableContainer component={Paper} sx={{ mt: 0.5, borderRadius: 2, boxShadow: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ background: '#f5f7fa' }}>
                            <TableCell />
                            <TableCell align="center" sx={{ fontWeight: 700 }}>MSSV</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>Điểm mong muốn</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>Điểm TB hiện tại</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>Điểm CK dự đoán</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>Điểm CK cần đạt</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>Đủ điều kiện?</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {predictState.result.data.map((s, idx) => (
                            <React.Fragment key={s.studentId || idx}>
                              <TableRow>
                                <TableCell align="center" sx={{ width: 40 }}>
                                  <IconButton size="small" onClick={() => handleToggleRow(s.studentId)}>
                                    {expandedRows[s.studentId] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                  </IconButton>
                                </TableCell>
                                <TableCell align="center">{studentIdToCode[s.studentId] || s.studentId}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 600, color: '#1976d2', whiteSpace: 'pre-line', maxWidth: 180, wordBreak: 'break-word' }}>{s.targetGrade}</TableCell>
                                <TableCell align="center">{s.currentAvg}</TableCell>
                                <TableCell align="center">{s.predictedFinalGrade}</TableCell>
                                <TableCell align="center">{s.requiredFinalScore}</TableCell>
                                <TableCell align="center">
                                  {s.feasible ? (
                                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                      <span style={{ color: 'green', fontWeight: 700 }}>Đạt</span>
                                      <span role="img" aria-label="success">✅</span>
                                    </Box>
                                  ) : (
                                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                      <span style={{ color: 'red', fontWeight: 700 }}>Không đạt</span>
                                      <span role="img" aria-label="fail">❌</span>
                                    </Box>
                                  )}
                                </TableCell>
                          
                    
                              </TableRow>
                              {expandedRows[s.studentId] && (
                                <TableRow>
                                  <TableCell colSpan={8} sx={{ background: '#f7fbff', p: 2 }}>
                                    <Typography fontWeight={700} color="#1976d2" mb={1} fontSize={16}>
                                      Gợi ý cải thiện
                                    </Typography>
                                    {Array.isArray(s.suggestions) && s.suggestions.length > 0 ? (
                                      <Box display="flex" flexDirection="column" gap={2}>
                                        {(() => {
                                          const steps = [];
                                          let currentStep = null;
                                          s.suggestions.forEach((sg, i) => {
                                            const match = sg.match(/^[-•]\s*\*\*B[ưu]ớc\s*(\d+)\*\*/i);
                                            if (match) {
                                              if (currentStep) steps.push(currentStep);
                                              currentStep = { title: sg.replace(/^[-•]\s*/, ''), details: [] };
                                            } else if (currentStep) {
                                              currentStep.details.push(sg.replace(/^[-•]\s*/, ''));
                                            }
                                          });
                                          if (currentStep) steps.push(currentStep);
                                          if (steps.length === 0) {
                                            return s.suggestions.map((sg, i) => (
                                              <Box key={i} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 1.2, mb: 1, background: '#fafbfc' }}>
                                                <span dangerouslySetInnerHTML={{ __html: sg }} />
                                              </Box>
                                            ));
                                          }
                                          return steps.map((step, idx) => (
                                            <Box key={idx} sx={{ border: '1.5px solid #90caf9', borderRadius: 2, p: 1.5, background: '#f0f7ff', mb: 1 }}>
                                              <Typography fontWeight={700} color="#1976d2" mb={0.5}>
                                                {step.title.replace(/\*\*/g, '')}
                                              </Typography>
                                              <Box pl={1}>
                                                {step.details.map((d, j) => (
                                                  <Typography key={j} fontSize={15} color="text.secondary" mb={0.5}>
                                                    <span dangerouslySetInnerHTML={{ __html: d }} />
                                                  </Typography>
                                                ))}
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
                    <Typography textAlign="center">Không có dữ liệu sinh viên.</Typography>
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
    </Box>
  );
}
