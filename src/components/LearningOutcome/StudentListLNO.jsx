import FilterBoard from "./FilterBoard";
import { Card, CardContent, IconButton, Checkbox, Button, Tab } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "styled-components";
import { useState, useEffect } from "react";
const LearningOutcomeBody = styled.div`
  display:flex;
  flex-direction: column;
  gap:1rem;
  
`

const TableContainer = styled.div`
    
    background: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    height:600px;
    overflow-y:auto;
`
const NoContent = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
    align-items:center;
    font-size:1.5rem;
    font-weight:bold;


`





export default function StudentListLNO({TableContent,TableHeader,subjectID,setStudentID}){


    return(
        <>
            <LearningOutcomeBody>
            
            
                      <div className="LearningOutComeTabFilterBody-Container">
                        <FilterBoard></FilterBoard>
                      </div>
            
                      <TableContainer style={{
                maxHeight: "650px",
                overflow: "auto"}}>
                    <table style={{ width: "100%", borderCollapse: "collapse",backgroundColor: "white" }}>
                        <thead  style={{
                            position: "sticky", 
                            top:0,
                            zIndex: 1000, 
                            backgroundColor: "white",
                            textAlign: "center",
                            boxShadow: "0px 2px 2px -1px #ddd"
                            
                        }}>
                            <tr >
                            {
                                TableHeader.map((item,index)=>{
                                return <th 
                                style={{
                                    position: "sticky", 
                                    top:0,
                                    zIndex: 1000, 
                                    paddingBlock:"1.4rem",
                                    backgroundColor: "white",
                                    textAlign: "center",
                                    
                                } } key={index}> {item}</th>
                                })
                            }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                TableContent.length>0?
                                TableContent.map((item, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{index+1}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.MSSV}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.Name}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.Class}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.Subject}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.ClassOf}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.PredictAchivement}</td>
                                    
                                    
                                    <td style={{ textAlign: "center",padding: "1rem" }}>
                                        <IconButton onClick={()=>setStudentID(item.ID) }
                                        style={{zIndex: 10 }}>
                                            <VisibilityIcon style={{zIndex: 10 }} color="primary" />
                                        </IconButton>
                                    </td>
                                
                                </tr>
                                ))  
                                :
                                <tr style={{ borderBottom: "1px solid #eee" }}>
                                <td colspan="7"
                                    style={{textAlign:"center",fontSize:"1.5rem",fontWeight:"bold",padding:"1.5rem"}}
                                >
                                    Không có dữ liệu</td>
                                </tr>
                            
                            
                            }
                        </tbody>
                    </table>
                </TableContainer>
                      
                    </LearningOutcomeBody>
        
        
        
        </>
    )



}