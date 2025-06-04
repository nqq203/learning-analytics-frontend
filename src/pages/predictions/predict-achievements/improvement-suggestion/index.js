import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, FormControl, InputLabel, MenuItem, Select,InputAdornment,IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PredictionStudentList from "@/components/PredictionAchievements/PredictionStudentList";
import ModalSuggestion from "@/components/PredictionAchievements/ModalSuggestion";

import { toast } from "react-toastify";
import {
  ActionButton,
  Container,
  Header,
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
    padding-inline:2.5rem;
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


const columns = [
    { id: "MSSV", label: "MSSV", align: "center" },
    { id: "Name", label: "Họ tên", align: "center" },
    { id: "Class", label: "Lớp", align: "center" },
    { id: "Subject", label: "Môn", align: "center" },
    { id: "ClassOf", label: "Khóa", align: "center" },
    { id: "PredictAchivement", label: "Thành tích dự đoán", align: "center" }
  ];
const TableHeader = ["MSSV","Họ tên","Lớp","Môn","Khóa","Thành tích dự đoán" , "Chi tiết"];

const ImprovementSuggestion = () => {
    const userId = "12456";
    const [chosenStudent,setChosenStudent]  = useState([])
    const [studentModal,setStudentModal] = useState({})
    const router = useRouter();
    const [TableContent,setTableContent] = useState([])
    const [modalOpen,setModal] = useState(false)

    useEffect(() => {
      const { data } = router.query;
      const chosenStudents = data ? JSON.parse(decodeURIComponent(data)) : [];
      setChosenStudent(chosenStudents)
        if (router.query.data) {
          // setTableContent(JSON.parse(decodeURIComponent(router.query.data?.toString() || "[]")));

          setTableContent([
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
        )


        }
      }, [router.query.data]);

      
    useEffect(() => {
        // setTableContent()
    }, [TableContent]);

     const CloseModal = ()=>{

     setModal(false);
  }

    const handleNav = ()=>{
      if(chosenStudent.length===0){
        toast.warning("Chọn ít nhất một sinh viên")
      }
      else{
        const encodedData = encodeURIComponent(JSON.stringify(chosenStudent));
        router.push(`/predictions/predict-achievements/send-noti?data=${encodedData}`);
        
      }
    }

    return (
      < Container >


      
        <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            
        <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between", width: "100%" }}>

                
      <TextField
                    variant="outlined"
                    label="Tìm kiếm"
                    style={{ width: "45%", minWidth: 200 }}
                    size="small"
                    onChange={(e) => handleSearch(e.target.value)}
                    
                    InputProps={{
                      
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
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
               


                <FormControl  style={{ width: "10%", minWidth: 250 }}variant="outlined" size="small" >
                    <InputLabel>Xếp loại</InputLabel>
                    <Select  label="Chọn Xếp loại">
                        
                        <MenuItem value="course">Xuất sắc</MenuItem>
                        <MenuItem value="subject">Giỏi</MenuItem>
                        <MenuItem value="course">Khá</MenuItem>
                        <MenuItem value="class">Trung bình</MenuItem>
                        <MenuItem value="course">Yếu</MenuItem>
                        <MenuItem value="class">Kém</MenuItem>
                        
                    </Select>
                </FormControl>

                <FormControl  style={{ width: "10%", minWidth: 250 }}variant="outlined" size="small">
                    <InputLabel>Khóa</InputLabel>
                    <Select  label="Chọn khóa">
                        <MenuItem value="class">21</MenuItem>
                        <MenuItem value="course">22</MenuItem>
                        <MenuItem value="subject">23</MenuItem>
                    </Select>
                </FormControl>
            

            

                <ActionButton
                variant="contained"
                style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
                
                >Lọc</ActionButton>

                <ActionButton onClick= {()=>handleNav()}
                  variant="contained"
            style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
            >Gợi ý cải thiện</ActionButton>

        </div>

            


        </Header>


        

          <PredictionStudentList columns = {columns} filteredRows ={TableContent} setChosenStudentOuter={setChosenStudent} setModal={setModal} setStudentModal={setStudentModal}> </PredictionStudentList>


          {modalOpen?
            <ModalSuggestion 
                          open = {modalOpen}
                          CloseModal = {CloseModal}
                          studentID={"124"} 
                          student = {studentModal}
                          setModal={setModal} 
                          
                      />:
              <></>
          }


      </Container>
    );
  };
  
  export default ImprovementSuggestion;