import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, FormControl, InputLabel, MenuItem, Select,  IconButton,Button,
  Box,
  CircularProgress} from "@mui/material";
  import SearchIcon from '@mui/icons-material/Search';
import StudentList from "@/components/PredictionAchievements/StudentList";
import { toast } from "react-toastify";
import InputAdornment from '@mui/material/InputAdornment';

import {
  ActionButton,
  BodyWrapper,
  Container,
  Header,
  InformationItem,
  InformationWrapper,
} from "@/components/Analytics/Styles/Styles";


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



const TableHeader = ["MSSV", "Họ tên", "Lớp", "Môn", "Khóa"];
const TableContent = [{
  "MSSV": "21125434",
  "Name": "Nguyễn Văn A",
  "Class": "21CLC08",
  "Subject": "Cơ sở dữ liệu nâng cao",
  "ClassOf": "2021"
},
{
  "MSSV": "21125435",
  "Name": "Nguyễn Văn B",
  "Class": "21CLC09",
  "Subject": "Cơ sở dữ liệu nâng cao",
  "ClassOf": "2021"
},
{
  "MSSV": "21125435",
  "Name": "Nguyễn Văn C",
  "Class": "21CLC10",
  "Subject": "Cơ sở dữ liệu nâng cao",
  "ClassOf": "2021"
}
]

const SubjectStudentContainer = () => {
  const userId = "12456";

  const router = useRouter();
  // const { classID, subjectID } = router.query;
  const [chosenStudent, setChosenStudent] = useState([])

  // useEffect(() => {
  //   console.log( `CHOSEN: `,chosenStudent)
  // }, [chosenStudent]);

  const handleNav = () => {
    if (chosenStudent.length === 0) {
      toast.warning("Chọn ít nhất một sinh viên")
    }
    else {
      const encodedData = encodeURIComponent(JSON.stringify(chosenStudent));
      //router.push(`/predictions/predict-achievements/improvement-suggestion?data=${encodedData}`);
      //const encodedData = encodeURIComponent(JSON.stringify(chosenStudent));
      router.push(`/predictions/predict-achievements/send-noti?data=${encodedData}`);
    }
  }

  return (
    <Container>


      
        <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between", width: "100%" }}>

            <div style={{display:"flex", gap:"8px",alignItems: "center",width:"100%"}}>
            <FormControl style={{ width: "20%", minWidth: 250 }} size="small">
              <InputLabel>Khóa</InputLabel>
              <Select label="Chọn khóa">
                <MenuItem value="class">21</MenuItem>
                <MenuItem value="course">22</MenuItem>
                <MenuItem value="subject">23</MenuItem>
              </Select>
            </FormControl>


            <TextField
            variant="outlined"
            label="Tìm kiếm"
            // value={search}
            // onChange={handleSearchChange}
            style={{ width: "70%", minWidth: 200 }}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    // onClick={handleSearch}
                    sx={{
                      backgroundColor: "#1976D2",
                      borderRadius: "0 4px 4px 0",
                      padding: "10px",
                      height: "100%",
                      '&:hover': {
                        backgroundColor: "#1976d2",
                      },
                    }}
                  >
                    <SearchIcon sx={{ color: "white", fontSize: "20px" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              '& .MuiOutlinedInput-root': {
                paddingRight: 0,
              },
            }}
          />

          </div>
          
          <div style={{display:"flex", gap:"8px",alignItems: "center",width:"30%"}}>
            <ActionButton 
             style={{ width: "50%", fontWeight: "700", fontSize: "14px" }}  
              color="primary"
              variant="contained"
              >
                  Lọc
            </ActionButton>

            <ActionButton 
               style={{ width: "50%", fontWeight: "700", fontSize: "14px" }}
                color="primary"
                onClick={() => handleNav()}
                variant="contained"
                >Dự đoán
            </ActionButton>
            {/* <AnalyticsBtn onClick={() => handleNav()}>Dự đoán</AnalyticsBtn> */}

            </div>

          </div>


        </Header>


        

        <StudentList TableHeader={TableHeader} TableContent={TableContent} setChosenStudentOuter={setChosenStudent} > </StudentList>


     
    </Container>
  );
};

export default SubjectStudentContainer;