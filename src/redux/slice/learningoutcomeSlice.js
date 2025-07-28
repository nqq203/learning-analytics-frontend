import {createSlice} from "@reduxjs/toolkit"
import { fetchClassesByLecturer,fetchFilteredClasses,fetchStudent,fetchStudentDetail,fetchStudentSearch,FetchAcademicYearClass,FetchLOChart,FetchLOFinal } from "../thunk/learningoutcomeThunk"


const initialState = {
    classes: [],
    studentsOverview: [],
    error: null,
    message: null,
    code: -1,
    loading: false,
    subjects: [],
    studentsDetails: [],
    filteredClass:[],
    amount: 10,
    page: 1,
    totalRecords: 0,
    success: false,
    classAverageGrade: 0,
    studentCount: 0,
    details: false,
    originalClasses: [],
    courseInfo:[],
    grades:[],
    studentInfo:[],
    academicYear:[],

    LoChart:[],
    assignmentQuiz:[],

    type:null,
    finalExamDataRadar:[],
    finalExamDataBar:[],
    finalExamDataLine:[],
    finalExamDataPie:[],
    finalExamData:[]
}

const learningoutcomeSlice = createSlice({
    name:"learningOutcome",
    initialState,
    reducers: {
        clearError:(state) =>{
            state.error = null;
            state.message =null;
        }
    },
    extraReducers: (builder) =>{
        builder
              .addCase(fetchClassesByLecturer.pending, (state, action) => {
                state.loading = true;
              })
              .addCase(fetchClassesByLecturer.fulfilled, (state, action) => {
                state.loading = false;
                state.amount = action.payload.data.amount;
                state.page = action.payload.data.page;
                state.totalRecords = action.payload.data.totalRecords;
                state.classes = action.payload.data.classesList;
                state.originalClasses = action.payload.data.classesList;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
              })
              .addCase(fetchClassesByLecturer.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
              })

              .addCase(fetchFilteredClasses.pending, (state, action) => {
                state.loading = true;
              })
              .addCase(fetchFilteredClasses.fulfilled, (state, action) => {
                state.loading = false;
                state.amount = action.payload.data.amount;
                state.page = action.payload.data.page;
                state.totalRecords = action.payload.data.totalRecords;
                state.classes = action.payload.data.classesList;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
              })
              .addCase(fetchFilteredClasses.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
              })

              .addCase(fetchStudent.pending, (state, action) => {
                state.loading = true;
              })
              .addCase(fetchStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.studentsOverview = action.payload.data.studentsList;
                // state.details = action.payload.data.details;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
              })
              .addCase(fetchStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
              })


              .addCase(fetchStudentDetail.pending, (state, action) => {
                state.loading = true;
              })
              .addCase(fetchStudentDetail.fulfilled, (state, action) => {
                state.loading = false;

                state.courseInfo = action.payload.data.courseInformation;
                state.grades = action.payload.data.grades;
                state.studentInfo = action.payload.data.studentInformation;

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


              .addCase(fetchStudentSearch.pending, (state, action) => {
                state.loading = true;
              })
              .addCase(fetchStudentSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.studentsOverview = action.payload.data.studentsList;
                state.totalRecords = action.payload.data.totalRecords;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
              })
              .addCase(fetchStudentSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
              })

              .addCase(FetchAcademicYearClass.pending, (state, action) => {
                state.loading = true;
              })
              .addCase(FetchAcademicYearClass.fulfilled, (state, action) => {
                state.loading = false;
                state.academicYear = action.payload.data;
                
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
              })
              .addCase(FetchAcademicYearClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
              })



              .addCase(FetchLOChart.pending, (state, action) => {
                state.loading = true;
              })
              .addCase(FetchLOChart.fulfilled, (state, action) => {
                state.loading = false;
                state.LoChart = action.payload.data;
                state.assignmentQuiz = action.payload.data.assignmentQuiz;

                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
              })
              .addCase(FetchLOChart.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
              })
              

              .addCase(FetchLOFinal.pending, (state, action) => {
                state.loading = true;
              })
              .addCase(FetchLOFinal.fulfilled, (state, action) => {


                const type = action.meta.arg.type;
                state.type = type;

                state.finalExamData = action.payload.data.finalExam;
                
                if(type=="Bar"){
                    
                    state.finalExamDataBar = action.payload.data.finalExam;
                }
                else if (type=="Radar"){
                    state.finalExamDataRadar = action.payload.data.finalExam;
                }
                else if (type=="Line"){
                    state.finalExamDataLine = action.payload.data.finalExam;
                }
                else if(type=="Pie"){
                    state.finalExamDataPie = action.payload.data.finalExam;
                }
                
                state.loading = false;
                
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
              })
              .addCase(FetchLOFinal.rejected, (state, action) => {
                
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
              })
              
    }
})

export const {clearError} = learningoutcomeSlice.actions;
export default learningoutcomeSlice.reducer;