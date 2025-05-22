import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  Container,

  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton

} from "@mui/material";
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
import { fetchClassesByLecturer, fetchFraudDetect, fetchImportQuizFile } from "@/redux/thunk/fraudDetectionThunk";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchClassesByLecturer } from "@/redux/thunk/analyticsThunk";

import InputAdornment from '@mui/material/InputAdornment';
import { TableFraudDetection } from "@/components/FraudDetection/TableFraudDetection";
import { Dialog1 } from "@/components/FraudDetection/Dialog1";
import { Dialog2 } from "@/components/FraudDetection/Dialog2";
import { Dialog3 } from "@/components/FraudDetection/Dialog3";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
// Dữ liệu mẫu
const sampleData = [
  { id: 1, mssv: "21127001", name: "Nguyễn Văn A", score: 10, timeTaken: "10m22s", deviation: "24m38s", reason: "Làm quá nhanh so với trung bình" },
  { id: 2, mssv: "21127002", name: "Nguyễn Văn B", score: 10, timeTaken: "09m15s", deviation: "25m45s", reason: "Làm quá nhanh so với trung bình" },
];

const FraudDetection = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { classes, students, quizImport } = useSelector(state => state.fraudDetection);
  const dispatch = useDispatch();

  const [disabledTest, SetDisabledTest] = useState(true)
  const [disabledThreehold, SetDisabledThreehold] = useState(true)

  const [hasThreeHold, setHasThreeHold] = useState(false);

  const [classesSelect, setClassesSelect] = useState("");
  const [quizSelect, setQuizSelect] = useState("");

  const [Quiz, SetQuiz] = useState([]);
  const [data, setData] = useState([]);

  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [openDialog3, setOpenDialog3] = useState(false);

  const [minTime, SetMinTime] = useState();
  const [maxTime, SetMaxTime] = useState();

  const { accessToken } = useSelector(state => state.auth);
  const userId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const { sub } = jwtDecode(accessToken);
      return sub;
    } catch {
      return null;
    }
  }, [accessToken]);


  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Kiểm tra nếu minTime và maxTime đã được thiết lập
      if (minTime && maxTime) {
        e.preventDefault();
        e.returnValue = ""; // Một chuỗi rỗng sẽ hiển thị hộp thoại xác nhận mặc định
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [minTime, maxTime]);



  useEffect(() => {
    const fetchClasses = async () => {

      await dispatch(fetchClassesByLecturer({ userId }));
    }
    fetchClasses();
  }, [userId]);

  useEffect(() => {

    setData(students);

  }, [students])

  useEffect(() => {
    const reFetch = async () => {
      if (quizImport != null) {

        await dispatch(fetchClassesByLecturer({ userId }));
        setClassesSelect(classesSelect)
      }

    }
    reFetch();

  }, [quizImport])


  useEffect(() => {
    if (classesSelect) {
      const foundClassess = classes.find(cls => cls.classId == classesSelect)
      SetQuiz(foundClassess.quizzes);
      SetDisabledTest(false)
    }

  }, [classesSelect])


  const handleOpenDialog1 = () => {
    setOpenDialog1(true);
  };

  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
  };

  const handleOpenDialog2 = () => {
    setOpenDialog1(false);
    setOpenDialog2(true);
  };

  const handleCloseDialog2 = () => {
    setOpenDialog2(false);
  };

  const handleOpenDialog3 = () => {
    setOpenDialog1(false);
    setOpenDialog3(true);
  };

  const handleCloseDialog3 = () => {
    setOpenDialog3(false);
  };

  const handleChosingClass = (classIdChosen) => {
    setClassesSelect(classIdChosen)
  };

  const handleChosingQuiz = (QuizIdChosen) => {
    if (QuizIdChosen === 'import') {
      fileInputRef.current.click();

    }
    else {
      SetDisabledThreehold(false);
      setQuizSelect(QuizIdChosen);
    }
  }

  const handleFileChange = async (e) => {
    setLoading(true);

    const file = e.target.files[0];

    if (file) {
      await dispatch(fetchImportQuizFile({ userId, file, class_id: classesSelect, activity_type: "quiz" }));

      alert("Nhập file thành công! Vui lòng kiểm tra lại các bài kiểm tra")
      setLoading(false);
    }
  };

  const handleDetect = async () => {
    setLoading(true);
    console.log(`Handle Detect: ${userId} ${quizSelect} ${minTime} ${maxTime}`)

    await dispatch(fetchFraudDetect({ userId, quiz_id: quizSelect, min_threshold: minTime, max_threshold: maxTime }));

    alert("Phân tích thành công")
    setLoading(false);


  }



  return (
    <div style={{ cursor: loading ? 'wait' : 'default' }}>
      <Container maxWidth={false} sx={{ padding: 2 }}> {/* Set the container to full width */}

        {/* Bộ lọc + Button */}
        <Grid container spacing={2} alignItems="center" mb={3}>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl style={{ width: "30%", minWidth: 450 }} size="small">
              <InputLabel>Lớp</InputLabel>
              <Select
                label="Chọn lớp"
                value={classesSelect}
                onChange={(e) => handleChosingClass(e.target.value)}

              >

                {classes.map((item) => {
                  return <MenuItem value={item.classId}> {item.className}</MenuItem>
                })}



              </Select>

            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4} >
            <FormControl style={{ width: "30%", minWidth: 450 }} size="small" disabled={disabledTest}>
              <InputLabel>Bài kiểm tra</InputLabel>
              <Select
                label="Chọn bài kiểm tra"
                value={quizSelect}
                onChange={(e) => handleChosingQuiz(e.target.value)}

              >

                <MenuItem value="import">📁 Nhập một bài kiểm tra</MenuItem>
                {
                  Quiz.map((item) => {
                    return <MenuItem value={item.quizId}>{item.quizName}</MenuItem>
                  })
                }


              </Select>
            </FormControl>
            {/* Input ẩn */}
            <input
              type="file"
              accept=".csv,.xlsx"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Button
              disabled={disabledThreehold}
              variant="contained"
              onClick={handleOpenDialog1}
              fullWidth
              sx={{
                backgroundColor: '#8E24AA',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#7B1FA2',
                },
              }}
            >
              Thiết lập ngưỡng
            </Button>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Button
              disabled={disabledThreehold}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#1976D2',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#303F9F',
                },
              }}
              onClick={() => handleDetect()}
            >
              Phân tích
            </Button>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderBottom: "1.2px solid #ccc",
            marginY: 3,
          }}
        />
        {/* Bảng dữ liệu */}
        <TableFraudDetection data={data}></TableFraudDetection>

        {/* Dialogs */}

        <Dialog1
          openDialog1={openDialog1}
          handleCloseDialog1={handleCloseDialog1}
          handleOpenDialog3={handleOpenDialog3}
          handleOpenDialog2={handleOpenDialog2}
          hasThreeHold={hasThreeHold}
        ></Dialog1>

        {/* Dialog 2: Hiển thị ngưỡng mặc định */}


        <Dialog2
          openDialog2={openDialog2}
          handleCloseDialog2={handleCloseDialog2}
          hasThreeHold={hasThreeHold}
          SetMaxTime={SetMaxTime}
          SetMinTime={SetMinTime}
          setHasThreeHold={setHasThreeHold}
        >

        </Dialog2>


        {/* Dialog 3: THIẾT LẬP NGƯỠNG */}
        <Dialog3
          openDialog3={openDialog3}
          handleCloseDialog3={handleCloseDialog3}
          SetMinTime={SetMinTime}
          SetMaxTime={SetMaxTime}
          setHasThreeHold={setHasThreeHold}
          minTime={minTime}
          maxTime={maxTime}
        ></Dialog3>
      </Container>
    </div>
  );
};

export default FraudDetection;