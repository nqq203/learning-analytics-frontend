import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Container,
  Grid,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  Settings,
  Edit,
  Delete,
  ArrowBack,
  Add,
  FileDownload,
  Info,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import EditStudentModal from "@/components/StudentManagement/EditStudentModal";
import AddStudentModal from "@/components/StudentManagement/AddStudentModal";

// sample data
const studentData = [
  {
    id: "21127001",
    name: "Nguyễn Văn A",
    class: "21CLC05",
    subject: "Cơ sở dữ liệu",
    term: "21",
    midterm: 7,
    final: 8,
    project: 9,
    practice: 7,
    total: 8,
    grade: "Khá",
  },
  {
    id: "21127002",
    name: "Nguyễn Văn B",
    class: "21CLC05",
    subject: "Cơ sở dữ liệu",
    term: "21",
    midterm: 6,
    final: 7,
    project: 8,
    practice: 6,
    total: 7,
    grade: "Trung bình",
  },
  {
    id: "21127003",
    name: "Nguyễn Văn C",
    class: "21CLC05",
    subject: "Cơ sở dữ liệu",
    term: "21",
    midterm: 6,
    final: 7,
    project: 8,
    practice: 6,
    total: 7,
    grade: "Trung bình",
  },
  {
    id: "21127004",
    name: "Nguyễn Văn D",
    class: "21CLC05",
    subject: "Cơ sở dữ liệu",
    term: "21",
    midterm: 6,
    final: 7,
    project: 8,
    practice: 6,
    total: 7,
    grade: "Trung bình",
  },
  {
    id: "21127005",
    name: "Nguyễn Văn E",
    class: "21CLC05",
    subject: "Cơ sở dữ liệu",
    term: "21",
    midterm: 6,
    final: 7,
    project: 8,
    practice: 6,
    total: 7,
    grade: "Trung bình",
  },
  {
    id: "21127006",
    name: "Nguyễn Văn F",
    class: "21CLC05",
    subject: "Cơ sở dữ liệu",
    term: "21",
    midterm: 6,
    final: 7,
    project: 8,
    practice: 6,
    total: 7,
    grade: "Trung bình",
  },
  {
    id: "21127007",
    name: "Nguyễn Văn G",
    class: "21CLC05",
    subject: "Cơ sở dữ liệu",
    term: "21",
    midterm: 6,
    final: 7,
    project: 8,
    practice: 6,
    total: 7,
    grade: "Trung bình",
  },
  {
    id: "21127008",
    name: "Nguyễn Văn H",
    class: "21CLC05",
    subject: "Cơ sở dữ liệu",
    term: "21",
    midterm: 6,
    final: 7,
    project: 8,
    practice: 6,
    total: 7,
    grade: "Trung bình",
  },
];

export default function StudentDetailView({ onBack }) {
  const [students, setStudents] = useState(studentData);
  const studentCount = students.length;
  const averageScore =
    students.length === 0
      ? 0
      : (
          students.reduce((sum, s) => sum + s.total, 0) / students.length
        ).toFixed(2);
  const [className, setClassName] = useState("21CLC05");
  const [subject, setSubject] = useState("Cơ sở dữ liệu");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Thêm sv
  const [openEditModal, setOpenEditModal] = useState(false); // Edit svs
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

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
    setStudents((prev) =>
      prev.map((stu) => (stu.id === updatedStudent.id ? updatedStudent : stu))
    );
    setOpenEditModal(false);
    setSelectedStudent(null);
    console.log("Student saved:", updatedStudent);
  };

  const handleDeleteStudent = (studentId) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          borderLeft: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex" }}>
                <TextField
                  placeholder="Tìm kiếm"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mr: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ marginRight: 0, paddingRight: 0 }}
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
                    sx: { paddingRight: 0 },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Thêm
                </Button>

                <Button
                  variant={showSummary ? "outlined" : "contained"}
                  color="primary"
                  startIcon={<Info />}
                  onClick={handleToggleSummary}
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
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FileDownload />}
                >
                  Tải file
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Typography
            variant="body1"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            Số lượng sinh viên: {studentCount} &nbsp;&nbsp;&nbsp; Điểm trung
            bình: {averageScore}
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ flex: 1, boxShadow: "none" }}>
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {showSummary ? (
                  <>
                    <TableCell sx={{ fontWeight: "bold" }}>STT</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>MSSV</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Họ và tên</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Giữa kỳ</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Cuối kỳ</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Đồ án</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Thực hành</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Tổng kết</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Xếp loại</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell sx={{ fontWeight: "bold" }}>MSSV</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Họ và tên</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Lớp</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Môn</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Khoá</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Sửa
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Xóa
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) =>
                showSummary ? (
                  <TableRow
                    key={student.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.midterm}</TableCell>
                    <TableCell>{student.final}</TableCell>
                    <TableCell>{student.project}</TableCell>
                    <TableCell>{student.practice}</TableCell>
                    <TableCell>{student.total}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                  </TableRow>
                ) : (
                  <TableRow
                    key={student.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.subject}</TableCell>
                    <TableCell>{student.term}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="warning"
                        onClick={() => handleEditClick(student)}
                      >
                        <Edit sx={{ color: "orange" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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
