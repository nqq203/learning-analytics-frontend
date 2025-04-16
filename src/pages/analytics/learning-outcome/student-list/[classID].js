import styled from "styled-components";
import { useState, useEffect } from "react";
import StudentListLNO from "@/components/LearningOutcome/StudentListLNO";
import { useRouter } from "next/router";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const LearningOutcomesContainer = styled.div`
    margin: auto;
    width: 97%;
    padding-block:20px;
    
    
    
`
const LearningOutComeContainerBody = styled.div`
  display:flex;
  flex-direction:column;
  gap:1rem;

`
const LearningOutComeHeader = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  
  align-items:center;
`

const LearningOutComeItemsContainer = styled.div`
  display:flex;
  flex-direction:row;
  gap:20px;
`



const AnalyticsBtn = styled.div`
    cursor:pointer;
    padding-inline:2rem;
    padding-block:1rem;
    color:white;
    font-size:1.2rem;
    background-color:var(--blue-600);
    border:none;
    border-radius:10px;
    font-weight:bold;

    &:hover{
        background-color:var(--blue-400);
    }
    &:active{
    
        background-color:var(--blue-500);
    }


`



const LineDivider = styled.div`
  border:0.1px solid gray;
  width:100%;
`



const TableHeader =  ["MSSV","Họ tên","Lớp","Môn","Khóa","Thành tích dự đoán" ,"Hành Động"];

const TableContent = [
  {
      "ID":"1", "MSSV":"21125434", "Name": "Nguyễn Văn A", "Class":"21CLC08", "Subject":"Cơ sở dữ liệu nâng cao", "ClassOf":"2021","PredictAchivement":"Giỏi"
  },
  {
    "ID":"2", "MSSV":"21125435","Name": "Nguyễn Văn B","Class":"21CLC09","Subject":"Cơ sở dữ liệu nâng cao","ClassOf":"2021","PredictAchivement":"Khá"
  },
  {
    "ID":"3","MSSV":"21125435","Name": "Nguyễn Văn C","Class":"21CLC10","Subject":"Cơ sở dữ liệu nâng cao","ClassOf":"2021","PredictAchivement":"Trung bình"
  }
  ,
  {
    "ID":"4","MSSV":"21125435","Name": "Nguyễn Văn C","Class":"21CLC10","Subject":"Cơ sở dữ liệu nâng cao","ClassOf":"2021","PredictAchivement":"Yếu"
  }
  ,
  {
    "ID":"5","MSSV":"21125435","Name": "Nguyễn Văn C","Class":"21CLC10","Subject":"Cơ sở dữ liệu nâng cao","ClassOf":"2021","PredictAchivement":"Khá"
  }
]

const StudentContainerLNO = () => {
    const userId = "12456";
    const [studentID,setStudentID] = useState("");
    const router = useRouter();
    const { classID } = router.query;

    useEffect(() => {
      console.log(`Chuyển sang Students ${studentID}`);
      if(studentID!=""){
        router.push(`/analytics/learning-outcome/student/${classID}/${studentID}`);
      }
    }, [studentID]);


    return (
      < LearningOutcomesContainer >


      <LearningOutComeContainerBody>
        <LearningOutComeHeader>
                    <LearningOutComeItemsContainer>
        
        
                        <FormControl style={{ minWidth: "40rem" }} variant="outlined">
                                <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" />
                        </FormControl>
        
                        <FormControl style={{ minWidth: "12rem" }} variant="outlined">
                            <InputLabel>Khóa</InputLabel>
                            <Select  label="Chọn khóa">
                                <MenuItem value="class">21</MenuItem>
                                <MenuItem value="course">22</MenuItem>
                                <MenuItem value="subject">23</MenuItem>
                            </Select>
                        </FormControl>
                    </LearningOutComeItemsContainer>
        
                    <LearningOutComeItemsContainer>
        
                        <AnalyticsBtn>Lọc</AnalyticsBtn>
                        <AnalyticsBtn onClick= {()=>handleNav()}>Dự đoán</AnalyticsBtn>
        
        
                    </LearningOutComeItemsContainer>
        
        
                </LearningOutComeHeader>


        <LineDivider></LineDivider>

          <StudentListLNO TableContent={TableContent} TableHeader={TableHeader} setStudentID={setStudentID}> </StudentListLNO>
        

       </LearningOutComeContainerBody>
      </LearningOutcomesContainer>
    );
  };
  
  export default StudentContainerLNO;