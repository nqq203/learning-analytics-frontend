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
  gap:4rem;
  background-color: white;
  width: 50%;
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
    align-items:center;
    justify-content:center;
    font-size:2.5rem;
    

`

const LineDivider = styled.div`
    background-color: var(--grey-600);
    width:40%;  
    height:1px;
   

`

const BodyContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    padding:2rem;

`
const BodyItem = styled.div`
    display:flex;
    flex-direction:column;
    gap:0.5rem;
`
const BodyInputItem = styled.div`
    display:flex;
    flex-direction:column;
    font-size:1.2rem;
    gap:0.2rem;
    font-weight:bold;   
`

const ButtonGroup = styled.div`
    margin:auto;
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:1rem;

`
export default function InsertModal({setModal}){
    const CloseModal=()=>{
        setModal(false);
    }
    return(
        <Backdrop onClick={()=>CloseModal()}>
            <ModalContainer onClick={(e) => e.stopPropagation()} >
                <HeaderContainer>
                        <div>Thêm Lớp Học</div>
                        <LineDivider></LineDivider>
                </HeaderContainer>
                

                <BodyContainer>
                    <BodyItem>
                        <BodyInputItem>
                           <div> Thông tin A: </div>
                             <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                style={{ width: "50%", minWidth: 320 }}
                                 size="small"
                                
                            />
                        </BodyInputItem>

                        <BodyInputItem>
                           <div> Thông tin B: </div>
                            <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                 style={{ width: "50%", minWidth: 320 }}
                                 size="small"
                            />
                        </BodyInputItem>

                        <BodyInputItem>
                           <div> Thông tin C: </div>
                           <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                style={{ width: "50%", minWidth: 320 }}
                                 size="small"
                            />
                        </BodyInputItem>

                        <BodyInputItem>
                           <div> Thông tin D: </div>
                            <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                style={{ width: "50%", minWidth: 320 }}
                                 size="small"
                            />
                        </BodyInputItem>
                    </BodyItem>


                    <BodyItem>
                        <BodyInputItem>
                           <div> Thông tin A: </div>
                             <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                style={{ width: "50%", minWidth: 320 }}
                                 size="small"
                                
                            />
                        </BodyInputItem>

                        <BodyInputItem>
                           <div> Thông tin B: </div>
                            <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                 style={{ width: "50%", minWidth: 320 }}
                                 size="small"
                            />
                        </BodyInputItem>

                        <BodyInputItem>
                           <div> Thông tin C: </div>
                           <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                style={{ width: "50%", minWidth: 320 }}
                                 size="small"
                            />
                        </BodyInputItem>

                        <BodyInputItem>
                           <div> Thông tin D: </div>
                            <TextField
                                id="outlined-secondary"
                                variant="outlined"
                                style={{ width: "50%", minWidth: 320 }}
                                 size="small"
                            />
                        </BodyInputItem>
                    </BodyItem>
                    
                    
                    
                      
                    

                </BodyContainer>
                <ButtonGroup>
                        <Button  
                        style={{ width: "50%", minWidth: 200 }} variant="outlined" 
                        size="large"
                        >Hủy Thêm Lớp</Button>
                        <Button 
                        style={{ width: "50%", minWidth: 200 }} 
                        variant="contained" 
                        size="large"
                        >THÊM LỚP</Button>
                    </ButtonGroup>
            </ModalContainer>
        </Backdrop>
        
        
    )
}

