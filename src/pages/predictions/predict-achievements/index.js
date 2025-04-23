import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SubjectList from "@/components/PredictionAchievements/SubjectList";
import ClassList from "@/components/PredictionAchievements/ClassList";
const LearningOutcomesContainer = styled.div`
    margin: auto;
    width: 97%;
    padding-top:1.7rem;
    
    
    
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
  gap:1rem;
`

const LearningOutComeTabButtons = styled.div`
  display:flex;
  flex-direction:row;
  padding:0.7rem;
  padding-inline:2rem;
  font-weight:bold;
  
  color: ${({ active }) => (active ? "var(--blue-800)" : "var(--grey-600)")};
  border: 1px solid ${({ active }) => (active ? "var(--blue-800)" : "var(--grey-600)")};


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

const FilterInput = styled.select`
    
    font-size:1rem;
    padding-inline:2rem;

`


const ClassTableHeader = ["STT","Lớp","Khóa","Chương trình","Khoa","Chuyên ngành","Gợi ý cải thiện"];
const ClassTableContent = [
        {
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
    const [MiniTab,setMiniTab] = useState(1);
    const userId = 1;
    const [classID,setClassID] = useState("");
    const [subjectID,setsubjectID] = useState("");
    const [Nav,setNav] =useState(false);
    const router = useRouter();
    

    useEffect(() => {
            if(classID!=""){
              
              router.push(`/predictions/predict-achievements/class/${classID}`) 
            }
            else if (subjectID!=""){
              router.push(`/predictions/predict-achievements/subject/${subjectID}`)
            }
          }, [classID,subjectID]);
    


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



          <LearningOutComeItemsContainer>

          <FormControl sx={{ minWidth: 200 }} variant="outlined" size="small">
          <InputLabel id="khoa-label">Khóa</InputLabel>
          <Select
            labelId="khoa-label"
            label="Khóa"
            sx={{
              height: 40,
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                paddingTop: '10px', // hoặc tùy chỉnh để căn giữa theo mắt nhìn
                paddingBottom: '10px',
              },
            }}
          >
            <MenuItem value="21">21</MenuItem>
            <MenuItem value="22">22</MenuItem>
            <MenuItem value="23">23</MenuItem>
          </Select>
        </FormControl>



        <FormControl sx={{ minWidth: 200 }} variant="outlined" size="small">
          <InputLabel id="khoa-label">Lớp</InputLabel>
          <Select
            labelId="khoa-label"
            label="Khóa"
            sx={{
              height: 40,
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                paddingTop: '10px', // hoặc tùy chỉnh để căn giữa theo mắt nhìn
                paddingBottom: '10px',
              },
            }}
          >
            <MenuItem value="class">21CLC05</MenuItem>
            <MenuItem value="course">21CLC06</MenuItem>
            <MenuItem value="subject">21CLC07</MenuItem>
          </Select>
        </FormControl>


          </LearningOutComeItemsContainer>


        </LearningOutComeHeader>


        <LineDivider></LineDivider>

          { MiniTab==1?
            <ClassList  TableHeader={ClassTableHeader} TableContent={ClassTableContent} setClassID={setClassID} ></ClassList>:
            <SubjectList  TableHeader={SubjectTableHeader} TableContent={SubjectTableContent} setsubjectID = {setsubjectID}></SubjectList>

          }
        

       </LearningOutComeContainerBody>
      </LearningOutcomesContainer>
    );
  };
  
  export default LearningOutcome;