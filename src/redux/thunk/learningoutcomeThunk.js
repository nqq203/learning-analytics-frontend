import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleLearningOutcomeApiError,LearningOutcomeApi } from "../api/learningOutcome";

export const fetchClassesByLecturer = createAsyncThunk(
    "learningOutcome/fetchClassesByLecturer",
    async ({userId,page,amount},{rejectWithValue}) =>{
        try{
            
            const response = await LearningOutcomeApi.FilterClass({
                userId,page,amount
            });
            
            return response.data;
        }
        catch(error){
            return rejectWithValue(handleLearningOutcomeApiError(error.response.data))
        }
    }
)

export const fetchFilteredClasses = createAsyncThunk(
    "learningOutcome/fetchFilteredClasses",
    async({userId,page,amount,semester,academicYear},{rejectWithValue})=>{
        try{
            
            const response = await LearningOutcomeApi.FilterClass({userId,page,amount,semester,academicYear})
            console.log("filter class",response.data)
            return response.data;
        }
        catch(error){
            return rejectWithValue(handleLearningOutcomeApiError(error.response.data))
        }
    }

)

export const fetchStudent = createAsyncThunk (
    "learningOutcome/fetchStudent",
    async({userId,classId,page,amount},{rejectWithValue})=>{
        try{
            const response = await LearningOutcomeApi.fetchStudent({userId,classId,page,amount})
            console.log("DATA NE", response.data);
            return response.data;
        }
        catch(error){
            return rejectWithValue(handleLearningOutcomeApiError(error.response.data))
        }
    }

)

export const fetchStudentDetail = createAsyncThunk(
    "learningOutcome/fetchStudentDetail",
    async({studentId,userId,classId},{rejectWithValue})=>{
        try{
            const response = await LearningOutcomeApi.fetchStudentDetail({studentId,userId,classId})
            console.log('data ne',response.data)
            return response.data;
        }
        catch(error){
            return rejectWithValue(handleLearningOutcomeApiError(error.response.data))
        }
    }

)

export const fetchStudentSearch = createAsyncThunk(
    "learningOutcome/fetchStudentSearch",
    async({classId,page,amount,userId,search})=>{
        try{
            
            const response = await LearningOutcomeApi.FetchStudentSearch({classId,page,amount,userId,search})
            
            return response.data;
        }
        catch(error){
            return rejectWithValue(handleLearningOutcomeApiError(error.response.data))
        }
    }

)

export const FetchAcademicYearClass = createAsyncThunk(
    "learningOutcome/fetchAcademicYearClass",
    async({userId})=>{
        try{
            const response = await LearningOutcomeApi.FetchAcademicYearClass({userId})
            return response.data;
        }
        catch(error){
            return rejectWithValue(handleLearningOutcomeApiError(error.response.data))
        }
    }


)