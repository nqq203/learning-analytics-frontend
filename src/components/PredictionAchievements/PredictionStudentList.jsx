import { Card, CardContent, IconButton, Checkbox, Button, Tab } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "styled-components";
import { useState,useEffect } from "react";

const TableContainer = styled.div`
    margin-top:1rem;
    background-color: white;
    
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    height:600px;
    overflow-y:auto;
`
const TitleStudentList = styled.div`
    margin-top:1rem;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    width:97%;
    align-items:center;

`
const PredictionStudentList = ({TableHeader,TableContent,setChosenStudentOuter,setModal,setStudentModal}) =>{
    
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
    

    const handleClick = (item)=>
    {
        setStudentModal(item)
        setModal(true);
    }

    useEffect(()=>{
        console.log('STUDENT CHOSEN: ',studentChosen);
    },[studentChosen])

    return(
        <>
            
                <TitleStudentList> 
                    <div style={{fontSize:"1.5rem",fontWeight:"bold"}}>Danh sách sinh viên</div>

                    <div style={{display:"flex", flexDirection:"row",alignItems:"center"}} >

                        <div style={{fontSize:"1.2rem",fontWeight:"bold"}}>Chọn tất cả :</div>
                        <Checkbox 
                            onChange={handleCheckAll}
                            checked={studentChosen.length === TableContent.length}
                        > </Checkbox>
                    </div>
                </TitleStudentList>
            

            <TableContainer style={{
                maxHeight: "650px",
                overflow: "auto",
            }}>
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
                            {TableContent.map((item, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                                    
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.MSSV}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.Name}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.Class}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.Subject}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.ClassOf}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.PredictAchivement}</td>

                                    <td style={{ textAlign: "center",padding: "1rem" }}>
                                        <IconButton 
                                        onClick={()=> handleClick(item) }
                                        style={{zIndex: 10 }}
                                        >
                                            <VisibilityIcon style={{zIndex: 10 }} color="primary" />
                                        </IconButton>
                                    </td>

                                    <td style={{ textAlign: "center",padding: "1rem" }}>
                                        <Checkbox 
                                            key={index} onChange={ ()=>handleCheck(item)} 
                                            checked={studentChosen.some((s) => s.ID === item.ID)}
                                        ></Checkbox>
                                    </td>

                                    
                                
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TableContainer>
        
        
        </>
    )
}

export default PredictionStudentList;