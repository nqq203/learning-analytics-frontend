import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Add,
  FileDownload,
} from "@mui/icons-material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRouter } from "next/router";
import ClassTable from "@/components/ClassManagement/ClassTable";
import InsertModal from "@/components/ClassManagement/InsertModal";
import EditModal from "@/components/ClassManagement/EditModal";
import ImportFileModal from "@/components/ClassManagement/ImportFileModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassDetail, fetchClassList, fetchAllFaculties, fetchAllMajors, fetchAllPrograms, deleteClass, updateClass, createCourse, createFaculty, createMajor, createProgram, fetchAllCourses, createClass, processAllData, processCourseData, fetchAcademicyear, fetchSemester, deleteProgram, deleteFaculty, deleteMajor, deleteCourse, updateProgram, updateFaculty, updateMajor, updateCourse } from "@/redux/thunk/dataThunk";
import { jwtDecode } from "jwt-decode";
import { clearClassDetail, clearClassList } from "@/redux/slice/dataSlice";
import { toast } from "react-toastify";
import ProgramTable from "@/components/ClassManagement/ProgramTable";
import FacultyTable from "@/components/ClassManagement/FacultyTable";
import MajorTable from "@/components/ClassManagement/MajorTable";
import CourseTab from "@/components/ClassManagement/CourseTab";
import ConfirmDialog from "@/components/ClassManagement/ConfirmDialog";
import DetailModal from "@/components/ClassManagement/DetailModal";
import PageHeader from "@/components/CommonStyles/PageHeader";
import SearchFilters from "@/components/CommonStyles/SearchFilters";
import BreadcrumbComponent from "@/components/Breadcrumb";

export default function MainClassManagement() {
  const router = useRouter();
  const [chosenAcademicYear, setChosenAcademicYear] = useState(null);
  const [chosenSemester, setChosenSemester] = useState(null);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [classId, setClassId] = useState(null);
  const [importFile, setImportFile] = useState(false);
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const { classList, loading, totalRecords, totalMajors, totalPrograms, totalCourses, totalFaculties, page, amount, hasMore, _class, faculties, programs, majors, courses, academicYears, semesters, loadingFaculty, loadingMajor, loadingProgram, loadingCourse } = useSelector(state => state.data);
  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.auth);
  const [tab, setTab] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);
  const [search, setSearch] = useState(null);
  const [programId, setProgramId] = useState(null);
  const [facultyId, setFacultyId] = useState(null);
  const [majorId, setMajorId] = useState(null);
  const [courseId, setCourseId] = useState(null);

  const handleViewInformation = (id) => {
    setClassId(id);
    setOpenDetail(true);
  }

  const handleSearch = async () => {
    if (tab === 0) {
      dispatch(clearClassList());
      await dispatch(fetchClassList({ instructorId: userId, page: 1, amount, search, academicYear: chosenAcademicYear, semester: chosenSemester }));
    } else if (tab === 1) {
      await dispatch(fetchAllPrograms({ instructorId: userId, search }));
    } else if (tab === 2) {
      await dispatch(fetchAllFaculties({ instructorId: userId, search }));
    } else if (tab === 3) {
      await dispatch(fetchAllMajors({ instructorId: userId, search }));
    } else {
      await dispatch(fetchAllCourses({ instructorId: userId, search }));
    }
  }

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
      dispatch(clearClassList());
      dispatch(fetchClassList({ instructorId: userId, page: 1, amount, search, academicYear: chosenAcademicYear, semester: chosenSemester }));
      await dispatch(fetchAllFaculties({ instructorId: userId }));
      await dispatch(fetchAllMajors({ instructorId: userId }));
      await dispatch(fetchAllPrograms({ instructorId: userId }));
      await dispatch(fetchAllCourses({ instructorId: userId }))
    } else {
      toast.error("Tạo dữ liệu thất bại! Hãy thử lại sau");
    }
    setImportFile(false);
  };

  const handleTabChange = (e, newIdx) => {
    setTab(newIdx);
  }

  const columns = [
    { id: "classId", label: "ID", align: "center" },
    { id: "className", label: "Tên lớp", align: "center" },
    { id: "courseCode", label: "Mã khóa học", align: "center" },
    { id: "courseName", label: "Tên khóa học", align: "center" },
    { id: "createdDate", label: "Thời gian tạo", align: "center" },
    { id: "updatedDate", label: "Cập nhật lần cuối", align: "center" }

  ];

  const classFields = [
    { label: "ID lớp", key: "classId" },
    // { label: "ID khóa học", key: "classId"}, 
    { label: "Tên lớp", key: "className" },
    { label: "Mã khóa học", key: "courseCode" },
    { label: "Tên khóa học", key: "courseName" },
    { label: "Học kỳ", key: "semester" },
    { label: "Năm/Khóa học", key: "academicYear" },
    { label: "Tổng sinh viên", key: "numberStudent" },
    { label: "Tín chỉ", key: "credit" },
    { label: "Loại khóa học", key: "courseType" },
    { label: "Chương trình", key: "programName" },
    { label: "Chuyên ngành", key: "majorName" },
    { label: "Khoa", key: "facultyName" },
    { label: "Thời gian tạo", key: "createdDate" },
    { label: "Cập nhật", key: "updatedDate" },
  ]

  const editLabelMap = {
    className: "Tên lớp",
    courseCode: "Môn",
    facultyName: "Tên khoa",
    majorName: "Chuyên ngành",
    numberStudent: "Tổng SV",
    programName: "Chương trình",
    semester: "Học kỳ",
    academicYear: "Khóa (VD: 2023-2024, 2022-2024, ...)",
  };

  const editCourseLabelMap = {
    courseCode: "Mã khóa học",
    courseName: "Tên khóa học",
    credit: "Tín chỉ",
    courseType: "Loại khóa học"
  }

  const editProgramLabelMap = {
    programName: "Tên chương trình"
  }

  const editFacultyLabelMap = {
    facultyName: "Tên khoa"
  }

  const editMajorLabelMap = {
    majorName: "Tên chuyên ngành"
  }

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

  const courseTypeOptions = [
    { courseType: 'BBCN', label: 'Bắt buộc chuyên ngành' },
    { courseType: 'CSN', label: 'Cơ sở ngành' },
    { courseType: 'TCN', label: 'Tự chọn ngành' },
    { courseType: 'TN', label: 'Tốt nghiệp' },
  ];

  const buildFields = (obj, type) => {
    if (!obj) return [];

    switch (type) {
      case "program":
        // Chỉ sửa tên chương trình, input text
        return [
          {
            key: "programName",
            label: editProgramLabelMap.programName,
            type: "text",
            options: [],
            value: obj.programName,
          },
        ];

      case "faculty":
        // Chỉ sửa tên khoa, input text
        return [
          {
            key: "facultyName",
            label: editFacultyLabelMap.facultyName,
            type: "text",
            options: [],
            value: obj.facultyName,
          },
        ];

      case "major":
        // Chỉnh tên chuyên ngành (text) và chọn khoa (select)
        return [
          {
            key: "majorName",
            label: editMajorLabelMap.majorName,
            type: "text",
            options: [],
            value: obj.majorName,
          },
          {
            key: "facultyId",
            label: "Khoa",
            type: "select",
            options: selectFields.facultyId,
            value: obj.facultyId,
          },
        ];

      case "course":
        // Tất cả các field đều text
        return [
          {
            key: "courseCode",
            label: editCourseLabelMap.courseCode,
            type: "text",
            options: [],
            value: obj.courseCode,
          },
          {
            key: "courseName",
            label: editCourseLabelMap.courseName,
            type: "text",
            options: [],
            value: obj.courseName,
          },
          {
            key: "credit",
            label: editCourseLabelMap.credit,
            type: "text",
            options: [],
            value: obj.credit,
          },
          {
            key: "courseType",
            label: editCourseLabelMap.courseType,
            type: "select",
            options: courseTypeOptions,
            value: obj.courseType,
          },
        ];

      default:
        // Class: giữ logic cũ, có select cho courseId, facultyId, majorId, programId
        return Object.entries(editLabelMap).map(([key, label]) => {
          let fieldKey = key;
          let value = obj[key];
          let options = [];

          if (key === "courseCode") {
            fieldKey = "courseId";
            value = obj.courseId;
            options = selectFields.courseId;
          } else if (nameToId[key]) {
            fieldKey = nameToId[key];
            value = obj[fieldKey];
            options = selectFields[fieldKey];
          }

          return {
            key: fieldKey,
            label,
            type: options.length ? "select" : "text",
            options,
            value,
          };
        });
    }
  };

  // 2) Đổi handleFields thành getEditFields, dùng find() để lấy đúng object:
  const getEditFields = () => {
    let obj, type;
    if (tab === 0) {
      obj = _class; type = "class";
    } else if (tab === 1) {
      obj = programs.find(r => r.programId === programId); type = "program";
    } else if (tab === 2) {
      obj = faculties.find(r => r.facultyId === facultyId); type = "faculty";
    } else if (tab === 3) {
      obj = majors.find(r => r.majorId === majorId); type = "major";
    } else {
      obj = courses.find(r => r.courseId === courseId); type = "course";
    }
    return buildFields(obj, type);
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
    dispatch(fetchClassList({ instructorId: userId, page: 1, amount, search, academicYear: chosenAcademicYear, semester: chosenSemester }));
  }, [userId, chosenSemester, chosenAcademicYear]);

  // Fetch semester and academic year
  useEffect(() => {
    if (!userId) return;
    dispatch(fetchAcademicyear({ instructorId: userId }));
    dispatch(fetchSemester({ instructorId: userId }));
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
      dispatch(fetchClassList({ instructorId: userId, page: page + 1, amount, search, academicYear: chosenAcademicYear, semester: chosenSemester }));
    }
  };

  const handleDeleteRequest = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      let response;
      if (tab === 0)
        response = await dispatch(deleteClass({ classId: pendingDeleteId }));
      else if (tab === 1)
        response = await dispatch(deleteProgram({ programId: pendingDeleteId, instructorId: userId }));
      else if (tab === 2)
        response = await dispatch(deleteFaculty({ facultyId: pendingDeleteId, instructorId: userId }));
      else if (tab === 3)
        response = await dispatch(deleteMajor({ majorId: pendingDeleteId, instructorId: userId }));
      else
        response = await dispatch(deleteCourse({ courseId: pendingDeleteId, instructorId: userId }));
      let entity = "lớp";
      if (tab === 1) entity = "chương trình"
      else if (tab === 2) entity = "khoa";
      else if (tab === 3) entity = "chuyên ngành";
      else if (tab === 4) entity = "khóa học";
      if (response.payload.code === 200) {
        toast.success(`Xóa ${entity} thành công`);
        if (tab === 0) {
          dispatch(clearClassList());
          await dispatch(fetchClassList({ instructorId: userId, page: 1, amount, search, academicYear: chosenAcademicYear, semester: chosenSemester }));
        }
        else if (tab === 1) await dispatch(fetchAllPrograms({ instructorId: userId, search }));
        else if (tab === 2) await dispatch(fetchAllFaculties({ instructorId: userId, search }));
        else if (tab === 3) await dispatch(fetchAllMajors({ instructorId: userId, search }));
        else await dispatch(fetchAllCourses({ instructorId: userId, search }));
      } else {
        toast.error(`Xóa ${entity} thất bại! Hãy thử lại sau`);
      }
    } catch {
      toast.error(`Xóa ${entity} thất bại! Hãy thử lại sau`);
    } finally {
      setConfirmOpen(false);
      setPendingDeleteId(null);
    }
  };

  const handleEdit = (id) => {
    setModalUpdate(true)
    if (tab === 0) setClassId(id);
    else if (tab === 1) setProgramId(id);
    else if (tab === 2) setFacultyId(id);
    else if (tab === 3) setMajorId(id);
    else setCourseId(id);
  }

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
        let entity;
        // refresh the relevant list:
        switch (type) {
          case "faculty":
            await dispatch(fetchAllFaculties({ instructorId: userId }));
            entity = "Khoa";
            break;
          case "major":
            await dispatch(fetchAllMajors({ instructorId: userId }));
            entity = "Chuyên ngành";
            break;
          case "program":
            await dispatch(fetchAllPrograms({ instructorId: userId }));
            entity = "Chương trình"
            break;
          case "course":
            await dispatch(fetchAllCourses({ instructorId: userId }));
            entity = "Khóa học"
            break;
          case "class":
            dispatch(clearClassList());
            await dispatch(fetchClassList({ instructorId: userId, page: 1, amount }));
            entity = "Lớp"
            break;
        }
        toast.success(`${entity} đã được thêm!`);
      } else {
        toast.error(`Thêm ${type} thất bại!`);
      }
    } catch (err) {
      toast.error(`Lỗi khi thêm ${type}!`);
    } finally {
      setModalInsert(false);
    }
  };

  const handleSubmitEdit = async (newData) => {
    let response;
    if (tab === 0)
      response = await dispatch(updateClass({ instructorId: userId, data: newData, classId }));
    else if (tab === 1)
      response = await dispatch(updateProgram({ programId: programId, payload: newData, instructorId: userId }));
    else if (tab === 2)
      response = await dispatch(updateFaculty({ facultyId: facultyId, payload: newData, instructorId: userId }));
    else if (tab === 3)
      response = await dispatch(updateMajor({ majorId: majorId, payload: newData, instructorId: userId }));
    else
      response = await dispatch(updateCourse({ courseId: courseId, payload: newData, instructorId: userId }));
    if (response?.payload?.code === 200) {
      toast.success("Cập nhật thành công");
      if (tab === 0) {
        dispatch(clearClassList());
        dispatch(clearClassDetail());
        await dispatch(fetchClassList({ instructorId: userId, page: 1, amount, search, academicYear: chosenAcademicYear, semester: chosenSemester }));
      } else if (tab === 1) {
        await dispatch(fetchAllPrograms({ instructorId: userId, search }));
      } else if (tab === 2) {
        await dispatch(fetchAllFaculties({ instructorId: userId, search }));
      } else if (tab === 3) {
        await dispatch(fetchAllMajors({ instructorId: userId, search }));
      } else {
        await dispatch(fetchAllCourses({ instructorId: userId, search }));
      }
    } else {
      toast.error("Cập nhật thất bại! Hãy thử lại sau");
    }
  }

  const getTotalRecords = () => {
    switch (tab) {
      case 0: return totalRecords;
      case 1: return totalPrograms;
      case 2: return totalFaculties;
      case 3: return totalMajors;
      case 4: return totalCourses;
      default: return 0;
    }
  };

  const getTabLabel = () => {
    switch (tab) {
      case 0: return "Lớp";
      case 1: return "Chương trình đào tạo";
      case 2: return "Khoa";
      case 3: return "Chuyên ngành";
      case 4: return "Khóa học";
      default: return "";
    }
  };

  const filterOptions = [
    {
      key: "academicYear",
      label: "Khóa",
      value: chosenAcademicYear || "",
      options: academicYears.map(year => ({ value: year, label: year })),
      minWidth: 180,
    },
    {
      key: "semester",
      label: "Kỳ",
      value: chosenSemester || "",
      options: semesters.map(sem => ({ value: sem, label: sem })),
      minWidth: 160,
    },
  ];

  const getBreadcrumbs = () => {
    const { pathname } = router;
    if (pathname === "/data-management") {
      return [
        {
          label: "Trang chủ",
          type: "home",
          path: "/"
        },
        {
          label: "Quản lý dữ liệu",
          type: "data-management",
          path: "/data-management",
        },
      ];
    }

    return [];
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader
        title="Quản lý dữ liệu"
        subtitle="Quản lý thông tin lớp, chương trình đào tạo, khoa, chuyên ngành và khóa học"
        icon="management"
        variant="management"
        stats={[
          { label: "Tổng bản ghi", value: getTotalRecords() },
          { label: "Loại dữ liệu", value: getTabLabel() },
        ]}
        actions={
          <>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setModalInsert(true)}
              disabled={loading}
              sx={{
                bgcolor: 'white',
                color: '#059669',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Thêm
            </Button>
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onClick={() => setImportFile(true)}
              disabled={loading}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.8)',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Tải file
            </Button>
          </>
        }
      />

      <BreadcrumbComponent 
        breadcrumbs={getBreadcrumbs()}
        variant="default"
      />

      <SearchFilters
        searchValue={search || ""}
        onSearchChange={setSearch}
        onSearch={handleSearch}
        filters={filterOptions}
        onFilterChange={(key, value) => {
          if (key === "academicYear") {
            handleChangeAcedemicYear(value);
          } else if (key === "semester") {
            handleChangeSemester(value);
          }
        }}
        onClearFilters={() => {
          setSearch("");
          handleChangeAcedemicYear("");
          handleChangeSemester("");
        }}
        searchPlaceholder="Tìm kiếm..."
      />
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
              handleViewInformation={handleViewInformation}
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
          <Box position="relative">
            <ProgramTable
              rows={programs || []}
              handleDelete={handleDeleteRequest}
              handleEdit={handleEdit}
            />
            {loadingProgram && (
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

        {tab === 2 && (
          <Box position="relative">
            <FacultyTable
              rows={faculties || []}
              handleDelete={handleDeleteRequest}
              handleEdit={handleEdit}
            />
            {loadingFaculty && (
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

        {tab === 3 && (
          <Box position="relative">
            <MajorTable
              rows={majors || []}
              handleDelete={handleDeleteRequest}
              handleEdit={handleEdit}
            />
            {loadingMajor && (
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

        {tab === 4 && (
          <Box position="relative">
            <CourseTab
              rows={courses || []}
              handleDelete={handleDeleteRequest}
              handleEdit={handleEdit}
            />
            {loadingCourse && (
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
      </div>
      {importFile ?
        <ImportFileModal
          open={importFile}
          setOpen={setImportFile}
          types={importTypes}
          sampleLinks={[
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1752565819/Course_Data_huy9kj.xlsx",
            "https://res.cloudinary.com/dhvnmhqlb/raw/upload/v1752565819/All_f7u4fd.xlsx",
          ]}
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
      {modalUpdate && !loading ?
        <EditModal
          title={tab === 0 ? "lớp" : tab === 1 ? "chương trình" : tab === 2 ? "khoa" : tab === 3 ? "chuyên ngành" : "khóa học"}
          Modal={modalUpdate}
          setModal={setModalUpdate}
          fields={getEditFields()}
          onSubmit={handleSubmitEdit} /> : null}
      {openDetail && !loading &&
        <DetailModal
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          title={"Thông tin lớp"}
          fields={classFields}
          entityData={_class} />}
      {/* Confirm dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title={`Xác nhận xóa ${tab === 0 ? "lớp" : tab === 1 ? "chương trình" : tab === 2 ? "khoa" : tab === 3 ? "chuyên ngành" : "khóa học"}`}
        content={`Bạn có chắc chắn muốn xóa ${tab === 0 ? "LỚP" : tab === 1 ? "CHƯƠNG TRÌNH" : tab === 2 ? "KHOA" : tab === 3 ? "CHUYÊN NGÀNH" : "KHÓA HỌC"} này không?`}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}