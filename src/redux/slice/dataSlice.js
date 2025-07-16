import { createSlice } from "@reduxjs/toolkit";
import {
    fetchClassList,
    fetchClassDetail,
    fetchAllFaculties,
    fetchAllMajors,
    fetchAllPrograms,
    deleteClass,
    updateClass,
    createProgram,
    createFaculty,
    createMajor,
    createCourse,
    fetchAllCourses,
    processAllData,
    processCourseData,
    processFilePartly,
    fetchAcademicyear,
    fetchSemester,
    deleteCourse,
    deleteFaculty,
    deleteProgram,
    deleteMajor,
    updateProgram,
    updateFaculty,
    updateMajor,
    updateCourse,
    processStudentData,
    fetchStudentList,
    createStudent,
    updateStudent,
    fetchStudentDetail,
    deleteStudentFromClass,

    fetchAllExam,
    
    fetchExamDetail,
    createExam,
    updateExam,
    deleteExam,
    fetchAllStudent
} from "../thunk/dataThunk";

const initialState = {
    classList: [],
    _class: null,
    studentsInformation: [],
    studentsGrade: [],
    student: null,
    error: null,
    message: null,
    code: 0,
    loading: false,
    page: 1,
    amount: 10,
    totalRecords: 0,
    totalPrograms: 0,
    totalFaculties: 0,
    totalCourses: 0,
    totalMajors: 0,
    hasMore: 0,
    faculties: [],
    programs: [],
    majors: [],
    deletedClass: null,
    updatedClass: null,
    courses: [],
    processCsvResult: null,
    academicYears: [],
    semesters: [],
    loadingCourse: false,
    loadingProgram: false,
    loadingMajor: false,
    loadingFaculty: false,
    totalInformation: 0,
    totalGrade: 0,
    type: null,

    assignments:[],
    finalExams:[],
    quizzes:[],
    midtermExams:[],
    loadingExam: false,
    
    activities:[],
    examInfo:null,
    createFinalExam:[],
    allStudents:[],

}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.message = null;
        },
        clearClassList: (state) => {
            state.classList = [];
            state.page = 1;
            state.hasMore = true;
        },
        clearClassDetail: (state) => {
            state._class = null;
        },
        setPageDefault: (state) => {
            state.page = 1
        },
        clearStudentList: (state) => {
            state.studentsInformation = [];
            state.studentsGrade = [];
            state.hasMore = true;
            state.page = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClassList.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchClassList.fulfilled, (state, action) => {
                state.loading = false;
                const newList = action.payload.data.classList || [];
                const existingIds = new Set(state.classList.map(item => item.classId));
                const filteredList = newList.filter(item => !existingIds.has(item.classId));
                state.classList = [...state.classList, ...filteredList];
                state.page = action.payload.data.page;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.amount = action.payload.data.amount;
                state.totalRecords = action.payload.data.totalRecords;
                state.hasMore = newList.length > 0;
            })
            .addCase(fetchClassList.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchClassDetail.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchClassDetail.fulfilled, (state, action) => {
                state.loading = false;
                state._class = action.payload.data;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(fetchClassDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchAllFaculties.pending, (state) => {
                state.loadingFaculty = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchAllFaculties.fulfilled, (state, action) => {
                state.loadingFaculty = false;
                state.faculties = action.payload.data.items;
                state.totalFaculties = action.payload.data.totalRecords;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(fetchAllFaculties.rejected, (state, action) => {
                state.loadingFaculty = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchAllMajors.pending, (state) => {
                state.loadingMajor = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchAllMajors.fulfilled, (state, action) => {
                state.loadingMajor = false;
                state.majors = action.payload.data.items;
                state.totalMajors = action.payload.data.totalRecords;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(fetchAllMajors.rejected, (state, action) => {
                state.loadingMajor = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchAllPrograms.pending, (state) => {
                state.loadingProgram = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchAllPrograms.fulfilled, (state, action) => {
                state.loadingProgram = false;
                state.programs = action.payload.data.items;
                state.totalPrograms = action.payload.data.totalRecords;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(fetchAllPrograms.rejected, (state, action) => {
                state.loadingProgram = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(deleteClass.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(deleteClass.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
                state.deletedClass = action.payload.data.id;
            })
            .addCase(deleteClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(updateClass.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(updateClass.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(updateClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(createProgram.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(createProgram.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(createProgram.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(createFaculty.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(createFaculty.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(createFaculty.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(createMajor.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(createMajor.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(createMajor.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(createCourse.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchAllCourses.pending, (state, action) => {
                state.loadingCourse = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchAllCourses.fulfilled, (state, action) => {
                state.loadingCourse = false;
                state.courses = action.payload.data.items;
                state.totalCourses = action.payload.data.totalRecords;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(fetchAllCourses.rejected, (state, action) => {
                state.loadingCourse = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(processAllData.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(processAllData.fulfilled, (state, action) => {
                state.loading = false;
                state.processCsvResult = action.payload.data;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(processAllData.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(processCourseData.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(processCourseData.fulfilled, (state, action) => {
                state.loading = false;
                state.processCsvResult = action.payload.data;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(processCourseData.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(processFilePartly.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(processFilePartly.fulfilled, (state, action) => {
                state.loading = false;
                state.processCsvResult = action.payload.data;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(processFilePartly.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchAcademicyear.pending, (state) => {
                state.loading = false;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchAcademicyear.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
                state.academicYears = action.payload.data;
            })
            .addCase(fetchAcademicyear.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchSemester.pending, (state) => {
                state.loading = false;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchSemester.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
                state.semesters = action.payload.data;
            })
            .addCase(fetchSemester.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(deleteCourse.pending, (state) => {
                state.loading = false;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(deleteFaculty.pending, (state) => {
                state.loading = false;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(deleteFaculty.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(deleteFaculty.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(deleteProgram.pending, (state) => {
                state.loading = false;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(deleteProgram.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(deleteProgram.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(deleteMajor.pending, (state) => {
                state.loading = false;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(deleteMajor.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(deleteMajor.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(updateProgram.pending, (state) => {
                state.loading = false;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(updateProgram.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(updateProgram.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(updateFaculty.pending, (state) => {
                state.loading = false;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(updateFaculty.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(updateFaculty.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(updateMajor.pending, (state) => {
                state.loading = false;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(updateMajor.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(updateMajor.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(updateCourse.pending, (state) => {
                state.loading = false;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(processStudentData.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(processStudentData.fulfilled, (state, action) => {
                state.loading = false;
                state.processCsvResult = action.payload.data;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(processStudentData.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchStudentList.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchStudentList.fulfilled, (state, action) => {
                state.loading = false;

                // 1) Lấy payload
                const { type, items, totalRecords, sumTotal, page } = action.payload.data;
                state.type = type;

                let newItems = [];
                // 2) Ghép nối hoặc khởi tạo lại list
                if (type === "summary") {
                    // summary = grades
                    // không lặp lại studentId cũ
                    const existingIds = new Set(state.studentsGrade.map(s => s.studentId));
                    newItems = items.filter(item => !existingIds.has(item.studentId));
                    console.log(newItems);
                    state.studentsGrade = [...state.studentsGrade, ...newItems];
                    // cập nhật tổng số và trung bình
                    state.totalGrade = totalRecords;
                } else {
                    // information = student info
                    const existingIds = new Set(state.studentsInformation.map(s => s.studentId));
                    newItems = items.filter(item => !existingIds.has(item.studentId));
                    state.studentsInformation = [...state.studentsInformation, ...newItems];
                    state.totalInformation = totalRecords;
                }
                // 3) Tính hasMore & tăng page
                state.page = page;
                state.hasMore = totalRecords > page * state.amount;

                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(fetchStudentList.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(createStudent.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(createStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(createStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(updateStudent.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchStudentDetail.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchStudentDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.student = action.payload.data;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(fetchStudentDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(deleteStudentFromClass.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(deleteStudentFromClass.fulfilled, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(deleteStudentFromClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })

            .addCase(fetchAllExam.pending, (state, action) => {
                state.loadingExam = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchAllExam.fulfilled, (state, action) => {
                state.loadingExam = false;

                state.assignments = action.payload.data.assignments;
                state.finalExams = action.payload.data.finalExams;
                state.quizzes = action.payload.data.quizzes;
                    
                state.midtermExams = action.payload.data.midtermExams;
                // state.totalCourses = action.payload.data.totalRecords;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(fetchAllExam.rejected, (state, action) => {
                state.loadingExam = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })


            .addCase(fetchExamDetail.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchExamDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.activities = action.payload.data.activities;
                
                if(action.payload.data.quiz) state.examInfo = action.payload.data.quiz;
                
                if(action.payload.data.finalExam) state.examInfo = action.payload.data.finalExam;

                if(action.payload.data.assignment) state.examInfo = action.payload.data.assignment;

                if(action.payload.data.midtermExam) state.examInfo = action.payload.data.midtermExam;

                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(fetchExamDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })

            .addCase(createExam.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(createExam.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(createExam.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })


            .addCase(deleteExam.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(deleteExam.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
                
            })
            .addCase(deleteExam.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })

            .addCase(updateExam.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(updateExam.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(updateExam.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            
            .addCase(fetchAllStudent.pending, (state, action) => {
                // state.loadingExam = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchAllStudent.fulfilled, (state, action) => {
                // state.loadingExam = false;

                state.allStudents = action.payload.data.items;
                

                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(fetchAllStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
    }
});

export const { clearError, clearClassList, clearClassDetail, setPageDefault, clearStudentList } = dataSlice.actions;
export default dataSlice.reducer;