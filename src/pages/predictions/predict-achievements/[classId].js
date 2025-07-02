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
  Divider,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { clearStudentList } from "@/redux/slice/dataSlice";
import { fetchClassDetail, fetchStudentList } from "@/redux/thunk/dataThunk";
import { TableWrapper } from "@/components/Analytics/Styles/Styles";
import PredictModal from "@/components/PredictionAchievements/PredictModal";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import GradeList from "@/components/PredictionAchievements/GradeList";
import SetupPredictModal from "@/components/PredictionAchievements/SetupPredictModal";
import PredictResultModal from "@/components/PredictionAchievements/PredictResultModal";
import { jwtDecode } from "jwt-decode";

export default function StudentListPage() {
  const router = useRouter();
  const { classId } = router.query;
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

  useEffect(() => {
    console.log("stdeutn: ", studentsGrade);
    console.log(classId);
  }, [studentsGrade, classId]);

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
    <Box sx={{ p: 3, position: "relative" }}>
      <Typography variant="h5" gutterBottom>
        Lớp: {_class?.className} - ID: {_class?.classId || classId}
      </Typography>

      {/* Search + select + predict */}
      <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Tìm MSSV…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && dispatch(clearStudentList())}
          sx={{ flex: 1, minWidth: 240 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => dispatch(clearStudentList())}>
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

      <Divider sx={{ my: 2, borderColor: "#ccc" }} />

      {/* Grades table */}
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
            <CircularProgress />
          </Box>
        )}
      </Box>
      {/* <PredictModal
        open={modalOpen}
        onClose={() => {
          if (loading) return;
          setModalOpen(false);
        }}
        classId={classId}
        studentIds={Array.from(selected)}
      /> */}
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
