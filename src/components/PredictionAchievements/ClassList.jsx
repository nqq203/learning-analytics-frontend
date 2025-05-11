import { Card, CardContent, IconButton, Checkbox, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "styled-components";
const TableContainer = styled.div`
    
    background-color: white;
    
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    height:600px;
    overflow-y:auto;
`


const ClassList = ({TableHeader,TableContent,setClassID})=>{
    const handleClick = (id) =>{

        setClassID(id)
    } 

    return(
        <>
            
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
                            {
                                TableContent.length>0?
                                TableContent.map((item, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{index+1}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.className}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.academicYear}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.programName}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.facultyName}</td>
                                    <td style={{ textAlign: "center",padding: "1rem" }}>{item.majorName}</td>
                                    
                                    
                                    <td style={{ textAlign: "center",padding: "1rem" }}>
                                        <IconButton onClick={()=>handleClick(item.id) }
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
            




    
        </>
        
    )
}

export default ClassList;