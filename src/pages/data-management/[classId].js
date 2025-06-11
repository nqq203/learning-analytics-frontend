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
 
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from "@mui/material";

import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";


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
import StudentTable from "@/components/ClassManagement/StudentTable";

const InfoColumns = [
    { id: "id", label: "MSSV", align: "center" },
    { id: "name", label: "Họ và Tên", align: "center" },
    { id: "class", label: "Lớp", align: "center" },
    { id: "subject", label: "Môn", align: "center" },
    { id: "term", label: "Khóa", align: "center" }
  ];

const GradeColumns = [
    { id: "id", label: "MSSV", align: "center" },
    { id: "name", label: "Họ và Tên", align: "center" },
    { id: "midterm", label: "Giữa kỳ", align: "center" },
    { id: "final", label: "Cuối kỳ", align: "center" },
    { id: "project", label: "Đồ án", align: "center" },
    { id: "practice", label: "Thực hành", align: "center" },
    { id: "total", label: "Tổng kết", align: "center" },
    { id: "grade", label: "Xếp loại", align: "center" }
]
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
const academicYear = ["2014-2018","2015-2019","2021-2025","2022-2026"]
export default function StudentDetailView({ onBack }) {
  const [students, setStudents] = useState(studentData);
  const [chosenAcademicYear,setChosenAcademicYear] = useState("");
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
  

    const handleChangeAcedemicYear = (value)=>{
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
      
        <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
              
                <TextField
                  placeholder="Tìm kiếm"
                  variant="outlined"
                  size="small"
                  style={{ width: "55%", minWidth: 500 }}
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

                <FormControl style={{ width: "20%", minWidth: 250 }} size="small">
                <InputLabel>Khóa</InputLabel>
                    <Select label="Chọn khóa" onChange={(e)=>handleChangeAcedemicYear(e.target.value)}>
                        <MenuItem value="">Tất cả</MenuItem>
                        {
                          academicYear.map((item,index)=>{
                            return (<MenuItem value={item} key={index}>{item}</MenuItem>)
                          })
                        }
                        
                    </Select>
            </FormControl>
              
            
            
              
                <ActionButton
                  variant="contained"
                   style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
                  color="primary"
                  startIcon={<Add />}
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Thêm
                </ActionButton>

                <ActionButton
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
                </ActionButton>

                <ActionButton
                style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
                  variant="contained"
                  color="primary"
                  startIcon={<FileDownload />}
                >
                  Tải file
                </ActionButton>
              </div>
        </Header>



       
        <Box sx={{ p: 2 }}>
          <span style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "20px", fontWeight: "700" }}
          >
            Số lượng sinh viên: {studentCount} &nbsp;&nbsp;&nbsp; Điểm trung
            bình: {averageScore}
          </span>
        </Box>
                  
        { showSummary?
        
          <StudentTable
            filteredRows={students}
            columns={GradeColumns}
            
            handleDelete={handleDeleteStudent}
            handleEdit={handleEditClick}
            
          />
          :
          <StudentTable
            filteredRows={students}
            columns={InfoColumns}
            handleDelete={handleDeleteStudent}
            handleEdit={handleEditClick}
            ></StudentTable>
            
          

        }

        
      



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
