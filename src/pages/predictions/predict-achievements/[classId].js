// pages/classes/[id]/students.js
import { useRouter } from "next/router";
import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { clearStudentList } from "@/redux/slice/dataSlice";
import { fetchClassDetail, fetchStudentList } from "@/redux/thunk/dataThunk";
import GradeList from "@/components/PredictionAchievements/GradeList";
import SetupPredictModal from "@/components/PredictionAchievements/SetupPredictModal";
import PredictResultModal from "@/components/PredictionAchievements/PredictResultModal";
import { jwtDecode } from "jwt-decode";

export default function StudentListPage() {
  const router = useRouter();
  const { classId, className, courseName } = router.query;
  const dispatch = useDispatch();

  const { loading, studentsGrade, page, amount, hasMore } = useSelector(
    (s) => s.data
  );
  const predictState = useSelector((s) => s.predict);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [weightModalOpen, setWeightModalOpen] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);
  const { _class } = useSelector((state) => state.data);
  const userId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const { sub } = jwtDecode(accessToken);
      return sub;
    } catch {
      return null;
    }
  }, [accessToken]);
  const containerRef = useRef();

  const [weights, setWeights] = useState({
    assignmentQuiz: 10,
    midterm: 10,
    final: 40,
    project: 30,
    practice: 10,
  });
  const [weightError, setWeightError] = useState("");
  const [goal, setGoal] = useState("");
  const [goalError, setGoalError] = useState("");
  const [targetText, setTargetText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [analyzeResult, setAnalyzeResult] = useState(null);

  const handleWeightChange = (field, value) => {
    const num = Number(value);
    setWeights((prev) => ({ ...prev, [field]: isNaN(num) ? "" : num }));
  };

  useEffect(() => {
    if (!classId) return;
    dispatch(clearStudentList());
    dispatch(
      fetchStudentList({
        classId,
        type: "summary",
        page: 1,
        amount,
        search,
      })
    );
    setSelected(new Set());
  }, [classId, search, dispatch, amount]);

  useEffect(() => {
    if (!classId) return;
    dispatch(fetchClassDetail({ instructorId: userId, classId }));
  }, [classId]);

  // useEffect(() => {
  //   console.log("stdeutn: ", studentsGrade);
  //   console.log(classId);
  // }, [studentsGrade, classId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      if (loading || !hasMore) return;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
        dispatch(
          fetchStudentList({
            classId,
            type: "summary",
            page: page + 1,
            amount,
            search,
          })
        );
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [loading, hasMore, page, classId, amount, search, dispatch]);

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allIds = useMemo(
    () => studentsGrade.map((s) => s.studentId),
    [studentsGrade]
  );
  const toggleAll = () => {
    setSelected((prev) =>
      prev.size === allIds.length ? new Set() : new Set(allIds)
    );
  };

  const cellStyle = { fontSize: 16, textAlign: "center" };
  const headerStyle = { ...cellStyle, fontWeight: 700 };

  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    dispatch(
      fetchStudentList({
        classId,
        type: "summary",
        page: page + 1,
        amount,
        search,
      })
    );
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh'
    }}>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          border: '1px solid #e2e8f0',
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#1e3a8a',
            fontWeight: 600,
            mb: 1,
          }}
        >
          {className || _class?.className || `Lớp ${classId}`}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#64748b',
            fontWeight: 500,
          }}
        >
         {/* {courseName || "Chưa có thông tin môn học"}*/} 
        </Typography>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          border: '1px solid #e5e7eb',
          borderRadius: 2,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        }}
      >
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <TextField
            size="small"
            placeholder="Tìm kiếm MSSV..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && dispatch(clearStudentList())}
            sx={{ flex: 1, minWidth: 240 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => dispatch(clearStudentList())}
                    sx={{
                      color: '#1e3a8a',
                      '&:hover': {
                        backgroundColor: 'rgba(30, 58, 138, 0.1)',
                      },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={allIds.length > 0 && selected.size === allIds.length}
                indeterminate={selected.size > 0 && selected.size < allIds.length}
                onChange={toggleAll}
                sx={{
                  color: '#1e3a8a',
                  '&.Mui-checked': {
                    color: '#1e3a8a',
                  },
                }}
              />
            }
            label={
              <Typography sx={{ fontWeight: 500, color: '#374151' }}>
                Chọn tất cả
              </Typography>
            }
          />

          <Button
            variant="contained"
            disabled={selected.size === 0}
            onClick={() => setWeightModalOpen(true)}
            sx={{
              bgcolor: '#7c3aed',
              '&:hover': {
                bgcolor: '#6d28d9',
              },
              '&:disabled': {
                bgcolor: '#d1d5db',
                color: '#9ca3af',
              },
              fontWeight: 600,
              px: 3,
            }}
          >
            Dự đoán ({selected.size})
          </Button>
        </Box>
      </Paper>

      {/* Grades table */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid #e5e7eb',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box position="relative">
          <GradeList
            grades={studentsGrade}
            selected={selected}
            toggleOne={toggleOne}
            onLoadMore={handleLoadMore}
          />
          {loading && (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="rgba(255,255,255,0.7)"
              zIndex={10}
            >
              <CircularProgress size="50px" sx={{ color: '#1e3a8a' }} />
            </Box>
          )}
        </Box>
      </Paper>

      <SetupPredictModal
        weightModalOpen={weightModalOpen}
        setWeightModalOpen={setWeightModalOpen}
        setTargetText={setTargetText}
        targetText={targetText}
        setResultModalOpen={setResultModalOpen}
        studentsGrade={studentsGrade}
        selected={selected}
        weightError={weightError}
        setWeightError={setWeightError}
        handleWeightChange={handleWeightChange}
        setGoalError={setGoalError}
        setAnalyzing={setAnalyzing}
        analyzing={analyzing}
        goal={goal}
        setGoal={setGoal}
        goalError={goalError}
        weights={weights}
        _class={_class}
      />
      <PredictResultModal
        resultModalOpen={resultModalOpen}
        setResultModalOpen={setResultModalOpen}
        predictState={predictState}
        targetText={targetText}
      />
    </Box>
  );
}
