import FilterBoard from "./FilterBoard";
import { 
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, 
    IconButton, 
    Checkbox, 
    Button 
} from "@mui/material";
import { TableWrapper } from "../Analytics/Styles/Styles";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect,useState } from "react";


export default function ClassListLNO({TableHeader,TableContent,setClassID,onScrollEnd, action = true, loading}){
    const [isFetching, setIsFetching] = useState(false);


    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

        if (isAtBottom && !isFetching && !loading) {
        setIsFetching(true);
        onScrollEnd();
        }
    };

    useEffect(() => {
        // khi dữ liệu mới được add, reset flag
        if (!loading) {
        setIsFetching(false);
        }
    }, [TableContent, loading]);


    const cellStyle = {
        fontSize: "16px",
    };
    const headerCellStyle = {
        ...cellStyle,
        fontWeight: "700",
    };
    const handleClick=(Classid, className, courseName)=>{
        setClassID({ classId: Classid, className, courseName });
    }
    const renderCell = (value) => {
        return value !== null && value !== undefined && value !== "" ? value : "--";
    };
    return(
        <>
            <TableWrapper className="scroll-view">
              <TableContainer
              
              component={Paper}
              className="TableContainer"
              onScroll={handleScroll}
              style={{
                maxHeight: "550px",
                overflow: "auto"}}

                
                >
                    <Table stickyHeader>

                        <TableHead>
                            <TableRow>
                                <TableCell style={{ ...headerCellStyle, textAlign: "center" }}>
                                STT
                                </TableCell>

                                {TableHeader.map((col, index) => (
                                    <TableCell
                                    key={index}
                                    style={{
                                        ...headerCellStyle,
                                        textAlign: col.align || "center",
                                    }}
                                    >
                                    {col.label}
                                    </TableCell>
                                ))}
                                {action && (
                                    <TableCell style={{ ...headerCellStyle, textAlign: "center" }}>
                                    Chi tiết
                                    </TableCell>
                                )}

                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {
                                TableContent.length>0?
                                TableContent.map((row, index) => (
                                <TableRow key={index} >
                                    <TableCell style={{ ...cellStyle, textAlign: "center" }}>
                                        {index + 1}
                                    </TableCell>
                                    
                                    {TableHeader.map((col, idx) => (
                                        <TableCell
                                        key={idx}
                                        style={{ ...cellStyle, textAlign: col.align || "center" }}
                                        >
                                        {renderCell(row[col.id])}
                                        </TableCell>
                                    ))}
                                     {action && 
                                     (
                                        <TableCell style={{ ...cellStyle, textAlign: "center" }}>
                                            <VisibilityIcon
                                            color="primary"
                                            style={{ cursor: "pointer" }}
                                            onClick={()=>handleClick(row.id, row.className, row.courseName) }
                                            />
                                               
                                        </TableCell>
                                
                                    )}
                                </TableRow>
                                ))  
                                :
                                <TableRow style={{ borderBottom: "1px solid #eee" }}>
                                <TableCell 
                                    colSpan={TableHeader.length + (action ? 2 : 1)}
                                    style={{ ...cellStyle, padding: "20px", textAlign: "center" }}
                                >
                                    Chưa có dữ liệu để hiển thị
                                    </TableCell>
                                </TableRow>
                            
                            
                            }
                        </TableBody>
                    

                    </Table>
                </TableContainer>
                </TableWrapper>
                      
                    
        
        
        
        </>
    )



}