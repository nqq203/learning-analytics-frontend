import styled from "styled-components";
import { useState, useEffect } from "react";
import StudentListLNO from "@/components/LearningOutcome/StudentListLNO";
import { useRouter } from "next/router";

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
  justify-content:space-between ;
  padding-bottom:10px;
  align-items:center;
`

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
  // border: 2px solid gray;

  color: var(--blue-800);
  border: 2px solid var(--blue-800);


  border-left:none;
  border-right:none;
  border-top:none;
  cursor:pointer;

  &:hover{
    color: var(--blue-300);
    border-color: var(--blue-300);
  }

  &:active{
    color: var(--blue-800);
    border-color: var(--blue-800);
  }
`

const AnalyticsBtn = styled.div`
     padding:0.8rem;
    color:white;
    font-size:1rem;
    background-color:var(--blue-300);
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
    const { classID, subjectID } = router.query;

    useEffect(() => {
      console.log(`Chuyển sang Students ${studentID}`);
      if(studentID!=""){
        router.push(`/analytics/learning-outcome/student/${classID}/${subjectID}/${studentID}`);
      }
    }, [studentID]);


    return (
      < LearningOutcomesContainer >


      <LearningOutComeContainerBody>
        <LearningOutComeHeader>

          <LearningOutComeItemsContainer>
            <LearningOutComeTabButtons >
              DANH SÁCH SINH VIÊN
            </LearningOutComeTabButtons>
          </LearningOutComeItemsContainer>


        </LearningOutComeHeader>


        <LineDivider></LineDivider>

          <StudentListLNO TableContent={TableContent} TableHeader={TableHeader} subjectID={subjectID} setStudentID={setStudentID}> </StudentListLNO>
        

       </LearningOutComeContainerBody>
      </LearningOutcomesContainer>
    );
  };
  
  export default StudentContainerLNO;