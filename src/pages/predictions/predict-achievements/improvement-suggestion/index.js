import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PredictionStudentList from "@/components/PredictionAchievements/PredictionStudentList";
import ModalSuggestion from "@/components/PredictionAchievements/ModalSuggestion";
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

    

    const handleNav = ()=>{
      if(chosenStudent.length===0){
        alert("Chọn ít nhất một sinh viên")
      }
      else{
        const encodedData = encodeURIComponent(JSON.stringify(chosenStudent));
        router.push(`/predictions/predict-achievements/send-noti?data=${encodedData}`);
        
      }
    }

    return (
      < LearningOutcomesContainer >


      <LearningOutComeContainerBody>
        <LearningOutComeHeader>
            


                <FormControl style={{ minWidth: "45rem" }} variant="outlined">
                        <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" />
                </FormControl>


                <FormControl style={{ minWidth: "13rem" }} variant="outlined">
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

                <FormControl style={{ minWidth: "13rem" }} variant="outlined">
                    <InputLabel>Khóa</InputLabel>
                    <Select  label="Chọn khóa">
                        <MenuItem value="class">21</MenuItem>
                        <MenuItem value="course">22</MenuItem>
                        <MenuItem value="subject">23</MenuItem>
                    </Select>
                </FormControl>
            

            

                <AnalyticsBtn>Lọc</AnalyticsBtn>

                <AnalyticsBtn onClick= {()=>handleNav()}>Gợi ý cải thiện</AnalyticsBtn>


            


        </LearningOutComeHeader>


        <LineDivider></LineDivider> 

          <PredictionStudentList TableHeader = {TableHeader} TableContent ={TableContent} setChosenStudentOuter={setChosenStudent} setModal={setModal} setStudentModal={setStudentModal}> </PredictionStudentList>


          {modalOpen?
            <ModalSuggestion 
                          studentID={"124"} 
                          student = {studentModal}
                          setModal={setModal} 
                          
                      />:
              <></>
          }

       </LearningOutComeContainerBody>


      </LearningOutcomesContainer>
    );
  };
  
  export default ImprovementSuggestion;