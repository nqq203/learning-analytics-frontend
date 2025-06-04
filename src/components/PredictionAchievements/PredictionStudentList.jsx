import { useEffect, useState } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox
} from "@mui/material";
import { TableWrapper } from "../Analytics/Styles/Styles";
import VisibilityIcon from "@mui/icons-material/Visibility";

const PredictionStudentList = ({
  filteredRows,
  columns,
  handleActions,
  setChosenStudentOuter,
  setModal,
  setStudentModal,
  action = true,
}) => {



  const cellStyle = {
    fontSize: "16px",
  };

  const headerCellStyle = {
    ...cellStyle,
    fontWeight: "700",
  };
  const renderCell = (value) => {
    return value !== null && value !== undefined && value !== "" ? value : "--";
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
        if(studentChosen.length == filteredRows.length){
            setStudentChosen([])
            setChosenStudentOuter([])
        }
        else{
            setStudentChosen(filteredRows)
            setChosenStudentOuter(filteredRows)
        }
    }

    const handleClick = (item)=>
    {
        setStudentModal(item)
        setModal(true);
    }
    
  return (
    <TableWrapper className="scroll-view">
      <TableContainer
        component={Paper}
        className="TableContainer"
        style={{ maxHeight: "550px", overflow: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ ...headerCellStyle, textAlign: "center" }}>
                STT
              </TableCell>
              {columns.map((col, index) => (
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
                <>
                <TableCell style={{ ...headerCellStyle, textAlign: "center" }}>
                  Chi tiết
                </TableCell>
                
                <TableCell style={{ ...headerCellStyle, textAlign: "center" }}>
                  <Checkbox
                  onChange={ ()=>handleCheckAll()} 
                    checked={(studentChosen.length === filteredRows.length)}
                  ></Checkbox>
                </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows?.length > 0 ? (
              filteredRows.map((row, index) => (
                <TableRow key={row.classId || index}>
                  <TableCell style={{ ...cellStyle, textAlign: "center" }}>
                    {index + 1}
                  </TableCell>

                  {columns.map((col, idx) => (
                    <TableCell
                      key={idx}
                      style={{ ...cellStyle, textAlign: col.align || "center" }}
                    >
                      {renderCell(row[col.id])}
                    </TableCell>
                  ))}

                  {action && (
                    <>
                    <TableCell style={{ ...cellStyle, textAlign: "center" }}>
                      <VisibilityIcon
                        color="primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick(row)}
                      />
                    </TableCell>

                    <TableCell style={{ ...cellStyle, textAlign: "center" }}>
                        <Checkbox 
                        onChange={ ()=>handleCheck(row)} 
                        checked={studentChosen.some((s) => s.ID === row.ID)}
                        ></Checkbox>
                    </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (action ? 2 : 1)}
                  style={{ ...cellStyle, padding: "20px", textAlign: "center" }}
                >
                  Chưa có dữ liệu để hiển thị
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

export default PredictionStudentList;
