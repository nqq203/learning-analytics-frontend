import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SubjectList from "@/components/PredictionAchievements/SubjectList";
import ClassList from "@/components/PredictionAchievements/ClassList";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredClasses } from "@/redux/thunk/learningoutcomeThunk";
import InputAdornment from '@mui/material/InputAdornment';
import TableList from "@/components/PredictionAchievements/TableList";
import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";




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





const ClasssColumns = [
  {id:"ClassName",label:"Lớp",align:"center"},
  {id:"ClassOf",label:"Khóa",align:"center"},
  {id:"Program",label:"Chương trình",align:"center"},
  {id:"Falculity",label:"Khoa",align:"center"},
  {id:"Specialized",label:"Chuyên ngành",align:"center"},
]

const CourseColumns = [
  {id:"SubjectName",label:"Môn",align:"center"},
  {id:"ClassName",label:"Lớp",align:"center"},
  {id:"ClassOf",label:"Khóa",align:"center"},
  {id:"Credit",label:"Tín chỉ",align:"center"},
  {id:"Semester",label:"Học kỳ",align:"center"},
]
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

const CourseTableContent = [
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
    const router = useRouter();
    const dispatch = useDispatch();
    const {classes,academicYear, originalClasses} = useSelector(state=>state.learningoutcome);
    const [MiniTab,setMiniTab] = useState(1);
    const userId = 1;
    const [classID,setClassID] = useState("");
    const [subjectID,setsubjectID] = useState("");
        const [chosenAcademicYear,setChosenAcademicYear] = useState("");
            const [page,setPage] = useState(1);
                const [isLoading, setIsLoading] = useState(false);
                    const [amount,setAmount] = useState(10);
                        const [chosenSemester,setChosenSemester] = useState("");
                    
                
            
        
    
    const [Nav,setNav] =useState(false);

    const fetchClasses = async() =>{
          setIsLoading(true)
                await dispatch(fetchFilteredClasses ({userId: "I1132", page: page, amount: amount,semester:chosenSemester,academicYear:chosenAcademicYear}))
          
          setIsLoading(false)
        }
    
        const handleScrollEnd = () => {
          if (!isLoading && rows.length < totalRecords) {
            setPage(prev => prev + 1);
          }
        };
    
        useEffect( () =>{
          fetchClasses();
        },[chosenAcademicYear,page])
    
        const handleChangeAcedemicYear = (value)=>{
          setChosenAcademicYear(value) 
          setPage(1); // reset page
          setRows([]); // reset data
        }
    

    useEffect(() => {
            if(classID!=""){
              router.push(`/predictions/predict-achievements/class/${classID}`) 
            }
            else if (subjectID!=""){
              router.push(`/predictions/predict-achievements/subject/${subjectID}`)
            }
          }, [classID,subjectID]);
    


    return (
      < Container >


      
        
        <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          
          <LearningOutComeItemsContainer>

            <LearningOutComeTabButtons active={MiniTab === 1} onClick={()=>{setMiniTab(1)}}>
              DANH SÁCH LỚP
            </LearningOutComeTabButtons>


            <LearningOutComeTabButtons active={MiniTab === 2} onClick={()=>{setMiniTab(2)}}>
              DANH SÁCH MÔN
            </LearningOutComeTabButtons>

          </LearningOutComeItemsContainer>



          <LearningOutComeItemsContainer>

          <FormControl style={{ minWidth: "250px" }} variant="outlined" size="small">
            <InputLabel>Khóa</InputLabel>
            <Select label="Chọn khóa" onChange={(e)=>handleChangeAcedemicYear(e.target.value)}>
                            <MenuItem value="">Tất cả</MenuItem>
                            {
                              academicYear.map((item,index)=>{
                                return (<MenuItem value={item} key={index}>{item}</MenuItem>)
                              })
                            }
                            
                        </Select>
            </FormControl>


            <FormControl style={{ minWidth: "250px" }} variant="outlined" size="small">
            <InputLabel>Lớp</InputLabel>
            <Select  label="Chọn lớp">
                <MenuItem value="class">21CLC05</MenuItem>
                <MenuItem value="course">21CLC06</MenuItem>
                <MenuItem value="subject">21CLC07</MenuItem>
            </Select>
            </FormControl>


          </LearningOutComeItemsContainer>
        

        </Header>


       

          { MiniTab==1?
            <TableList  columns={ClasssColumns} filteredRows={ClassTableContent} handleActions={setClassID} ></TableList>:
            <TableList  columns={CourseColumns} filteredRows={CourseTableContent} handleActions = {setsubjectID}></TableList>

          }
        

      
      </Container>
    );
  };
  
  export default LearningOutcome;