import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";
import {
  Add,
  FileDownload,
  Info,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useMemo, useState } from "react";
import EditStudentModal from "@/components/StudentManagement/EditStudentModal";
import AddStudentModal from "@/components/StudentManagement/AddStudentModal";
import StudentTable from "@/components/ClassManagement/StudentTable";
import { useDispatch, useSelector } from "react-redux";
import ImportFileModal from "@/components/ClassManagement/ImportFileModal";
import { deleteStudentFromClass, fetchAllFaculties, fetchAllMajors, fetchAllPrograms, fetchStudentDetail, fetchStudentList, processFilePartly, processStudentData } from "@/redux/thunk/dataThunk";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { clearStudentList, setPageDefault } from "@/redux/slice/dataSlice";
import ConfirmDialog from "@/components/ClassManagement/ConfirmDialog";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const InfoColumns = [
  { id: "identificationCode", label: "MSSV", align: "center" },
  { id: "email", label: "Email", align: "center" },
  { id: "programName", label: "Chương trình", align: "center" },
  { id: "facultyName", label: "Khoa", align: "center" },
  { id: "majorName", label: "Chuyên ngành", align: "center" },
  { id: "createdDate", label: "Ngày tạo", align: "center" },
  { id: "updatedDate", label: "Cập nhật", align: "center" },
];

const GradeColumns = [
  { id: "identificationCode", label: "MSSV", align: "center" },
  { id: "midtermGrade", label: "Giữa kỳ", align: "center" },
  { id: "finalGrade", label: "Cuối kỳ", align: "center" },
  { id: "projectGrade", label: "Đồ án", align: "center" },
  { id: "practiceGrade", label: "Thực hành", align: "center" },
  { id: "totalGrade", label: "Tổng kết", align: "center" },
  { id: "registrationType", label: "Loại ĐK", align: "center" },
  { id: "status", label: "Trạng thái", align: "center" },
  { id: "createdDate", label: "Ngày tạo", align: "center" },
  { id: "updatedDate", label: "Cập nhật", align: "center" },
];

const studentsAssignments = [
  { identificationCode: "ST001", A1: 0,   A2: 0,  A3: 3,  A4: 0,  A5: 6.5,studentId:1 },
  { identificationCode: "ST002", A1: 9,   A2: 6,  A3: 0,  A4: 0,  A5: 9,studentId:2 },
  { identificationCode: "ST003", A1: 8,   A2: 6,  A3: 0,  A4: 0,  A5: 0,studentId:3 },
  { identificationCode: "ST004", A1: 8,   A2: 0,  A3: 5,  A4: 7,  A5: 9,studentId:4 },
  { identificationCode: "ST005", A1: 8.5, A2: 0,  A3: 0,  A4: 0,  A5: 8,studentId:5 },
  { identificationCode: "ST006", A1: 6,   A2: 7,  A3: 0,  A4: 0,  A5: 0,studentId:6 },
  { identificationCode: "ST007", A1: 9,   A2: 10, A3: 6,  A4: 5,  A5: 8,studentId:7 },
  { identificationCode: "ST008", A1: 8.5, A2: 7,  A3: 6,  A4: 10, A5: 8,studentId:8 },
  { identificationCode: "ST009", A1: 9.5, A2: 0,  A3: 0,  A4: 0,  A5: 0,studentId:9 },
  { identificationCode: "ST010", A1: 8.5, A2: 0,  A3: 4,  A4: 8,  A5: 9.5,studentId:10 },
  { identificationCode: "ST011", A1: 7,   A2: 8,  A3: 3,  A4: 3,  A5: 0,studentId:11 },
  
];


const quizData = [
  {
    identificationCode: "ST001",
    TimeTaken: "4 mins 27 secs",
    Grade:7,
    Q1: 1,
    Q2 :0,
    Q3: 1,
    Q4: 1,
    Q5: 1,
    Q6 :0,
    Q7: 0,
    Q8: 1,
    Q9: 1,
    Q10: 1,
    studentId:1
  },
  {
    identificationCode: "ST002",
    TimeTaken: "34 mins 43 secs",
    Grade:5,
    Q1: 1,
    Q2 :0,
    Q3: 1,
    Q4: 1,
    Q5: 1,
    Q6 :0,
    Q7: 0,
    Q8: 0,
    Q9: 0,
    Q10: 1,
    studentId:2
  },
  {
    identificationCode: "ST003",
    TimeTaken: "34 mins 43 secs",
    Grade:10,
    Q1: 1,
    Q2 :1,
    Q3: 1,
    Q4: 1,
    Q5: 1,
    Q6 :1,
    Q7: 1,
    Q8: 1,
    Q9: 1,
    Q10: 1,
    studentId:3
  }
];

const Finalscores = [
  { identificationCode: "ST001", Final: 4,   Q1: 1.7, Q2: 2, Q3: 2.5, Q4: 10,studentId:1 },
  { identificationCode: "ST002", Final: 7.5, Q1: 5,   Q2: 1, Q3: 10,  Q4: 3,studentId:2 },
  { identificationCode: "ST003", Final: 8.5, Q1: 5.8, Q2: 2, Q3: 0,   Q4: 5,studentId:3 },
  { identificationCode: "ST004", Final: 9.8, Q1: 8.3, Q2: 7, Q3: 0,   Q4: 6,studentId:4 },
  { identificationCode: "ST005", Final: 5.8, Q1: 5,   Q2: 7, Q3: 3.8, Q4: 3,studentId:5 },
  { identificationCode: "ST006", Final: 0,   Q1: 0,   Q2: 0, Q3: 0,   Q4: 0,studentId:6 },
  { identificationCode: "ST007", Final: 5.8, Q1: 6.7, Q2: 7, Q3: 0,   Q4: 4,studentId:7 },
  { identificationCode: "ST008", Final: 6.3, Q1: 3.3, Q2: 6, Q3: 7.5, Q4: 9,studentId:8 },
  { identificationCode: "ST009", Final: 7,   Q1: 5,   Q2: 1, Q3: 0,   Q4: 5,studentId:9 }
];

const MidtermScores = [
  { identificationCode: "ST001", Final: 4,   Q1: 1.7, Q2: 2, Q3: 2.5, Q4: 10,studentId:1 },
  { identificationCode: "ST002", Final: 4.5, Q1: 5,   Q2: 1, Q3: 10,  Q4: 3,studentId:2 },
  { identificationCode: "ST003", Final: 3.5, Q1: 5.8, Q2: 2, Q3: 0,   Q4: 5,studentId:2 },
  { identificationCode: "ST004", Final: 5.8, Q1: 8.3, Q2: 7, Q3: 0,   Q4: 6,studentId:3 },
  { identificationCode: "ST005", Final: 4.8, Q1: 5,   Q2: 7, Q3: 3.8, Q4: 3,studentId:4 },
  { identificationCode: "ST006", Final: 0,   Q1: 0,   Q2: 0, Q3: 0,   Q4: 0,studentId:5 },
  { identificationCode: "ST007", Final: 4.8, Q1: 6.7, Q2: 7, Q3: 0,   Q4: 4,studentId:6 },
  { identificationCode: "ST008", Final: 6.3, Q1: 3.3, Q2: 6, Q3: 7.5, Q4: 9,studentId:7 },
  { identificationCode: "ST009", Final: 3,   Q1: 5,   Q2: 1, Q3: 0,   Q4: 5,   Q4: 6,studentId:8 }
];

const academicYear = ["2014-2018", "2015-2019", "2021-2025", "2022-2026"]
export default function StudentDetailView({ onBack }) {
  const [className, setClassName] = useState("21CLC05");
  const [subject, setSubject] = useState("Cơ sở dữ liệu");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Thêm sv
  const [openEditModal, setOpenEditModal] = useState(false); // Edit svs
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [importFile, setImportFile] = useState(false);
  const { accessToken } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { classId } = router.query;

  //Tạo header

  const mapKeyToLabel = (key) => {
    if (key === "identificationCode") return "MSSV";
    if (key === "Final") return "Điểm tổng";
    if (key === "TimeTaken") return "Thời gian thực hiện";
    if (key === "Grade") return "Điểm tổng";
    if (/^Q\d+$/.test(key)) return `Câu ${key.slice(1)} (điểm)`;
    if (/^A\d+$/.test(key)) return `Bài ${key.slice(1)} (điểm)`;
    return key; // fallback
  };

  const SetHeader = (filteredRows)=>{

    const rawKeys =  Object.keys(
    filteredRows.reduce((a, b) =>
      Object.keys(a).length > Object.keys(b).length ? a : b
    )
  ).filter(key => key !== "studentId");

    return rawKeys.map((key) => ({
          id: key,
          key:key,
          label: mapKeyToLabel(key),
          align:"center"
        }));
  }


  const ColStudentsAssignments = useMemo(() => {
      return SetHeader(studentsAssignments);
   }, [studentsAssignments]);

   const ColQuizData = useMemo(() => {
      return SetHeader(quizData);
   }, [quizData]);

   const ColFinalscores = useMemo(() => {
      return SetHeader(Finalscores);
   }, [Finalscores]);

   const ColMidtermScores = useMemo(() => {
      return SetHeader(MidtermScores);
   }, [MidtermScores]);

  
  //e Tạo header



  const userId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const { sub } = jwtDecode(accessToken);
      return sub;
    } catch {
      return null;
    }
  }, [accessToken]);
  const { loading, totalGrade, totalInformation, studentsInformation, studentsGrade, hasMore, page, amount, faculties, programs, majors, student } = useSelector(state => state.data);
  const [search, setSearch] = useState("");
  const [mssv, setMssv] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const handleTabChange = (e, newIdx) => {
    setTab(newIdx);
  }
  // trigger a fresh load with the current search term
  const handleSearch = () => {
    dispatch(clearStudentList());
    dispatch(fetchStudentList({
      classId,
      type: showSummary ? "summary" : "information",
      page: 1,
      amount,
      search
    }));
  };

  useEffect(() => {
    dispatch(fetchAllPrograms({ instructorId: userId }));
    dispatch(fetchAllFaculties({ instructorId: userId }));
    dispatch(fetchAllMajors({ instructorId: userId }));
  }, [userId]);


  const handleToggleSummary = () => {
    setShowSummary((prev) => !prev);
  };

  const handleEditClick = (student) => {
    console.log("studentId: ",student)
    setSelectedStudent(student);
    setOpenEditModal(true);
  };

  const handleUpdateStudent = async () => {

  }

  useEffect(() => {
    if (!selectedStudent) return;
    dispatch(fetchStudentDetail({ studentId: selectedStudent, classId: classId }));
  }, [selectedStudent]);

  const handleCloseEdit = () => {
    setOpenEditModal(false);
    setSelectedStudent(null);
  };

  const handleAddNewStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
    setIsAddModalOpen(false);
  };

  const handleDeleteRequest = (studentId, identificationCode) => {
    console.log("studentId: ",studentId)
    console.log("identificationCode: ",identificationCode)
    setSelectedStudent(studentId);
    setMssv(identificationCode);
    setConfirmOpen(true);
  };


  const handleDelete = async () => {
    if (!selectedStudent) return;
    try {
      const response = await dispatch(deleteStudentFromClass({ studentId: selectedStudent, classId: classId }));
      if (response.payload.success === true) {
        toast.success(`Xóa thành công sinh viên ${mssv} khỏi lớp`);
        dispatch(clearStudentList());
        await dispatch(fetchStudentList({ classId: classId, type: showSummary ? "summary" : "information", page: page + 1, amount, search }));
      } else {
        toast.error(`Xóa thất bại! Hãy thử lại sau`);
      }
    } catch {
      toast.error(`Xóa thất bại! Hãy thử lại sau`);
    } finally {
      setConfirmOpen(false);
      setSelectedStudent(null);
      setMssv(null);
    }
  }

  const importTypes = ["Thông tin sinh viên", "Tổng kết", "Quiz", "Bài tập", "Cuối kỳ"];
  const handleImport = async (type, file) => {
    let response;
    console.log(type);
    if (type === "Thông tin sinh viên") {
      response = await dispatch(processStudentData({ instructorId: userId, classId: classId, file }));
    } else if (type === "Tổng kết") {
      response = await dispatch(processFilePartly({ instructorId: userId, file, classId: classId, activityType: "final_note", replace: true }));
    } else if (type === "Quiz") {
      response = await dispatch(processFilePartly({ instructorId: userId, file, classId: classId, activityType: "quiz", replace: true }));
    } else if (type === "Bài tập") {
      response = await dispatch(processFilePartly({ instructorId: userId, file, classId: classId, activityType: "assignment", replace: true }));
    } else {
      response = await dispatch(processFilePartly({ instructorId: userId, file, classId: classId, activityType: "final_exam", replace: true }));
    }

    if (response.payload.success === true) {
      toast.success(`Tạo dữ liệu ${type.toLowerCase()} thành công`);
      dispatch(fetchStudentList({
        classId,
        type: showSummary ? "summary" : "information",
        page: 1,
        amount,
        search
      }));
    } else {
      toast.error("Tạo dữ liệu thất bại! Hãy thữ lại sau");
    }
    setImportFile(false);
  }

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchStudentList({ classId: classId, type: showSummary ? "summary" : "information", page: page + 1, amount, search }));
    }
  };

  useEffect(() => {
    if (!classId) return;
    dispatch(clearStudentList());
    dispatch(fetchStudentList({
      classId,
      type: showSummary ? "summary" : "information",
      page: 1,
      amount,
      search
    }));
  }, [classId, showSummary]);

  return (
    <Container maxWidth={false} disableGutters>
      <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
          <TextField
            placeholder="Tìm kiếm"
            variant="outlined"
            size="small"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            style={{ width: "70%", minWidth: 500 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              width: "100%",
              '& .MuiOutlinedInput-root': {
                paddingRight: 0,
              },
            }}
          />
          <ActionButton
            variant="contained"
            style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsAddModalOpen(true)}
            disabled={loading}
          >
            Thêm
          </ActionButton>

          {/* <ActionButton
            variant={showSummary ? "outlined" : "contained"}
            color="primary"
            startIcon={<Info />}
            onClick={handleToggleSummary}
            disabled={loading}
            sx={{
              ...(showSummary && {
                bgcolor: "white",
                color: "#1976D2",
                borderColor: "#1976D2",
                "&:hover": {
                  bgcolor: "#e3f2fd",
                },
              }),
            }}
          >
            {showSummary ? "Tổng quan" : "Chi tiết"}
          </ActionButton> */}


          <ActionButton
            style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
            variant="contained"
            color="primary"
            onClick={() => setImportFile(true)}
            startIcon={<FileDownload />}
            disabled={loading}
          >
            Tải file
          </ActionButton>
        </div>
      </Header>

      <Box sx={{ p: 2 }}>
        <span style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "20px", fontWeight: "700" }}
        >
          Số lượng sinh viên: {showSummary ? totalGrade : totalInformation} &nbsp;&nbsp;&nbsp;
        </span>
      </Box>

      <Tabs
                value={tab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                sx={{ marginTop: 2 }}
              >
                <Tab label="Thông tin" onClick={()=>setShowSummary(false)}/>
                <Tab label="Tổng kết"   onClick={()=>setShowSummary(true)}/>
                <Tab label="Assigment"/>
                <Tab label="Quiz"/>
                <Tab label="Giữa kỳ"/>
                <Tab label="Cuối kỳ"/>
              </Tabs>


      <div style={{ position: "relative", marginTop: 16 }}>
        {tab === 0  &&(
          <Box position="relative">  
          <StudentTable
            filteredRows={studentsInformation}
            columns={InfoColumns}
            handleDelete={handleDeleteRequest}
            handleEdit={handleEditClick}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
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
              bgcolor="rgba(255,255,255,0.6)"
              zIndex={10}
            >
              <CircularProgress size="50px" />
            </Box>
          )}
        </Box>
        )
        }

        {tab === 1  &&(
          <Box position="relative">  
          <StudentTable
            filteredRows={studentsGrade}
            columns={GradeColumns}
            handleDelete={handleDeleteRequest}
            handleEdit={handleEditClick}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
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
              bgcolor="rgba(255,255,255,0.6)"
              zIndex={10}
            >
              <CircularProgress size="50px" />
            </Box>
          )}
        </Box>
        )
        }

        {tab === 2  &&(
          <Box position="relative">  
          <StudentTable
            filteredRows={studentsAssignments}
            columns={ColStudentsAssignments}
            handleDelete={handleDeleteRequest}
            handleEdit={handleEditClick}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
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
              bgcolor="rgba(255,255,255,0.6)"
              zIndex={10}
            >
              <CircularProgress size="50px" />
            </Box>
          )}
        </Box>
        )
        }

        {tab === 3  &&(
          <Box position="relative">  
          <StudentTable
            filteredRows={quizData}
            columns={ColQuizData}
            handleDelete={handleDeleteRequest}
            handleEdit={handleEditClick}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
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
              bgcolor="rgba(255,255,255,0.6)"
              zIndex={10}
            >
              <CircularProgress size="50px" />
            </Box>
          )}
        </Box>
        )
        }


        {tab === 4  &&(
          <Box position="relative">  
          <StudentTable
            filteredRows={MidtermScores}
            columns={ColMidtermScores}
            handleDelete={handleDeleteRequest}
            handleEdit={handleEditClick}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
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
              bgcolor="rgba(255,255,255,0.6)"
              zIndex={10}
            >
              <CircularProgress size="50px" />
            </Box>
          )}
        </Box>
        )
        }

        {tab === 5  &&(
          <Box position="relative">  
          <StudentTable
            filteredRows={Finalscores}
            columns={ColFinalscores}
            handleDelete={handleDeleteRequest}
            handleEdit={handleEditClick}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
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
              bgcolor="rgba(255,255,255,0.6)"
              zIndex={10}
            >
              <CircularProgress size="50px" />
            </Box>
          )}
        </Box>
        )
        }


        
      </div>
      {importFile &&
        <ImportFileModal
          open={importFile}
          setOpen={setImportFile}
          types={importTypes}
          sampleLinks={[
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1749965680/Student_tjkjgw.xlsx",
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1749965679/Final_Note_odmgzd.xlsx",
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1749965679/Quiz_g3u1uf.xlsx",
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1749965679/Assignment_lcnuje.xlsx",
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1749965679/Assignment_lcnuje.xlsx",
          ]}
          onImport={handleImport}
        />}
      <AddStudentModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        className={className}
        subject={subject}
        onAddStudent={handleAddNewStudent}
        mode="add"
      />
      {student && <EditStudentModal
        open={openEditModal}
        onClose={handleCloseEdit}
        onSubmit={handleUpdateStudent} // nhận payload đã lọc
        title="Sửa Sinh Viên"
        basicFields={[
          { key: 'identificationCode', label: 'MSSV', type: 'text' },
          { key: 'fullName', label: 'Họ và tên', type: 'text' },
          { key: 'email', label: 'Email', type: 'text' },
          { key: 'programId', label: 'Chương trình', type: 'select', options: programs?.map(p => ({ value: p.programId, label: p.programName })) },
          { key: 'facultyId', label: 'Khoa', type: 'select', options: faculties?.map(f => ({ value: f.facultyId, label: f.facultyName })) },
          { key: 'majorId', label: 'Chuyên ngành', type: 'select', options: majors?.map(m => ({ value: m.majorId, label: m.majorName })) },
        ]}
        gradeFields={[
          { key: 'midtermGrade', label: 'Giữa kỳ' },
          { key: 'finalGrade', label: 'Cuối kỳ' },
          { key: 'projectGrade', label: 'Đồ án' },
          { key: 'practiceGrade', label: 'Thực hành' },
          { key: 'assignmentQuizGrade', label: 'Quiz/Assignment' },
          
          { key: 'totalGrade', label: 'Tổng kết' },
        ]}
        assignmentFields ={ColStudentsAssignments.filter(item=> item.label !="MSSV")}
        QuizFields = {ColQuizData.filter(item=> item.label !="MSSV")}
        MidTermFields = {ColFinalscores.filter(item=> item.label !="MSSV")}
        FinalFields = {ColMidtermScores.filter(item=> item.label !="MSSV")}


        entityData={student}
      />}
      <ConfirmDialog
        open={confirmOpen}
        title={`Xác nhận xóa sinh viên`}
        content={`Bạn có chắc chắn muốn xóa sinh viên với mã số ${mssv} này ra khỏi lớp không?`}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </Container>
  );
}