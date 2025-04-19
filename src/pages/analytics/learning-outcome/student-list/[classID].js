import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentListLNO from "@/components/LearningOutcome/StudentListLNO";
import { useRouter } from "next/router";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchStudent,fetchStudentSearch } from "@/redux/thunk/learningoutcomeThunk";

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
  gap:2rem;
  
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



const TableHeader =  ["MSSV","Họ tên","Lớp","Môn","Khóa","Chuyên ngành","Kết Quả" ,"Hành Động"];

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
    const {studentsOverview} = useSelector(state=>state.learningoutcome);
    const dispatch = useDispatch();
    const [studentID,setStudentID] = useState("");
    const router = useRouter();
    const { classID } = router.query;
    const [amount,setAmount] = useState(10);
    const [page,setPage] = useState(1);
    const [searchKeyword,setSearchKeyword] = useState("");
    const [searchResult,setSearchResult] = useState("");

    const handleSearch = (value) =>{
      setSearchKeyword(value)

    }
    const handleSearchResult = (value) =>{
      setSearchResult(value);

    }
    useEffect( () =>{
        
        
          const fetchStudentRow = async() =>{
              await dispatch(fetchStudentSearch({userId: "I1132",classId:classID, page: 1, amount: amount,search:searchResult}))
          }
          fetchStudentRow();
        
          
    
        },[router])
    
    const rows = useMemo(() => {
      return studentsOverview || [];
    }, [studentsOverview]);

    useEffect( () =>{
        
        
      const fetchStudentRow = async() =>{
          await dispatch(fetchStudentSearch({userId: "I1132",classId:classID, page: 1, amount: 10,search:searchResult}))
      }
      fetchStudentRow();
    
      

    },[searchResult])
    
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
                    <LearningOutComeItemsContainer style={{ width: "100%" }}>
        
        
                        <FormControl style={{ width: "100%" }} variant="outlined">
                                <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" onChange={(e)=>handleSearch(e.target.value)} />
                        </FormControl>
        
                    </LearningOutComeItemsContainer>
        
                    <LearningOutComeItemsContainer style={{ width: "6%" }}>
        
                        <AnalyticsBtn onClick={()=>handleSearchResult(searchKeyword)}>Lọc</AnalyticsBtn>
                        
        
        
                    </LearningOutComeItemsContainer>
        
        
                </LearningOutComeHeader>


        <LineDivider></LineDivider>

          <StudentListLNO TableContent={rows} TableHeader={TableHeader} setStudentID={setStudentID}> </StudentListLNO>
        

       </LearningOutComeContainerBody>
      </LearningOutcomesContainer>
    );
  };
  
  export default StudentContainerLNO;