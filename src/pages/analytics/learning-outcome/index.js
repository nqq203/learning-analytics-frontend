import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ClassListLNO from "@/components/LearningOutcome/ClassListLNO";
import { FetchAcademicYearClass,fetchFilteredClasses } from "@/redux/thunk/learningoutcomeThunk";

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



const ClassTableHeader = ["STT","Lớp","Khóa","Môn","Học Kỳ","Tín chỉ","Hành Động"];
const semester =  [1,2,3]
        
const LearningOutcome = () => {
    const {classes,academicYear} = useSelector(state=>state.learningoutcome);
    const dispatch = useDispatch();
    // const userId = 1;
    const [classID,setClassID] = useState("");
    const [subjectID,setsubjectID] = useState("");
    const router = useRouter();

    const [amount,setAmount] = useState(10);
    const [page,setPage] = useState(1);

    const [chosenAcademicYear,setChosenAcademicYear] = useState("");
    const [chosenSemester,setChosenSemester] = useState("");

    const [searchKeyword,setSearchKeyword] = useState("");
    const [searchResult,setSearchResult] = useState("");
        
    const [isLoading, setIsLoading] = useState(false);
    const [rows,setRows] = useState([])


    const handleChangeSemester = (value) =>
      {
        setChosenSemester(value)
        setPage(1); // reset page
        setRows([]); // reset data
      }

    const handleChangeAcedemicYear = (value)=>{
        setChosenAcademicYear(value) 
        setPage(1); // reset page
        setRows([]); // reset data
      }

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
    },[chosenAcademicYear,chosenSemester,page])


    useEffect( ()=>{
          if(page===1){
            setRows(classes)
          }
          else{
            setRows(prev =>[...prev, ...classes])
          }
        },[classes]) 
    // const rows = useMemo(() => {
      
    //   return classes || [];
    // }, [classes]);

    useEffect(() => {
      const fetchAcademicYearClass = async() =>{
        await dispatch(FetchAcademicYearClass ({userId: "I1132"}))
      }
      fetchAcademicYearClass();
    }, []);



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
            <Select label="Chọn khóa" onChange={(e)=>handleChangeAcedemicYear(e.target.value)}>
                <MenuItem value="">Tất cả</MenuItem>
                {
                  academicYear.map((item,index)=>{
                    return (<MenuItem value={item} key={index}>{item}</MenuItem>)
                  })
                }
                
            </Select>
            </FormControl>


            <FormControl style={{ minWidth: "200px" }} variant="outlined">
            <InputLabel>Kỳ</InputLabel>
            <Select label="Chọn kỳ" onChange={(e)=>handleChangeSemester(e.target.value)}>
                <MenuItem value="">Tất cả</MenuItem>
                {
                  semester.map((item,index)=>{
                    return (<MenuItem value={item} key={index}>{item}</MenuItem>)
                  })
                }

            </Select>
            </FormControl>

          </LearningOutComeItemsContainer>


        </LearningOutComeHeader>


        <LineDivider></LineDivider>

         
            <ClassListLNO TableHeader={ClassTableHeader} TableContent ={rows} setClassID={setClassID} onScrollEnd={handleScrollEnd}></ClassListLNO>
         
        

       </LearningOutComeContainerBody>
      </LearningOutcomesContainer>
    );
  };
  
  export default LearningOutcome;