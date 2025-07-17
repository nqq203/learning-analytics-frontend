import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
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
import Menu from '@mui/material/Menu';
import AddQuizModal from "@/components/StudentManagement/AddQuizModal";


import EditExamModal from "@/components/StudentManagement/Update/EditExamModal";

import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useMemo, useState, useRef } from "react";
import EditStudentModal from "@/components/StudentManagement/EditStudentModal";
import AddStudentModal from "@/components/StudentManagement/AddStudentModal";
import StudentTable from "@/components/ClassManagement/StudentTable";
import { useDispatch, useSelector } from "react-redux";
import ImportFileModal from "@/components/ClassManagement/ImportFileModal";
import { deleteStudentFromClass, fetchAllFaculties, fetchAllMajors, fetchAllPrograms, fetchStudentDetail, fetchStudentList, processFilePartly, processStudentData, fetchAllExam, fetchExamDetail, createExam, deleteExam, updateExam, fetchAllStudent, createStudent, processLearningOutcome, updateStudent } from "@/redux/thunk/dataThunk";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { clearStudentList, setPageDefault } from "@/redux/slice/dataSlice";
import ConfirmDialog from "@/components/ClassManagement/ConfirmDialog";
import ExamQuizTable from "@/components/StudentManagement/ExamQuizTable";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DetailExamModal from "@/components/StudentManagement/DetailExam/DetailExamModal";



const LearningOutComeItemsContainer = styled.div`
  display:flex;
  flex-direction:row;
  gap:20px;
`

const LearningOutComeTabButtons = styled.div`
  display:flex;
  flex-direction:row;
  padding:1rem;
  font-weight:bold;

  // color:gray;
  // border: ${({ active }) => (active ? "1px solid gray" : "transparent")};
  

  color: ${({ active }) => (active ? "var(--blue-800)" : "gray")};
  border: 2px solid ${({ active }) => (active ? "var(--blue-800)" : "transparent")};


  border-left:none;
  border-right:none;
  border-top:none;
  cursor:pointer;

  // &:hover{
  //   color: var(--blue-300);
  // }

  
`


const InfoColumns = [
  { id: "identificationCode", label: "MSSV", align: "center" },
  { id: "fullName", label: "Họ và tên", align: "center"},
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
  { identificationCode: "ST001", A1: 0, A2: 0, A3: 3, A4: 0, A5: 6.5, studentId: 1 },
  { identificationCode: "ST002", A1: 9, A2: 6, A3: 0, A4: 0, A5: 9, studentId: 2 },
  { identificationCode: "ST003", A1: 8, A2: 6, A3: 0, A4: 0, A5: 0, studentId: 3 },
  { identificationCode: "ST004", A1: 8, A2: 0, A3: 5, A4: 7, A5: 9, studentId: 4 },
  { identificationCode: "ST005", A1: 8.5, A2: 0, A3: 0, A4: 0, A5: 8, studentId: 5 },
  { identificationCode: "ST006", A1: 6, A2: 7, A3: 0, A4: 0, A5: 0, studentId: 6 },
  { identificationCode: "ST007", A1: 9, A2: 10, A3: 6, A4: 5, A5: 8, studentId: 7 },
  { identificationCode: "ST008", A1: 8.5, A2: 7, A3: 6, A4: 10, A5: 8, studentId: 8 },
  { identificationCode: "ST009", A1: 9.5, A2: 0, A3: 0, A4: 0, A5: 0, studentId: 9 },
  { identificationCode: "ST010", A1: 8.5, A2: 0, A3: 4, A4: 8, A5: 9.5, studentId: 10 },
  { identificationCode: "ST011", A1: 7, A2: 8, A3: 3, A4: 3, A5: 0, studentId: 11 },

];


const quizData = [
  {
    identificationCode: "ST001",
    TimeTaken: "4 mins 27 secs",
    Grade: 7,
    Q1: 1,
    Q2: 0,
    Q3: 1,
    Q4: 1,
    Q5: 1,
    Q6: 0,
    Q7: 0,
    Q8: 1,
    Q9: 1,
    Q10: 1,
    studentId: 1
  },
  {
    identificationCode: "ST002",
    TimeTaken: "34 mins 43 secs",
    Grade: 5,
    Q1: 1,
    Q2: 0,
    Q3: 1,
    Q4: 1,
    Q5: 1,
    Q6: 0,
    Q7: 0,
    Q8: 0,
    Q9: 0,
    Q10: 1,
    studentId: 2
  },
  {
    identificationCode: "ST003",
    TimeTaken: "34 mins 43 secs",
    Grade: 10,
    Q1: 1,
    Q2: 1,
    Q3: 1,
    Q4: 1,
    Q5: 1,
    Q6: 1,
    Q7: 1,
    Q8: 1,
    Q9: 1,
    Q10: 1,
    studentId: 3
  }
];

const Finalscores = [
  { identificationCode: "ST001", Final: 4, Q1: 1.7, Q2: 2, Q3: 2.5, Q4: 10, studentId: 1 },
  { identificationCode: "ST002", Final: 7.5, Q1: 5, Q2: 1, Q3: 10, Q4: 3, studentId: 2 },
  { identificationCode: "ST003", Final: 8.5, Q1: 5.8, Q2: 2, Q3: 0, Q4: 5, studentId: 3 },
  { identificationCode: "ST004", Final: 9.8, Q1: 8.3, Q2: 7, Q3: 0, Q4: 6, studentId: 4 },
  { identificationCode: "ST005", Final: 5.8, Q1: 5, Q2: 7, Q3: 3.8, Q4: 3, studentId: 5 },
  { identificationCode: "ST006", Final: 0, Q1: 0, Q2: 0, Q3: 0, Q4: 0, studentId: 6 },
  { identificationCode: "ST007", Final: 5.8, Q1: 6.7, Q2: 7, Q3: 0, Q4: 4, studentId: 7 },
  { identificationCode: "ST008", Final: 6.3, Q1: 3.3, Q2: 6, Q3: 7.5, Q4: 9, studentId: 8 },
  { identificationCode: "ST009", Final: 7, Q1: 5, Q2: 1, Q3: 0, Q4: 5, studentId: 9 }
];

const MidtermScores = [
  { identificationCode: "ST001", Final: 4, Q1: 1.7, Q2: 2, Q3: 2.5, Q4: 10, studentId: 1 },
  { identificationCode: "ST002", Final: 4.5, Q1: 5, Q2: 1, Q3: 10, Q4: 3, studentId: 2 },
  { identificationCode: "ST003", Final: 3.5, Q1: 5.8, Q2: 2, Q3: 0, Q4: 5, studentId: 2 },
  { identificationCode: "ST004", Final: 5.8, Q1: 8.3, Q2: 7, Q3: 0, Q4: 6, studentId: 3 },
  { identificationCode: "ST005", Final: 4.8, Q1: 5, Q2: 7, Q3: 3.8, Q4: 3, studentId: 4 },
  { identificationCode: "ST006", Final: 0, Q1: 0, Q2: 0, Q3: 0, Q4: 0, studentId: 5 },
  { identificationCode: "ST007", Final: 4.8, Q1: 6.7, Q2: 7, Q3: 0, Q4: 4, studentId: 6 },
  { identificationCode: "ST008", Final: 6.3, Q1: 3.3, Q2: 6, Q3: 7.5, Q4: 9, studentId: 7 },
  { identificationCode: "ST009", Final: 3, Q1: 5, Q2: 1, Q3: 0, Q4: 5, Q4: 6, studentId: 8 }
];


const ExamUpdateData =
{
  name: "Quiz1",
  info: [
    {
      MSSV: "ST001",
      name: "Nguyễn Văn A",
      time: "20 phút",
      scores: {
        "Câu 1": 8,
        "Câu 2": 9,
      },
    },
    {
      MSSV: "ST002",
      name: "Trần Thị B",
      time: "22 phút",
      scores: {
        "Câu 1": 7,
        "Câu 2": 8,
      },
    },
  ]
}
  ;



export default function StudentDetailView({ onBack }) {
  const [MiniTab, setMiniTab] = useState(1);
  const [className, setClassName] = useState("21CLC05");
  const [subject, setSubject] = useState("Cơ sở dữ liệu");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Thêm sv

  const [isAddModalQuizOpen, setIsAddModalQuizOpen] = useState(false) //Thêm Quiz
  const [isAddModalAssignmentOpen, setIsAddModalAssignmentOpen] = useState(false) //Thêm Assignment
  const [isAddModalMidtermOpen, setIsAddModalMidtermOpen] = useState(false) //Thêm Midterm
  const [isAddModalFinalOpen, setIsAddModalFinalOpen] = useState(false) //Thêm Final


  const [selectedExam, setSelectedExam] = useState();
  const [ModeExam, setModeExam] = useState();

  const [isEditExamModal, setIsExamModal] = useState(false);
  const [EditExamType, setEditExamType] = useState("");

  const [isViewDetailExamModal, setIsViewDetailExamModal] = useState(false);
  const [ViewDetailExamType, setViewDetailExamType] = useState("");

  //EDIT EXAM OPTION

  const [openEditModal, setOpenEditModal] = useState(false); // Edit svs
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [importFile, setImportFile] = useState(false);
  const { accessToken } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { classId } = router.query;

  //Dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const buttonRef = useRef(null);

  const handleClickAddQuiz = (event) => {

    dispatch(fetchAllStudent({
      classId,
      type: "information",
      page: 1,
      amount: totalInformation,
      search: ""
    }
    ))
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectQuizType = (type) => {

    dispatch(fetchAllStudent({
      classId,
      type: "information",
      page: 1,
      amount: totalInformation,
      search: ""
    }
    ))

    if (type == "Quiz") {
      setIsAddModalQuizOpen(true);
    }
    else if (type == "Assignment") {
      setIsAddModalAssignmentOpen(true);
    }
    else if (type == "Midterm") {
      setIsAddModalMidtermOpen(true);
    }
    else if (type == "Final") {
      setIsAddModalFinalOpen(true);
    }

    handleCloseMenu();
  };
  //e Dropdown

  const userId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const { sub } = jwtDecode(accessToken);
      return sub;
    } catch {
      return null;
    }
  }, [accessToken]);
  const { loading, totalGrade, totalInformation, studentsInformation, studentsGrade, hasMore, page, amount, faculties, programs, majors, student, assignments, finalExams, quizzes, activities, examInfo, allStudents, midtermExams } = useSelector(state => state.data);
  const [search, setSearch] = useState("");
  const [mssv, setMssv] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmExamOpen, setConfirmExamOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [secondTab, setSecondTab] = useState(0);

  const StudentScoreExam = useMemo(() => {
    return activities
  }, [activities])

  const ExamDetailInfo = useMemo(() => {
    return examInfo
  }, [examInfo])



  const handleTabChange = (e, newIdx) => {
    setTab(newIdx);
  }

  const handleSecondTabChange = (e, newIdx) => {
    setSecondTab(newIdx);
  }


  //Tạo header

  const mapKeyToLabel = (key) => {
    if (key === "assignmentName" || key === "quizName" || key === "finalExamName") return "Tên bài";
    if (key === "createdDate") return "Ngày tạo";
    if (key === "updatedDate") return "Ngày cập nhập";
    if (key === "identificationCode") return "MSSV";
    if (key === "Final") return "Điểm tổng";
    if (key === "TimeTaken") return "Thời gian thực hiện";
    if (key === "Grade") return "Điểm tổng";
    if (key === "name") return "Tên nội dung";
    if (key === "NumOfQuestion") return "Số câu hỏi";
    if (key === "Time") return "Thời gian";
    if (/^Q\d+$/.test(key)) return `Câu ${key.slice(1)} (điểm)`;
    if (/^A\d+$/.test(key)) return `Bài ${key.slice(1)} (điểm)`;
    return key; // fallback
  };

  const SetHeader = (filteredRows) => {

    const rawKeys = Object.keys(
      filteredRows.reduce((a, b) =>
        Object.keys(a).length > Object.keys(b).length ? a : b
      )
    ).filter(key => key !== "studentId" && key !== "quizId" && key !== "assignmentId" && key !== "finalExamId");

    return rawKeys.map((key) => ({
      id: key,
      key: key,
      label: mapKeyToLabel(key),
      align: "center"
    }));
  }


  const ColExamMidtermData = useMemo(() => {
    if (midtermExams.length > 0) return SetHeader(midtermExams);

    return [];
  }, [midtermExams])

  const ColExamFinalData = useMemo(() => {
    if (finalExams.length > 0) return SetHeader(finalExams);

    return [];
  }, [finalExams])


  const ColExamAssignmentData = useMemo(() => {
    if (assignments.length > 0) return SetHeader(assignments);

    return [];
  }, [assignments])


  const ColExamQuizData = useMemo(() => {
    if (quizzes.length > 0) return SetHeader(quizzes);

    return [];
  }, [quizzes])

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
    console.log("studentId: ", student)
    setSelectedStudent(student);
    setOpenEditModal(true);
  };


  //OPTION EXAM TABLE HERE

  const handleEditExamClick = (examId, type) => {
    
    setIsExamModal(true);
    setEditExamType(type);



    dispatch(fetchExamDetail({
      quiz_id: examId,
      type: type
    }))


  }

  const handleDeleteExam = async (examId, mode) => {
    setSelectedExam(examId);
    setModeExam(mode);
    setConfirmExamOpen(true);
  }

  const handleDeleteRequestExam = async () => {
    try {
      const response = await dispatch(deleteExam({ examId: selectedExam, type: ModeExam }));


      if (response?.type?.includes("fulfilled") && response.payload?.success) {
        toast.success(`Xóa thành công bài kiểm tra khỏi lớp`);
        setConfirmExamOpen(false);
        await dispatch(fetchAllExam({ instructor_id: userId, class_id: classId }));
      } else {
        console.warn("Response bị rejected hoặc không success:", response);
        toast.error(`Xóa thất bại! Hãy thử lại sau`);
      }
    } catch (err) {
      console.error("Lỗi trong handleDeleteRequestExam:", err);
      toast.error(`Xóa thất bại! Hãy thử lại sau`);
    }
  };

  const handleEditExam = async (examId, type, payload) => {


    try {
      const response = await dispatch(updateExam({ examId: examId, type: type, payload: payload }));

      if (response?.type?.includes("fulfilled") && response.payload?.success) {
        toast.success(`Sửa thành công bài kiểm tra`);

        await dispatch(fetchAllExam({ instructor_id: userId, class_id: classId }));

        setIsExamModal(false);
      } else {
        console.warn("Response bị rejected hoặc không success:", response);
        toast.error(`Sửa thất bại! Hãy thử lại sau`);
      }
    } catch (err) {
      console.error("Lỗi trong handleDeleteRequestExam:", err);
      toast.error(`Sửa thất bại! Hãy thử lại sau`);
    }
  }

  const handleViewInformationExam = (examId, type) => {
    
    console.log(examId);
    console.log(type);
    setIsViewDetailExamModal(true);
    setViewDetailExamType(type);

    dispatch(fetchExamDetail({
      quiz_id: examId,
      type: type
    }))



  }

  const handleCreateExam = async (mode, examInfo) => {
    try {
      const response = await dispatch(createExam({ instructor_id: userId, class_id: classId, type: mode, payload: examInfo }));

      if (response.payload.success === true) {
        toast.success(`Thêm thành công bài kiểm tra vào lớp`);
        dispatch(clearStudentList());
        await dispatch(fetchStudentList({ classId: classId, type: showSummary ? "summary" : "information", page: page + 1, amount, search }));
      } else {
        toast.error(`Thêm thất bại! Hãy thử lại sau`);
      }
    } catch {
      toast.error(`Thêm thất bại! Hãy thử lại sau`);
    } finally {
      dispatch(fetchAllExam({
        instructor_id: userId,
        class_id: classId
      }))
    }
  }
  //OPTION EXAM TABLE HERE

  const handleUpdateStudent = async (studentId,payload) => {
    
    try {


      const response = await dispatch(updateStudent({ studentId: studentId, classId: classId, payload }));
     

      if (response?.type?.includes("fulfilled") && response.payload?.success) {
        toast.success(`Sửa sinh viên thành công`);
        
        
        handleCloseEdit();
        dispatch(clearStudentList());
        await dispatch(fetchStudentList({ classId: classId, type: showSummary ? "summary" : "information", page:1, amount, search }));

      } else {
        console.warn("Response bị rejected hoặc không success:", response);
        toast.error(`Sửa thất bại! Hãy thử lại sau`);
      }
    } catch (err) {
      console.error("Lỗi trong handleDeleteRequestExam:", err);
      toast.error(`Sửa thất bại! Hãy thử lại sau`);
    }


  }

  useEffect(() => {
    if (!selectedStudent) return;
    dispatch(fetchStudentDetail({ studentId: selectedStudent, classId: classId }));
  }, [selectedStudent]);

  const handleCloseEdit = () => {
    setOpenEditModal(false);
    setSelectedStudent(null);
  };

  const handleAddNewStudent = async (newStudent, GradeStudent) => {
    try {
      const response = await dispatch(
        createStudent({
          classId: classId, payload: {
            studentInformation: newStudent,
            studentGrades: GradeStudent
          }
        })
      )

      if (response.payload.success === true) {
        toast.success(`Thêm thành công sinh viên ${newStudent.identificationCode} vào lớp`);
        dispatch(clearStudentList());
        await dispatch(fetchStudentList({ classId: classId, type: showSummary ? "summary" : "information", page:1, amount, search }));
        setIsAddModalOpen(false);
      } else {
        toast.error(`Mã sinh viên này đã tồn tại hoặc thêm thất bại!. Hãy thử lại sau`);
      }

    } catch {
      toast.error(`Mã sinh viên này đã tồn tại hoặc thêm thất bại! Hãy thử lại sau`);
    }
    // setStudents((prev) => [...prev, newStudent]);
    // setIsAddModalOpen(false);
  };

  const handleDeleteRequest = (studentId, identificationCode) => {
    console.log("studentId: ", studentId)
    console.log("identificationCode: ", identificationCode)
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

  const importTypes = ["Thông tin sinh viên", "Tổng kết", "Quiz", "Bài tập", "Cuối kỳ", "Giữa kỳ", "Mục tiêu học tập"];
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
    } else if (type == "Cuối kỳ") {
      response = await dispatch(processFilePartly({ instructorId: userId, file, classId: classId, activityType: "final_exam", replace: true }));
    } else if (type === "Giữa kỳ") {
      response = await dispatch(processFilePartly({ instructorId: userId, file, classId: classId, activityType: "midterm_exam", replace: true }));
    } else if (type == "Mục tiêu học tập") {
      response = await dispatch(processLearningOutcome({ instructorId: userId, file, classId: classId }));
    } else {
      response = await dispatch(processFilePartly({ instructorId: userId, file, classId: classId, activityType: "final_exam", replace: true }));
    }

    if (response.payload.success === true) {
      toast.success(`Tạo dữ liệu ${type.toLowerCase()} thành công`);
      if (type === "THông tin sinh viên" || type === "Tổng kết") {
        // refetch student list after final note and student information
        dispatch(clearStudentList());
        await dispatch(fetchStudentList({ classId: classId, type: showSummary ? "summary" : "information", page: 1, amount, search }));
      } else {
        // refetch all exam after create new exam
        await dispatch(fetchAllExam({ instructor_id: userId, class_id: classId }));
      }
    } else {
      toast.error(`Tạo dữ liệu ${type.toLowerCase()} thất bại! Hãy thữ lại sau`);
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
    dispatch(fetchAllExam({
      instructor_id: userId,
      class_id: classId
    }))

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
            Thêm Sinh Viên
          </ActionButton>

          <ActionButton
            variant="contained"
            ref={buttonRef}
            style={{ width: "15%", fontWeight: "700", fontSize: "14px" }}
            color="primary"
            startIcon={<Add />}
            disabled={loading}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleClickAddQuiz}
          >
            Thêm Bài Kiểm Tra
          </ActionButton>

          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}

            PaperProps={{
              style: {
                width: buttonRef.current ? buttonRef.current.offsetWidth : undefined,
              },
            }}
          >
            <MenuItem onClick={() => handleSelectQuizType("Quiz")}>Quiz</MenuItem>
            <MenuItem onClick={() => handleSelectQuizType("Assignment")}>Assignment</MenuItem>
            <MenuItem onClick={() => handleSelectQuizType("Midterm")}>Giữa Kỳ</MenuItem>
            <MenuItem onClick={() => handleSelectQuizType("Final")}>Cuối Kỳ</MenuItem>
          </Menu>


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

      <Box sx={{
        p: 2,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", // tùy chỉnh nếu cần căn chỉnh dọc
      }}  >
        <span style={{ fontSize: "20px", fontWeight: "700" }}
        >
          Số lượng sinh viên: {showSummary ? totalGrade : totalInformation} &nbsp;&nbsp;&nbsp;
        </span>

        {(tab == 3 && MiniTab == 1) && (
          <FormControl style={{ width: "22.5%", minWidth: 250 }} size="small">
            <InputLabel id="academic-year-label">Chọn bài kiểm tra</InputLabel>
            <Select
              labelId="academic-year-label"
              label="Chọn khóa"
            // onChange={(e) => handleChangeAcademicYear(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>

            </Select>
          </FormControl>
        )}


      </Box>

      <LearningOutComeItemsContainer>
        <LearningOutComeTabButtons active={MiniTab === 1} onClick={() => { setMiniTab(1) }}>
          SINH VIÊN
        </LearningOutComeTabButtons>


        <LearningOutComeTabButtons active={MiniTab === 2} onClick={() => { setMiniTab(2) }}>
          BÀI KIỂM TRA
        </LearningOutComeTabButtons>
      </LearningOutComeItemsContainer>

      {MiniTab === 1 && (
        <>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{ marginTop: 2 }}
          >
            <Tab label="Thông tin" onClick={() => setShowSummary(false)} />
            <Tab label="Tổng kết" onClick={() => setShowSummary(true)} />
          </Tabs>


          <div style={{ position: "relative", marginTop: 16 }}>
            {tab === 0 && (
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

            {tab === 1 && (
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


          </div>
        </>
      )}


      {MiniTab === 2 && (
        <>
          <Tabs
            value={secondTab}
            onChange={handleSecondTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{ marginTop: 2 }}
          >
            <Tab label="Assignment" />
            <Tab label="Quiz" />
            <Tab label="Giữa kỳ" />
            <Tab label="Cuối kỳ" />
          </Tabs>


          <div style={{ position: "relative", marginTop: 16 }}>

            {secondTab === 0 && (
              <Box position="relative">
                <ExamQuizTable
                  filteredRows={assignments}
                  columns={ColExamAssignmentData}
                  handleDelete={handleDeleteExam}
                  handleEdit={handleEditExamClick}
                  onLoadMore={handleLoadMore}
                  handleViewInformation={handleViewInformationExam}
                  hasMore={hasMore}
                  type="Assignment"
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

            {secondTab === 1 && (
              <Box position="relative">
                <ExamQuizTable
                  filteredRows={quizzes}
                  columns={ColExamQuizData}
                  handleDelete={handleDeleteExam}
                  handleEdit={handleEditExamClick}
                  onLoadMore={handleLoadMore}
                  handleViewInformation={handleViewInformationExam}
                  hasMore={hasMore}
                  type="Quiz"
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
            {secondTab === 2 && (
              <Box position="relative">
                <ExamQuizTable
                  filteredRows={midtermExams}
                  columns={ColExamMidtermData}
                  handleDelete={handleDeleteExam}
                  handleEdit={handleEditExamClick}
                  onLoadMore={handleLoadMore}
                  handleViewInformation={handleViewInformationExam}
                  hasMore={hasMore}
                  type="Giữa Kỳ"
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


            {secondTab === 3 && (
              <Box position="relative">
                <ExamQuizTable
                  filteredRows={finalExams}
                  columns={ColExamFinalData}
                  handleDelete={handleDeleteExam}
                  handleEdit={handleEditExamClick}
                  onLoadMore={handleLoadMore}
                  handleViewInformation={handleViewInformationExam}
                  hasMore={hasMore}
                  type="Cuối kỳ"
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
        </>
      )}

      {importFile &&
        <ImportFileModal
          open={importFile}
          setOpen={setImportFile}
          types={importTypes}
          sampleLinks={[
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1752565820/Student_gis2ij.xlsx",
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1749965679/Assignment_lcnuje.xlsx",
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1752565819/Quiz_wtmeki.xlsx",
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1752565819/Assignment_aw1cn2.xlsx",
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1752565819/Final_Exam_jvqjg3.xlsx",
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1752565820/Midterm_vpp8v5.xlsx",
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1752565819/Learning_Outcome_j3g05r.xlsx",
          ]}
          onImport={handleImport}
        />}

      <AddStudentModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        className={className}
        subject={subject}
        onSave={handleAddNewStudent}
        mode="add"
        instructorId={userId ?? ""}
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
      />

      <AddQuizModal
        students={allStudents}
        open={isAddModalQuizOpen}
        onClose={() => setIsAddModalQuizOpen(false)}
        handleCreateExam={handleCreateExam}
        mode="Quiz"
      />

      <AddQuizModal
        students={allStudents}
        open={isAddModalAssignmentOpen}
        onClose={() => setIsAddModalAssignmentOpen(false)}
        mode="Assignment"
        handleCreateExam={handleCreateExam}
      />

      <AddQuizModal
        students={allStudents}
        open={isAddModalFinalOpen}
        onClose={() => setIsAddModalFinalOpen(false)}
        mode="Cuối Kỳ"
        handleCreateExam={handleCreateExam}
      />


      <AddQuizModal
        students={allStudents}

        open={isAddModalMidtermOpen}
        onClose={() => setIsAddModalMidtermOpen(false)}

        mode="Giữa Kỳ"
        handleCreateExam={handleCreateExam}
      />

      <DetailExamModal
        open={isViewDetailExamModal}
        onClose={() => setIsViewDetailExamModal(false)}
        mode={ViewDetailExamType}
        StudentData={activities}
        ExamData={examInfo}

      >
      </DetailExamModal>


      <EditExamModal

        open={isEditExamModal}
        onClose={() => setIsExamModal(false)}
        mode={EditExamType}
        StudentData={activities}
        ExamData={examInfo}
        handleUpdateExam={handleEditExam}
      ></EditExamModal>


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
        assignmentFields={ColStudentsAssignments.filter(item => item.label != "MSSV")}
        QuizFields={ColQuizData.filter(item => item.label != "MSSV")}
        MidTermFields={ColFinalscores.filter(item => item.label != "MSSV")}
        FinalFields={ColMidtermScores.filter(item => item.label != "MSSV")}


        entityData={student}
      />}

      <ConfirmDialog
        open={confirmOpen}
        title={`Xác nhận xóa sinh viên`}
        content={`Bạn có chắc chắn muốn xóa sinh viên với mã số ${mssv} này ra khỏi lớp không?`}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />


      <ConfirmDialog
        open={confirmExamOpen}
        title={`Xác nhận xóa bài kiểm tra`}
        content={`Bạn có chắc chắn muốn xóa bài kiểm tra này không?`}
        onClose={() => setConfirmExamOpen(false)}
        onConfirm={handleDeleteRequestExam}
      />


    </Container>




  );
}