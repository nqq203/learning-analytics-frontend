import styled from "styled-components";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Button
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
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
  gap:2rem;
  background-color: white;
  width: 50%;
  padding-block: 1.5rem;
  padding-inline:1.5rem;
  padding-bottom:3rem;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  
  display:flex;
  flex-direction: column;
`;
const HeaderContainer = styled.div`
    
    width:100%;
    display:flex;
    flex-direction:column;
    gap:1rem;
    font-size:1.5rem;
    

`
const HeaderItemContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    


`

const LineDivider = styled.div`
     background-color: var(--grey-500);
    width:100%;  
    height:1px;
   

`

const BodyContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    padding-inline:2rem;
    margin-top:1.5rem;
    font-size:1.2rem;
    gap:1rem;

`
const BodyItem = styled.div`
    display:flex;
    flex-direction:column;
    gap:0.5rem;
`

const FileType = styled.div`
    display:flex;
    flex-direction:row;
    gap:1rem;
    align-items:center;
    justify-content:space-between;
    padding:0.5rem;
`

const TypeBtn = styled.div`
    cursor:pointer;
    border: 2px solid 
    ${(props) => (props.selected? "var(--blue-400)":"var(--grey-300)")};
    border-radius:2px;
    text-align:center;
    width:20%;
    padding-block:0.5rem;
    
    

`
const ImportFileContainer = styled.div`
    border: 1px solid var(--grey-400);
    border-radius:2px;
    background-color:white;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding-right:2rem;
    width:60%;
    gap:1rem;
`
const ImportFileInput = styled.input`
    display: none; 
`

const ImportFileLabel = styled.label`
    display: inline-block;
    padding-block:1rem;
    
    width:50%;
    text-align:center;
    background-color: var(--blue-700);
    color: white;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    &:hover{
          background-color: var(--blue-400);
    }

`



const FileName =styled.span`
    font-style: italic
`
const ButtonGroup = styled.div`
    padding-inline:2rem;
    margin-top:3rem;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;

`

const LabelInput = styled.div`
    font-weight:550;
    font-size:1.3rem;
    font-style:italic;
    color:var(--grey-900)

`


const typeFile = ["Type 1", "Type 2", "Type 3","Type 4"]
export default function ImportFileModal({setModal}){
    const [fileName, setFileName] = useState('Chưa có tệp nào');
    const [typeChosen,setTypeChosen] = useState(-1);
    const CloseModal=()=>{
        setModal(false);
    }
    const handleType =(index)=>{
        if(typeChosen===index){
            setTypeChosen(-1)
            return;
        }
        setTypeChosen(index)
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file ? file.name : 'Chưa có tệp nào');
     };
    return(
        <Backdrop onClick={()=>CloseModal()}>
            <ModalContainer onClick={(e) => e.stopPropagation()} >
                <HeaderContainer>
                        <HeaderItemContainer>
                                <div style={{fontSize:"1.8rem", fontWeight:"570",paddingLeft:"0.5rem", color:"var(--grey-800)"}}>Import file </div>
                                <IconButton  onClick={()=>CloseModal()}>
                                    <CloseIcon></CloseIcon>
                                </IconButton>
                                
                        
                        </HeaderItemContainer>
                        <LineDivider></LineDivider>
                </HeaderContainer>
                

                <BodyContainer>
                    <LabelInput > Chọn loại file muốn import: </LabelInput>
                    <BodyItem>
                        <FileType>
                            {typeFile.map((value,index)=>{

                                return <TypeBtn onClick={()=>handleType(index)}
                                                selected={typeChosen===index}>
                                            {value}
                                    </TypeBtn>

                            })}
                            
                        
                        </FileType>

                    </BodyItem>
                </BodyContainer>

                <BodyContainer>
                        <LabelInput> Nhập một file vào: </LabelInput>
                       <ImportFileContainer>

                            <ImportFileLabel htmlFor="file-upload">Chọn tệp</ImportFileLabel>
                            <ImportFileInput type="file" id="file-upload"  accept=".csv,.xlsx"  onChange={handleFileChange} /> 
                             <FileName>{fileName}</FileName>

                        </ImportFileContainer>
                </BodyContainer>
                        
                 <ButtonGroup>
                    <Button  
                        style={{ width: "45%", minWidth: 220 }} variant="outlined" 
                        size="large"
                        onClick={()=>CloseModal()}
                        >ĐÓNG</Button>
                        <Button 
                        style={{ width: "45%", minWidth: 220 }} 
                        variant="contained" 
                        size="large"
                        >NHẬP FILE</Button>
                </ButtonGroup>
               
            </ModalContainer>
        </Backdrop>
        
        
    )
}

