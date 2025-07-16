import { createAsyncThunk } from "@reduxjs/toolkit";
import { fraudDetectionApi,handleFraudDetectionApiError } from "../api/fraudDetection";


export const fetchClassesByLecturer = createAsyncThunk(
    "prediction/fetchClassesByLecturer",
    async({userId},{rejectWithValue})=>{
            try{
                
                const response = await fraudDetectionApi.fetchClassesByLecturer({userId});
                console.log(response.data)
                return response.data;
            }
            catch(error){
                return rejectWithValue(handleFraudDetectionApiError(error.response.data))
            }
        }
)

export const fetchFraudDetect =createAsyncThunk(
    "predition/fetchFraudDetect",
    async({userId, quiz_id, min_threshold, max_threshold},{rejectWithValue})=>{
        try{
            
            const response = await fraudDetectionApi.fetchFraudDetection({userId, quiz_id, min_threshold, max_threshold})
           
            return response.data;
        }
        catch(error){
            return rejectWithValue(handleFraudDetectionApiError(error.response.data))
        }
    }
)

export const fetchImportQuizFile = createAsyncThunk(
    "prediction/fetchImportQuizFile",
    async({userId, file, class_id, activity_type},{rejectWithValue})=>{

        try{
            const response = await fraudDetectionApi.fetchImportQuizFile({userId, file, class_id, activity_type})
           
            // console.log("Xong fetchImportQuizFile: ",response.data)
            
            return response.data;
        }
        catch(error){
            // console.log("Lỗi khi import file",error)
            return rejectWithValue(handleFraudDetectionApiError(error.response.data))
        }
    }
)