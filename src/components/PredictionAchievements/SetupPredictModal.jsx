import { clearPredictResult } from "@/redux/slice/predictSlice";
import { predictGradesBatchThunk } from "@/redux/thunk/predictThunk";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

export default function SetupPredictModal({
  weightModalOpen,
  setWeightModalOpen,
  setTargetText,
  targetText,
  setResultModalOpen,
  studentsGrade,
  selected,
  weightError,
  setWeightError,
  handleWeightChange,
  setGoalError,
  setAnalyzing,
  analyzing,
  goal,
  goalError,
  setGoal,
  weights,
  _class,
}) {
  const dispatch = useDispatch();
  const isCancelled = useRef(false);
  const abortController = useRef(null);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (analyzing) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    if (analyzing) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [analyzing]);

  const handleClose = () => {
    if (analyzing) {
      const confirmClose = window.confirm(
        "Tiến trình phân tích đang diễn ra. Bạn có chắc chắn muốn thoát? Tiến trình sẽ bị hủy."
      );
      if (!confirmClose) return;
      setAnalyzing(false);
      isCancelled.current = true;
      if (abortController.current) {
        abortController.current.abort();
      }
    }
    setWeightModalOpen(false);
  };

  return (
    <Dialog
      open={weightModalOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Thiết lập phần trăm điểm</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {/* <TextField
            label="Điểm mong muốn"
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value.toUpperCase());
              setGoalError("");
            }}
            placeholder="Nhập A, B, C, D hoặc F"
            inputProps={{ maxLength: 1 }}
            error={!!goalError}
            helperText={goalError || "Chỉ nhập 1 ký tự: A, B, C, D, F"}
          /> */}
          <TextField
            label="Giữa kỳ (%)"
            type="number"
            value={weights.midterm}
            onChange={(e) => handleWeightChange("midterm", e.target.value)}
            inputProps={{ min: 0, max: 100 }}
          />
          <TextField
            label="Cuối kỳ (%)"
            type="number"
            value={weights.final}
            onChange={(e) => handleWeightChange("final", e.target.value)}
            inputProps={{ min: 0, max: 100 }}
          />
          <TextField
            label="Đồ án (%)"
            type="number"
            value={weights.project}
            onChange={(e) => handleWeightChange("project", e.target.value)}
            inputProps={{ min: 0, max: 100 }}
          />
          <TextField
            label="Thực hành (%)"
            type="number"
            value={weights.practice}
            onChange={(e) => handleWeightChange("practice", e.target.value)}
            inputProps={{ min: 0, max: 100 }}
          />
          <TextField
            label="Bài tập (%)"
            type="number"
            value={weights.assignmentQuiz}
            onChange={(e) => handleWeightChange("assignmentQuiz", e.target.value)}
            inputProps={{ min: 0, max: 100 }}
          />
          {weightError && (
            <Box color="error.main" fontSize={14}>
              {weightError}
            </Box>
          )}
          <Box fontSize={13} color="text.secondary">
            Tổng các phần trăm phải bằng 100%. Ví dụ: Bài tập 10, Giữa kỳ 25, Cuối kỳ 50, Đồ án 5, Thực hành 10.
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={analyzing}>
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            isCancelled.current = false;
            abortController.current = new AbortController();
            const total =
              Number(weights.assignmentQuiz) +
              Number(weights.midterm) +
              Number(weights.final) +
              Number(weights.project) +
              Number(weights.practice);
            if (total !== 100) {
              setWeightError("Tổng phần trăm phải bằng 100%");
              return;
            }
            // Validate điểm mong muốn
            // if (!["A", "B", "C", "D", "F"].includes(goal)) {
            //   setGoalError("Chỉ được nhập 1 ký tự: A, B, C, D, F");
            //   return;
            // }
            setWeightError("");
            // setGoalError("");
            setAnalyzing(true);

            const selectedStudents = studentsGrade.filter((s) =>
              selected.has(s.studentId)
            );

            const students = selectedStudents.map((s) => {
              const scores = {};
              if (
                s.assignmentQuizGrade !== undefined &&
                s.assignmentQuizGrade !== null
              )
                scores.assignmentQuiz = s.assignmentQuizGrade;
              if (s.midtermGrade !== undefined && s.midtermGrade !== null)
                scores.midterm = s.midtermGrade;
              if (s.finalGrade !== undefined && s.finalGrade !== null)
                scores.final = s.finalGrade;
              if (s.projectGrade !== undefined && s.projectGrade !== null)
                scores.project = s.projectGrade;
              if (s.practiceGrade !== undefined && s.practiceGrade !== null)
                scores.practice = s.practiceGrade;
              const weightsObj = {};
              if (
                weights.assignmentQuiz !== undefined &&
                weights.assignmentQuiz !== null
              )
                weightsObj.assignmentQuiz = Number(weights.assignmentQuiz);
              if (weights.midterm !== undefined && weights.midterm !== null)
                weightsObj.midterm = Number(weights.midterm);
              if (weights.final !== undefined && weights.final !== null)
                weightsObj.final = Number(weights.final);
              if (weights.project !== undefined && weights.project !== null)
                weightsObj.project = Number(weights.project);
              if (weights.practice !== undefined && weights.practice !== null)
                weightsObj.practice = Number(weights.practice);
              return {
                studentId: s.studentId,
                scores: scores,
                identificationCode: s.identificationCode,
                targetGrade: "A", // hard code for now
                weights: weightsObj,
              };
            });
            dispatch(clearPredictResult());
            try {
              await dispatch(
                predictGradesBatchThunk({
                  students,
                  courseName: _class?.courseName,
                  classId: _class?.classId,
                  signal: abortController.current.signal,
                })
              ).unwrap();
            } catch (err) {
            } finally {
              setAnalyzing(false);
              setWeightModalOpen(false);
              if (!isCancelled.current) {
                setResultModalOpen(true);
              }
            }
          }}
          disabled={analyzing}
        >
          {analyzing ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Phân tích"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
