import styled from "styled-components";
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
  Divider
} from "@mui/material";


import { useState } from "react";
import { Close } from "@mui/icons-material";


const ModalContainer = styled.div`
  background-color: white;
  width: 100%;
  padding: 1.5rem;
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
    
    font-size:1rem;
    font-style:italic;
    color:var(--grey-900)

`


const typeFile = ["Type 1", "Type 2", "Type 3","Type 4"]
export default function ImportFileModal({Modal,setModal}){
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
        <Dialog open={Modal} onClose={CloseModal} fullWidth maxWidth="md">
            <DialogTitle
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      pb: 1,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                      Thêm Dữ Liệu Bằng File
                    </Typography>
                    <IconButton onClick={CloseModal} aria-label="close">
                      <Close />
                    </IconButton>
            </DialogTitle>

            <Divider style={{marginBottom:"1rem"}} />

            <DialogContent sx={{ p: 0 }} style={{paddingBottom:"1.5rem"}}>
                

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
               
            </DialogContent>
            </Dialog>
        
        
        
    )
}

