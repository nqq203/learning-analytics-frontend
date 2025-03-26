import styled from "styled-components";
import '../../../../../styles/LearningOutCome.css'
import { IoEyeSharp } from "react-icons/io5";
import FilterBoard from "@/components/FilterBoard";
import { useState, useEffect } from "react";
import StudentListLNO from "@/components/StudentListLNO";
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



const TableHeader = ["STT","Lớp","Khóa","Chương trình","Khoa","Chuyên ngành","Hành Động"];
const TableContent = [{
  "ID":"1",
  "ClassName": "21CLC08",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Không"
},
{
  "ID":"2",
  "ClassName": "21HTTT1",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},
{
  "ID":"3",
  "ClassName": "21HTTT2",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"4",
  "ClassName": "21HTTT3",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"5",
  "ClassName": "21HTTT4",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"6",
  "ClassName": "21HTTT5",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
}
,{
  "ID":"7",
  "ClassName": "21HTTT1",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},
{
  "ID":"8",
  "ClassName": "21HTTT2",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"9",
  "ClassName": "21HTTT3",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"10",
  "ClassName": "21HTTT4",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"11",
  "ClassName": "21HTTT5",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"12",
  "ClassName": "21HTTT1",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
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

          <StudentListLNO userID={userId} classID={classID} subjectID={subjectID} setStudentID={setStudentID}> </StudentListLNO>
        

       </LearningOutComeContainerBody>
      </LearningOutcomesContainer>
    );
  };
  
  export default StudentContainerLNO;