import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// console.log(process.env.NEXT_PUBLIC_API_URL);

const handleFraudDetectionApiError = (error) => {
  if (error.message) {
    if (error && error.message) {
      return error.message;
    }
    if (error.status === 404) {
      return "Service not found. Please try again later.";
    }
    if (error.status === 401) {
      return "Invalid credentials";
    }
    if (error.status === 400) {
      return "Invalid input. Please check your details.";
    }
    return "Server error. Please try again later.";
  }
  return "Something went wrong. Please try again.";
};

const fraudDetectionApi ={
    fetchClassesByLecturer:({
        userId
    })=> axios.get(`${API_URL}/fraud-detection/classes-quizzes?instructor_id=${userId}`),

    fetchFraudDetection:({
        userId,
        quiz_id,
        min_threshold,
        max_threshold
    }) =>axios.post(
        `${API_URL}/fraud-detection/analyze?instructor_id=${userId}`
        ,
        {
          quiz_id,
          min_threshold,
          max_threshold
        }
    ),

    fetchImportQuizFile:({
      userId,
      file,
      class_id,
      activity_type
    })=> {

      const formData = new FormData();
      formData.append("file", file);
      formData.append("class_id", class_id);
      formData.append("activity_type", activity_type);
     
      return axios.post(`${API_URL}/data/part?instructor_id=${userId}`,formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
  )}

}

export {fraudDetectionApi,handleFraudDetectionApiError}