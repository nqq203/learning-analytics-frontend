import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ClassListLNO from "@/components/LearningOutcome/ClassListLNO";

const LearningOutcomesContainer = styled.div`
    margin: auto;
    width: 97%;
    padding-top:1.5rem;
    
    
    
`
const LearningOutComeContainerBody = styled.div`
  display:flex;
  flex-direction:column;
  gap:0.8rem;

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
  padding:0.7rem;
  padding-inline:2rem;
  font-weight:bold;
  
  color: var(--blue-800);
  border: 1px solid var(--blue-800);


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



const ClassTableHeader = ["STT","Lớp","Khóa","Chương trình","Khoa","Chuyên ngành","Hành Động"];
const ClassTableContent = [{
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


const SubjectTableHeader = ["STT","Môn","Lớp","Khóa","Tín Chỉ","Học Kỳ","Chương Trình","Khoa","Chuyên ngành","Hành Động"];
const SubjectTableContent = [
            {
                "ID":"1",
                "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 1",
                "ClassName": "21CLC08",
                "ClassOf":2021,
                "Credit":4,
                "Semester":1,
                "Program":"Chất Lượng Cao",
                "Falculity":"Công nghệ thông tin",
                "Specialized":"Hệ Thống Thông Tin"
            }
            ,
            {
                "ID":"2",
                "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 2",
                "ClassName": "21CLC08",
                "ClassOf":2021,
                "Credit":4,
                "Semester":1,
                "Program":"Chất Lượng Cao",
                "Falculity":"Công nghệ thông tin",
                "Specialized":"Hệ Thống Thông Tin"
            }
            ,
            {
                "ID":"3",
                "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 3",
                "ClassName": "21CLC08",
                "ClassOf":2021,
                "Credit":4,
                "Semester":1,
                "Program":"Chất Lượng Cao",
                "Falculity":"Công nghệ thông tin",
                "Specialized":"Hệ Thống Thông Tin"
            }
            ,
            {
                "ID":"4",
                "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 4",
                "ClassName": "21CLC08",
                "ClassOf":2021,
                "Credit":4,
                "Semester":1,
                "Program":"Chất Lượng Cao",
                "Falculity":"Công nghệ thông tin",
                "Specialized":"Hệ Thống Thông Tin"
            }
            ,
            {
                "ID":"5",
                "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 5",
                "ClassName": "21CLC08",
                "ClassOf":2021,
                "Credit":4,
                "Semester":1,
                "Program":"Chất Lượng Cao",
                "Falculity":"Công nghệ thông tin",
                "Specialized":"Hệ Thống Thông Tin"
            }
            ,
            {
                "ID":"6",
                "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 6",
                "ClassName": "21CLC08",
                "ClassOf":2021,
                "Credit":4,
                "Semester":1,
                "Program":"Chất Lượng Cao",
                "Falculity":"Công nghệ thông tin",
                "Specialized":"Hệ Thống Thông Tin"
            }
            ,
            {
                "ID":"7",
                "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 7",
                "ClassName": "21CLC08",
                "ClassOf":2021,
                "Credit":4,
                "Semester":1,
                "Program":"Chất Lượng Cao",
                "Falculity":"Công nghệ thông tin",
                "Specialized":"Hệ Thống Thông Tin"
            }
            ,
            {
                "ID":"8",
                "SubjectName":"Cơ Sở Dữ Liệu Nâng Cao 8",
                "ClassName": "21CLC08",
                "ClassOf":2021,
                "Credit":4,
                "Semester":1,
                "Program":"Chất Lượng Cao",
                "Falculity":"Công nghệ thông tin",
                "Specialized":"Hệ Thống Thông Tin"
            }
        
        ]

        
const LearningOutcome = () => {
    
    const userId = 1;
    const [classID,setClassID] = useState("");
    const [subjectID,setsubjectID] = useState("");

    const router = useRouter();

    useEffect(() => {
      if(classID!="")
      {
        console.log(`Chuyển sang trang mới truyền subjectID và classID ${subjectID}`);  
        router.push(`/analytics/learning-outcome/student-list/${classID}`);
      }
    }, [classID]);


    return (
      < LearningOutcomesContainer >


      <LearningOutComeContainerBody>
        
        <LearningOutComeHeader>

          <LearningOutComeItemsContainer>

            <LearningOutComeTabButtons >
              DANH SÁCH LỚP
            </LearningOutComeTabButtons>


            
          </LearningOutComeItemsContainer>


          <LearningOutComeItemsContainer>

          <FormControl style={{ minWidth: "200px" }} variant="outlined">
            <InputLabel>Khóa</InputLabel>
            <Select  label="Chọn khóa">
                <MenuItem value="class">21</MenuItem>
                <MenuItem value="course">22</MenuItem>
                <MenuItem value="subject">23</MenuItem>
            </Select>
            </FormControl>


            <FormControl style={{ minWidth: "200px" }} variant="outlined">
            <InputLabel>Lớp</InputLabel>
            <Select  label="Chọn lớp">
                <MenuItem value="class">21CLC05</MenuItem>
                <MenuItem value="course">21CLC06</MenuItem>
                <MenuItem value="subject">21CLC07</MenuItem>
            </Select>
            </FormControl>

          </LearningOutComeItemsContainer>


        </LearningOutComeHeader>


        <LineDivider></LineDivider>

         
            <ClassListLNO TableHeader={ClassTableHeader} TableContent ={ClassTableContent} setClassID={setClassID} ></ClassListLNO>
         
        

       </LearningOutComeContainerBody>
      </LearningOutcomesContainer>
    );
  };
  
  export default LearningOutcome;