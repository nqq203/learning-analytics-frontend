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
import { fetchStudentList, processFilePartly, processStudentData } from "@/redux/thunk/dataThunk";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { clearStudentList, setPageDefault } from "@/redux/slice/dataSlice";

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
  const userId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const { sub } = jwtDecode(accessToken);
      return sub;
    } catch {
      return null;
    }
  }, [accessToken]);
  const { loading, totalGrade, totalInformation, studentsInformation, studentsGrade, hasMore, page, amount } = useSelector(state => state.data);

  const handleChangeAcedemicYear = (value) => {
    setChosenAcademicYear(value)
  }

  const handleToggleSummary = () => {
    setShowSummary((prev) => !prev);
  };
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setOpenEditModal(true);
  };

  const handleCloseEdit = () => {
    setOpenEditModal(false);
    setSelectedStudent(null);
  };

  const handleAddNewStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (updatedStudent) => {

    setOpenEditModal(false);
    setSelectedStudent(null);
  };

  const handleDeleteStudent = (studentId) => {
  };

  const importTypes = ["Thông tin sinh viên", "Tổng kết", "Quiz", "Bài tập", "Cuối kỳ"];
  const handleImport = async (type, file) => {
    let response;
    console.log(type);
    if (type === "Thông tin sinh viên") {
      response = await dispatch(processStudentData({ instructorId: userId, classId: classId, file }));
    } else if (type === "Tổng kết") {
      response = await dispatch(processFilePartly({ instructorId: userId, file, classId: classId, activityType: "final_note", replace: false }));
    } else if (type === "Quiz") {
      response = await dispatch(processFilePartly({ instructorId: userId, file, classId: classId, activityType: "quiz", replace: false }));
    } else if (type === "Bài tập") {
      response = await dispatch(processFilePartly({ instructorId: userId, file, classId: classId, activityType: "assignment", replace: false }));
    } else {
      response = await dispatch(processFilePartly({ instructorId: userId, file, classId: classId, activityType: "final_exam", replace: false }));
    }

    if (response.payload.success === true) {
      toast.success(`Tạo dữ liệu ${type.toLowerCase()} thành công`);
    } else {
      toast.error("Tạo dữ liệu thất bại! Hãy thữ lại sau");
    }
    setImportFile(false);
  }

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchStudentList({ classId: classId, type: showSummary ? "summary" : "information", page: page + 1, amount }));
    }
  };

  useEffect(() => {
    if (!classId) return;
    dispatch(clearStudentList());
    dispatch(fetchStudentList({
      classId,
      type: showSummary ? "summary" : "information",
      page: 1,
      amount
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
            style={{ width: "70%", minWidth: 500 }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                >
                  <IconButton
                    // onClick={handleSearch}
                    sx={{
                      backgroundColor: "#1976D2",
                      borderRadius: "0 4px 4px 0",
                      padding: "10px",
                      height: "100%",
                      "&:hover": {
                        backgroundColor: "#1976D2",
                        marginRight: 0,
                      },
                    }}
                  >
                    <SearchIcon
                      sx={{ color: "white", fontSize: "20px" }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
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
          <ActionButton
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
          </ActionButton>
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
      <div style={{ position: "relative", marginTop: 16 }}>
        <Box position="relative">
          <StudentTable
            filteredRows={showSummary ? studentsGrade : studentsInformation}
            columns={showSummary ? GradeColumns : InfoColumns}
            handleDelete={handleDeleteStudent}
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
      <EditStudentModal
        open={openEditModal}
        onClose={handleCloseEdit}
        student={selectedStudent}
        onSave={handleSaveEdit}
      />
    </Container>
  );
}