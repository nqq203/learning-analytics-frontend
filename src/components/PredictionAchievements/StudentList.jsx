import { Card, CardContent, IconButton, Checkbox, Button, Tab } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "styled-components";
import { useState,useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableWrapper } from "../Analytics/Styles/Styles";
const TitleStudentList = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    width:95%;
    align-items:center;

`


const StudentList = ({TableHeader,TableContent,setChosenStudentOuter}) =>{
    const cellStyle = {
    fontSize: "16px",
  };

    const headerCellStyle = {
    ...cellStyle,
    fontWeight: "700",
  };

    const [studentChosen,setStudentChosen] = useState([])
    const handleCheck = (student) =>{
        
        setStudentChosen(

            (prev) =>{
                if (prev.some((s) => s.ID === student.ID) )
                {
                    setChosenStudentOuter(prev.filter ((s)=>s.ID !==student.ID) );
                    return prev.filter ((s)=>s.ID !==student.ID) 
                }
                else{
                    setChosenStudentOuter([...prev,student]);
                    return [...prev,student]
                }
            }

        )
    }

    
    const handleCheckAll = ()=>{
        if(studentChosen.length == TableContent.length){
            setStudentChosen([])
            setChosenStudentOuter([])
        }
        else{
            setStudentChosen(TableContent)
            setChosenStudentOuter(TableContent)
        }
    }
    

    useEffect(()=>{
        console.log(studentChosen);
    },[studentChosen])

    return(
        <>
            
                {/* <TitleStudentList> 
                    <div style={{fontSize:"1.5rem",fontWeight:"bold"}}></div>

                    <div style={{display:"flex", flexDirection:"row",alignItems:"center"}} >

                        <div style={{fontSize:"1.2rem",fontWeight:"bold"}}>Chọn tất cả :</div>
                        <Checkbox 
                            onChange={handleCheckAll}
                            checked={studentChosen.length === TableContent.length}
                        > </Checkbox>
                    </div>
                </TitleStudentList> */}
            
            <TableWrapper>

            <TableContainer  
                component={Paper}
                className="TableContainer"
                style={{ maxHeight: "550px", overflow: "auto" }}
                
            >
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                            
                            {
                                TableHeader.map((item,index)=>{
                                return <TableCell 
                                style={{ ...headerCellStyle, textAlign: "center" }} key={index}> {item}</TableCell>
                                })
                            }
                            <TableCell style={{ ...headerCellStyle, textAlign: "center" }} >

                                <Checkbox 
                            onChange={handleCheckAll}
                            checked={studentChosen.length === TableContent.length}
                        > </Checkbox>
                            </TableCell>
                            
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            
                            {TableContent.map((item, index) => (
                                <TableRow key={index} style={{ borderBottom: "1px solid #eee" }}>
                                    
                                    <TableCell style={{ ...cellStyle, textAlign: "center" }}>{item.MSSV}</TableCell>
                                    <TableCell style={{ ...cellStyle, textAlign: "center" }}>{item.Name}</TableCell>
                                    <TableCell style={{ ...cellStyle, textAlign: "center" }}>{item.Class}</TableCell>
                                    <TableCell style={{ ...cellStyle, textAlign: "center" }}>{item.Subject}</TableCell>
                                    <TableCell style={{ ...cellStyle, textAlign: "center" }}>{item.ClassOf}</TableCell>
                                    
                                    <TableCell style={{ ...cellStyle, textAlign: "center" }}>
                                        <Checkbox 
                                            key={index} onChange={ ()=>handleCheck(item)} 
                                            checked={studentChosen.some((s) => s.ID === item.ID)}
                                        ></Checkbox>
                                    </TableCell>
                                
                                </TableRow>
                            ))}
                            
                        </TableBody>
                    </Table>
                </TableContainer>

                </TableWrapper>
        
        
        </>
    )
}

export default StudentList;