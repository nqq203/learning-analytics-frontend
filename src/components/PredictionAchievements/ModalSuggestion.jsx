import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Grid,
  Divider,
} from "@mui/material";


const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Làm mờ nền */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  gap:1rem;
  background-color: white;
  width: 100%;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  
  display:flex;
  flex-direction: column;
`;

const ModalInfo =styled.div`
  
  display:flex;
  flex-direction:column;
  font-weight:bold;
  width:100%;
  gap:0.5rem;
  
`
const ModalInfoText=styled.div`
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  // padding-top:0.7rem;

`

const LineDivider = styled.div`
  border:0.1px solid gray;
  width:100%;
`


const AdviceContainer = styled.div`
  padding-inline:0.5rem;
  border-radius:5px;
  width:100%;
  background-color:var(--blue-50);
  display:flex;
  padding-block:2rem;
  justify-content:center;
  flex-direction:column;
  
`

const WarningContainer = styled.div`
  padding-inline:0.5rem;
  border-radius:5px;
  width:100%;
  background-color:var(--pink-200);
  display:flex;
  padding-block:2rem;
  justify-content:center;
  flex-direction:column;

`

const InputSuggest = styled.input`
  width:100%;
  height:100px;
  padding: 0px 12px 60px 12px;
`
const BtnGroup = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
`
const SendNotiBtn = styled.div`
    padding-block:0.7rem;
    width:45%;
    text-align:center;
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
const CancelBtn = styled.div`
  padding-block:0.7rem;
    width:45%;
    text-align:center;
    color:white;
    font-size:1.2rem;
    background-color:white;
    color:var(--blue-600);
    border:1.5px solid var(--blue-600);
    
    border-radius:10px;
    font-weight:bold;

    &:hover{
        border:1.5px solid white;
        color:white;
        background-color:var(--blue-500);
    }
    &:active{
        border:1.5px solid white;
        color:white;
        background-color:var(--blue-600);
    }
`
const ModalSuggestion = ({ open, onClose,studentID,setModal,student }) => {
  const router= useRouter();
  const [student_1,setStudent] = useState([])
  useEffect(()=>{
    setStudent({
      "ID":"4","MSSV":"21125435","Name": "Nguyễn Văn C","Class":"21CLC10","Subject":"Cơ sở dữ liệu nâng cao","ClassOf":"2021","PredictAchivement":"E (Yếu)","PredictTarget":" C (Khá)"
    })


  },[router.query.data])
  const CloseModal = ()=>{

    setModal(false)
  }
  return (
    
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth >
        <ModalContainer>
        <div style={{color:"var(--grey-700)", fontSize:"1.8rem",fontWeight:"bold"}}>CHI TIẾT GỢI Ý</div>
        <ModalInfo>

            <ModalInfoText>
              <div>MSSV:</div>
              <div>{student.MSSV}</div>
            </ModalInfoText>

            <LineDivider></LineDivider>

            <ModalInfoText>
              <div>Họ và tên:</div>
              <div>{student.Name}</div>
            </ModalInfoText>

            <LineDivider></LineDivider>


            <ModalInfoText>
              <div>Lớp:</div>
              <div>{student.Class}</div>
            </ModalInfoText>

            <LineDivider></LineDivider> 

            <ModalInfoText>
              <div>Xếp loại dự đoán hiện tại:</div>
              <div> E {"(Yếu)"}
                {/* {student_1.PredictAchivement} */}
                </div>
            </ModalInfoText>

            <LineDivider></LineDivider> 

            <ModalInfoText>
              <div>Xếp loại mục tiêu:</div>
              <div> C {"(Khá)"}
                {/* {student_1.PredictTarget} */}
                </div>
            </ModalInfoText>

            <LineDivider></LineDivider> 

            

        </ModalInfo>


            <ModalInfoText style={{fontWeight:"bold"}}>
              Gợi ý:
            </ModalInfoText>


            <AdviceContainer>
            
            <div style={{fontWeight:"bold"}}>
              <span> &#8226; </span>
              Bạn cần đạt tối thiểu 8.5/10 cho bài cuối kỳ (trọng số 50%)
            </div>
            
            <div style={{fontWeight:"bold"}}>
              <span> &#8226; </span>
              Bài tập nhóm (trọng số 10%) cần nộp đủ để {">"}= 8/10
            </div>
             
            </AdviceContainer>

            <WarningContainer>

            <div style={{fontWeight:"bold"}}>
              <span> &#8226; </span>
              Bạn cần đạt tối thiểu 8.5/10 cho bài cuối kỳ (trọng số 50%)
            </div>
              
            <div style={{fontWeight:"bold"}}>
              <span> &#8226; </span>
              Bài tập nhóm (trọng số 10%) cần nộp đủ để {">"}= 8/10
            </div>

            </WarningContainer>

            <ModalInfoText style={{fontWeight:"bold"}}>
              Bạn có thể nhập thêm gợi ý ở khung phía duới:
            </ModalInfoText>
           

            <InputSuggest placeholder="Ghi chú thêm"></InputSuggest>


            <BtnGroup>
              <CancelBtn onClick={()=>CloseModal()} >ĐÓNG</CancelBtn>
              <SendNotiBtn>GỬI THÔNG BÁO</SendNotiBtn>
            </BtnGroup>

        </ModalContainer>
      </Dialog>
    
  );
};

export default ModalSuggestion;