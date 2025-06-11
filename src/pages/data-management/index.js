import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";
import SearchIcon from '@mui/icons-material/Search';
import {
  Add,
  FileDownload,
} from "@mui/icons-material";
import InputAdornment from '@mui/material/InputAdornment'
import { useRouter } from "next/router";
import ClassTable from "@/components/ClassManagement/ClassTable";
import InsertModal from "@/components/ClassManagement/InsertModal";
import EditModal from "@/components/ClassManagement/EditModal";
import ImportFileModal from "@/components/ClassManagement/ImportFileModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassDetail, fetchClassList, fetchAllFaculties, fetchAllMajors, fetchAllPrograms, deleteClass, updateClass, createCourse, createFaculty, createMajor, createProgram, fetchAllCourses, createClass, processAllData, processCourseData } from "@/redux/thunk/dataThunk";
import { jwtDecode } from "jwt-decode";
import { clearClassDetail, clearClassList } from "@/redux/slice/dataSlice";
import { toast } from "react-toastify";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProgramTable from "@/components/ClassManagement/ProgramTable";
import FacultyTable from "@/components/ClassManagement/FacultyTable";
import MajorTable from "@/components/ClassManagement/MajorTable";
import CourseTab from "@/components/ClassManagement/CourseTab";
import ConfirmDialog from "@/components/ClassManagement/ConfirmDialog";

export default function MainClassManagement() {
  const router = useRouter();
  const [chosenAcademicYear, setChosenAcademicYear] = useState("");
  const [chosenSemester, setChosenSemester] = useState("");
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [classId, setClassId] = useState(null);
  const [importFile, setImportFile] = useState(false);
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const { classList, loading, totalRecords, totalMajors, totalPrograms, totalCourses, totalFaculties, page, amount, hasMore, _class, faculties, programs, majors, courses } = useSelector(state => state.data);
  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.auth);
  const [tab, setTab] = useState(0);


  const importTypes = ["Lớp/Khóa học", "Toàn bộ"];
  const handleImport = async (type, file) => {
    let response;
    if (type === "Lớp/Khóa học") {
      response = await dispatch(processCourseData({ instructorId: userId, file }));
    } else {
      response = await dispatch(processAllData({ instructorId: userId, file }));
    }
    if (response.payload.success === true) {
      toast.success("Tạo dữ liệu Lớp/Khóa học thành công");
    } else {
      toast.error("Tạo dữ liệu thất bại! Hãy thử lại sau");
    }
    setImportFile(false);
  };
  const handleTabChange = (e, newIdx) => {
    setTab(newIdx);
  }

  const semester = [1, 2, 3]
  const academicYear = ["2014-2018", "2015-2019", "2021-2025", "2022-2026"]
  const columns = [
    { id: "classId", label: "ID Lớp", align: "center" },
    { id: "className", label: "Tên Lớp", align: "center" },
    { id: "courseCode", label: "Mã Môn", align: "center" },
    { id: "courseName", label: "Tên Môn", align: "center" },
    { id: "courseType", label: "Loại Môn", align: "center" },
    { id: "credit", label: "Tín Chỉ", align: "center" },
    { id: "facultyName", label: "Tên Khóa", align: "center" },
    { id: "majorName", label: "Chuyên Ngành", align: "center" },
    { id: "numberStudent", label: "Tổng SV", align: "center" },
    { id: "programName", label: "Chương Trình", align: "center" },
    { id: "semester", label: "Học Kỳ", align: "center" },
    { id: "academicYear", label: "Khóa", align: "center" },
  ];

  const labelMap = {
    className: "Tên lớp",
    courseCode: "Môn",
    facultyName: "Tên khoa",
    majorName: "Chuyên ngành",
    numberStudent: "Tổng SV",
    programName: "Chương trình",
    semester: "Học kỳ",
    academicYear: "Khóa (VD: 2023-2024, 2022-2024, ...)",
  };

  const selectFields = {
    courseId: courses,
    facultyId: facultyOptions,
    majorId: majorOptions,
    programId: programOptions,
  };

  const nameToId = {
    facultyName: "facultyId",
    majorName: "majorId",
    programName: "programId",
  };

  useEffect(() => {
    console.log(faculties, programs, majors, courses);
  }, [faculties, programs, majors, courses]);

  const buildFieldsFromClass = (_class) => {
    if (!_class) return [];

    return Object.entries(labelMap).map(([key, label]) => {
      // khởi tạo
      let fieldKey = key;
      let value = _class[key];
      let options = [];

      // 1) courseCode → courseId
      if (key === "courseCode") {
        fieldKey = "courseId";
        value = _class.courseId;
        options = selectFields.courseId;
      }
      // 2) chỉ facultyName, majorName, programName mới chuyển
      else if (nameToId[key]) {
        fieldKey = nameToId[key];
        value = _class[fieldKey];
        options = selectFields[fieldKey];
      }

      const type = options.length > 0 ? "select" : "text";
      return { key: fieldKey, label, type, options, value };
    });
  };

  const userId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const { sub } = jwtDecode(accessToken);
      return sub;
    } catch {
      return null;
    }
  }, [accessToken]);

  // Fetch class list lần đầu tiên
  useEffect(() => {
    if (!userId) return;
    dispatch(clearClassList());
    dispatch(fetchClassList({ instructorId: userId, page: 1, amount }));
  }, [userId]);

  // Fetch class data detail
  useEffect(() => {
    if (!classId || !userId) return;
    dispatch(clearClassDetail());
    dispatch(fetchClassDetail({ instructorId: userId, classId }));
  }, [classId]);

  //Fetch programs, faculties, majors
  useEffect(() => {
    if (!userId) return;
    const fetchOptions = async () => {
      await dispatch(fetchAllFaculties({ instructorId: userId }));
      await dispatch(fetchAllMajors({ instructorId: userId }));
      await dispatch(fetchAllPrograms({ instructorId: userId }));
      await dispatch(fetchAllCourses({ instructorId: userId }))
    }
    fetchOptions();
  }, [userId]);

  useEffect(() => {
    if (faculties) setFacultyOptions(faculties);
    if (majors) setMajorOptions(majors);
    if (programs) setProgramOptions(programs);
  }, [programs, faculties, majors])

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchClassList({ instructorId: userId, page: page + 1, amount }));
    }
  };

  useEffect(() => {
    console.log("CLASS LIST", classList);
  }, [classList]);

  const handleDeleteRequest = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      const response = await dispatch(deleteClass({ classId: pendingDeleteId }));
      if (response.payload.code === 200) {
        toast.success("Xóa lớp thành công");
        dispatch(clearClassList());
        await dispatch(fetchClassList({ instructorId: userId, page: 1, amount }));
      } else {
        toast.error("Xóa lớp thất bại! Hãy thử lại sau");
      }
    } catch {
      toast.error("Xóa lớp thất bại! Hãy thử lại sau");
    } finally {
      setConfirmOpen(false);
      setPendingDeleteId(null);
    }
  };

  const handleEdit = (id) => {
    console.log("heheheheh")
    setModalUpdate(true)
    setClassId(id)
  }

  useEffect(() => {
    console.log("modal update: ", modalUpdate);
  }, [modalUpdate]);

  const handleViewStudent = (id) => {
    router.push(`/data-management/${id}`)
  };

  const handleChangeSemester = (value) => {
    setChosenSemester(value)
  }

  const handleChangeAcedemicYear = (value) => {
    setChosenAcademicYear(value)
  }

  const handleInsert = async ({ type, data }) => {
    let response;
    try {
      switch (type) {
        case "faculty":
          response = await dispatch(createFaculty({ instructorId: userId, data }));
          break;
        case "major":
          response = await dispatch(createMajor({ instructorId: userId, data }));
          break;
        case "program":
          response = await dispatch(createProgram({ instructorId: userId, data }));
          break;
        case "course":
          response = await dispatch(createCourse({ instructorId: userId, data }));
          break;
        case "class":
          // if you have a createClass thunk:
          response = await dispatch(createClass({ instructorId: userId, data }));
          break;
        default:
          throw new Error("Unknown insert type: " + type);
      }

      if (response.payload?.success === true) {
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} đã được thêm!`);
        // refresh the relevant list:
        switch (type) {
          case "faculty":
            await dispatch(fetchAllFaculties({ instructorId: userId }));
            break;
          case "major":
            await dispatch(fetchAllMajors({ instructorId: userId }));
            break;
          case "program":
            await dispatch(fetchAllPrograms({ instructorId: userId }));
            break;
          case "course":
            await dispatch(fetchAllCourses({ instructorId: userId }));
            break;
          case "class":
            dispatch(clearClassList());
            await dispatch(fetchClassList({ instructorId: userId, page: 1, amount }));
            break;
        }
      } else {
        toast.error(`Thêm ${type} thất bại!`);
      }
    } catch (err) {
      toast.error(`Lỗi khi thêm ${type}!`);
    } finally {
      setModalInsert(false);
    }
  };

  return (
    <Container>
      <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
          <TextField
            variant="outlined"
            label="Tìm kiếm"
            style={{ width: "70%", minWidth: 500 }}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    // onClick={handleSearch}
                    sx={{
                      backgroundColor: "#1976D2",
                      borderRadius: "0 4px 4px 0",
                      padding: "10px",
                      height: "100%",
                      '&:hover': {
                        backgroundColor: "#1976d2",
                      },
                    }}
                  >
                    <SearchIcon sx={{ color: "white", fontSize: "20px" }} />
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
            <Select label="Chọn khóa" onChange={(e) => handleChangeAcedemicYear(e.target.value)}>
              <MenuItem value="">Tất cả</MenuItem>
              {
                academicYear.map((item, index) => {
                  return (<MenuItem value={item} key={index}>{item}</MenuItem>)
                })
              }
            </Select>
          </FormControl>
          <FormControl style={{ width: "20%", minWidth: 250 }} size="small">
            <InputLabel>Kỳ</InputLabel>
            <Select label="Chọn kỳ"
              onChange={(e) => handleChangeSemester(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {
                semester.map((item, index) => {
                  return (<MenuItem value={item} key={index}>{item}</MenuItem>)
                })
              }
            </Select>
          </FormControl>
          <ActionButton
            startIcon={<Add />}
            style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
            variant="contained"
            onClick={() => setModalInsert(true)}
          >
            Thêm</ActionButton>
          <ActionButton
            startIcon={<FileDownload />}
            color="primary"
            style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
            onClick={() => setImportFile(true)}
            variant="contained"
          >Tải file</ActionButton>
        </div>
      </Header>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "20px", fontWeight: "700" }}
        >
          Tổng bản ghi: {tab === 0 && totalRecords} {tab === 1 && totalPrograms} {tab === 2 && totalFaculties} {tab === 3 && totalMajors} {tab === 4 && totalCourses}
        </span>
        {/* --- Tabs --- */}
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{ marginTop: 2 }}
        >
          <Tab label="Lớp" />
          <Tab label="Chương trình đào tạo" />
          <Tab label="Khoa" />
          <Tab label="Chuyên ngành" />
          <Tab label="Khóa học" />
        </Tabs>
        {/* Table + Spinner Overlay */}
        <div style={{ position: "relative", marginTop: 16 }}>
          {tab === 0 && (
            <Box position="relative">
              <ClassTable
                filteredRows={classList.map((row) => {
                  return {
                    ...row,
                    numberStudent: row.numberStudent != null ? row.numberStudent : "--"
                  };
                })}
                columns={columns}
                handleDelete={handleDeleteRequest}
                handleEdit={handleEdit}
                handleViewStudent={handleViewStudent}
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
                  bgcolor="rgba(255,255,255,0.6)"
                  zIndex={10}
                >
                  <CircularProgress size="50px" />
                </Box>
              )}
            </Box>
          )}

          {tab === 1 && (
            <ProgramTable rows={programs || []} />
          )}

          {tab === 2 && (
            <FacultyTable rows={faculties || []} />
          )}

          {tab === 3 && (
            <MajorTable rows={majors || []} />
          )}

          {tab === 4 && (
            <CourseTab rows={courses || []} />
          )}
        </div>
        {importFile ?
          <ImportFileModal
            open={importFile}
            setOpen={setImportFile}
            types={importTypes}
            onImport={handleImport}
          /> : null}
        {modalInsert ?
          <InsertModal
            Modal={modalInsert}
            setModal={setModalInsert}
            faculties={faculties}
            majors={majors}
            programs={programs}
            courses={courses}
            onInsert={handleInsert}
          /> : null}
        {modalUpdate && !loading && _class ?
          <EditModal
            Modal={modalUpdate}
            setModal={setModalUpdate}
            fields={buildFieldsFromClass(_class)}
            onSubmit={async (newData) => {
              // console.log("📝 Updated class data:", newData);
              const response = await dispatch(updateClass({ instructorId: userId, data: newData, classId }));
              if (response.payload.code === 200) {
                toast.success("Cập nhật thành công");
                dispatch(clearClassList());
                dispatch(clearClassDetail());
                await dispatch(fetchClassList({ instructorId: userId, page: 1, amount }));
              } else {
                toast.error("Cập nhật  thất bại! Hãy thử lại sau");
              }
            }} /> : null}
        {/* Confirm dialog */}
        <ConfirmDialog
          open={confirmOpen}
          title="Xác nhận xóa lớp"
          content="Bạn có chắc chắn muốn xóa lớp này không?"
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
        />
      </div>
    </Container>
  );
}