import styled from "styled-components";
import '../../../styles/LearningOutCome.css'
import { IoEyeSharp } from "react-icons/io5";
import FilterBoard from "@/components/FilterBoard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ClassListLNO from "@/components/ClassListLNO";
import SubjectListLNO from "@/components/SubjectListLNO";

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

  color: ${({ active }) => (active ? "var(--blue-800)" : "gray")};
  border: 2px solid ${({ active }) => (active ? "var(--blue-800)" : "gray")};


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



const LineDivider = styled.div`
  background-color: var(--grey-600);
  height:1px;
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

const LearningOutcome = () => {
    const [MiniTab,setMiniTab] = useState(1);
    const userId = "12456";
    const [classID,setClassID] = useState("");
    const [subjectID,setsubjectID] = useState("");

    const router = useRouter();

    useEffect(() => {
            if(classID!=""){
              setMiniTab(2);
            }
          }, [classID]);

    useEffect(() => {
      if(subjectID!="" && classID!="")
      {
        console.log(`Chuyển sang trang mới truyền subjectID và classID ${subjectID}`);  
        router.push(`/analytics/learning-outcome/student-list/${classID}/${subjectID}`);
      }
    }, [subjectID,router]);


    return (
      < LearningOutcomesContainer >


      <LearningOutComeContainerBody>
        <LearningOutComeHeader>

          <LearningOutComeItemsContainer>
            <LearningOutComeTabButtons active={MiniTab === 1} onClick={()=>{setMiniTab(1)}}>
              DANH SÁCH LỚP
            </LearningOutComeTabButtons>


            <LearningOutComeTabButtons active={MiniTab === 2} onClick={()=>{setMiniTab(2)}}>
              DANH SÁCH MÔN
            </LearningOutComeTabButtons>
          </LearningOutComeItemsContainer>


        </LearningOutComeHeader>


        <LineDivider></LineDivider>

          { MiniTab==1?
            <ClassListLNO userId={userId} setClassID={setClassID} ></ClassListLNO>:
            <SubjectListLNO userID={userId} classID={classID} setSubjectID={setsubjectID}></SubjectListLNO>

          }
        

       </LearningOutComeContainerBody>
      </LearningOutcomesContainer>
    );
  };
  
  export default LearningOutcome;