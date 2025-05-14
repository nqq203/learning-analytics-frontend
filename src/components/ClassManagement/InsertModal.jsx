import styled from "styled-components";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Button,
  Dialog
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
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
    flex-direction:row;
    justify-content:space-between;
    padding-inline:2rem;
    padding-block:3rem;

`
const BodyItem = styled.div`
    display:flex;
    flex-direction:column;
    gap:1.5rem;
`
const BodyInputItem = styled.div`
    display:flex;
    flex-direction:column;
    
    gap:0.2rem;
      
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
    font-size:1.1rem;
    font-style:italic;
    color:var(--grey-800)

`
export default function InsertModal({Modal,setModal,classId}){
    const CloseModal=()=>{
        setModal(false);
    }
    return(
        // <Backdrop onClick={()=>CloseModal()}>
        <Dialog open={Modal} onClose={CloseModal} fullWidth maxWidth="md">
            <ModalContainer onClick={(e) => e.stopPropagation()} >
                <HeaderContainer>
                        <HeaderItemContainer>
                                <div style={{fontSize:"1.8rem", fontWeight:"570",paddingLeft:"0.5rem", color:"var(--grey-800)"}}> Thêm Lớp Vào Môn </div>
                                <IconButton size="large" onClick={()=>CloseModal()}>
                                    <CloseIcon size="large"></CloseIcon>
                                </IconButton>
                                
                        
                        </HeaderItemContainer>


                        <LineDivider></LineDivider>
                </HeaderContainer>
                

                <BodyContainer>
                    <BodyItem>
                        <BodyInputItem>
                           <LabelInput> Thông tin A </LabelInput>
                             <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                style={{ width: "50%", minWidth: 340 }}
                                 size="small"
                                
                            />
                        </BodyInputItem>

                        <BodyInputItem>
                           <LabelInput> Thông tin B </LabelInput>
                            <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                 style={{ width: "50%", minWidth: 340 }}
                                 size="small"
                            />
                        </BodyInputItem>

                        <BodyInputItem>
                           <LabelInput> Thông tin C </LabelInput>
                           <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                style={{ width: "50%", minWidth: 340 }}
                                 size="small"
                            />
                        </BodyInputItem>

                        <BodyInputItem>
                           <LabelInput> Thông tin D </LabelInput>
                            <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                style={{ width: "50%", minWidth: 340 }}
                                 size="small"
                            />
                        </BodyInputItem>
                    </BodyItem>


                    <BodyItem>
                        <BodyInputItem>
                           <LabelInput> Thông tin A </LabelInput>
                             <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                style={{ width: "50%", minWidth: 340 }}
                                 size="small"
                                
                            />
                        </BodyInputItem>

                        <BodyInputItem>
                           <LabelInput> Thông tin B </LabelInput>
                            <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                
                                 style={{ width: "50%", minWidth: 340
                                  }}
                                 size="small"
                            />
                        </BodyInputItem>

                        <BodyInputItem>
                           <LabelInput> Thông tin C </LabelInput>
                           <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                style={{ width: "50%", minWidth: 340 }}
                                 size="small"
                            />
                        </BodyInputItem>

                        <BodyInputItem>
                           <LabelInput> Thông tin D </LabelInput>
                            <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                style={{ width: "50%", minWidth: 340 }}
                                 size="small"
                            />
                        </BodyInputItem>
                    </BodyItem>
                    
                    
                    
                      
                    

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
                        >Thêm Lớp</Button>
                </ButtonGroup>

            </ModalContainer>
        {/* </Backdrop> */}
        </Dialog>
        
        
    )
}

