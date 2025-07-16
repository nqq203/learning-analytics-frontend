import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { TableWrapper } from "../Analytics/Styles/Styles";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fragment, use } from "react";
import { useEffect, useMemo, useState, useRef } from "react";


const ExamQuizTable = ({
  filteredRows,
  columns,
  handleDelete,
  handleEdit,
  handleViewInformation,
  onLoadMore,
  type,
  action = true
}) => {
  const containerRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleMenuOpen = (event, row) => {
    
    setAnchorEl(event.currentTarget);
    setMenuRowId(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (nearBottom && onLoadMore) {
        onLoadMore();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [onLoadMore]);

  const handleDetail = (row)=>{
    console.log("row: ",row)
    // console.log("type: ",type)
    if(type==="Quiz"){
      handleViewInformation(row.quizId,"quiz");
    }
    else if (type ==="Assignment"){
      
      handleViewInformation(row.assignmentId,"assignment");
    }
    else if(type==="Cuối kỳ"){
      handleViewInformation(row.finalExamId,"final_exam");
    }
    else if(type==="Giữa Kỳ"){
      handleViewInformation(row.midtermId,"midterm_exam");
    }
  }

  const handleUpdateBefore = (row)=>{
    
    if(type==="Quiz"){
      handleEdit(row.quizId,"quiz");
    }
    else if (type ==="Assignment"){
      
      handleEdit(row.assignmentId,"assignment");
    }
    else if(type==="Cuối kỳ"){
      handleEdit(row.finalExamId,"final_exam");
    }
    else if(type==="Giữa Kỳ"){
      handleEdit(row.midtermId,"midterm_exam");
    }

  }

  const handleDeleteBefore= (row)=>{
      if(type==="Quiz"){
        handleDelete(row.quizId,"quiz")
    }
    else if (type ==="Assignment"){
      handleDelete(row.assignmentId,"assignment");
     
    }
    else if(type==="Cuối kỳ"){
      handleDelete(row.finalExamId,"final_exam");
    }
    else if(type==="Giữa kỳ"){
      handleDelete(row.midtermExamId,"midterm_exam");
    }
  }
  const cellStyle = {
    fontSize: "16px",
    textAlign: "center",
  };
  const headerCellStyle = {
    ...cellStyle,
    fontWeight: "700",
  };

  return (
    <TableWrapper>
      <TableContainer
        component={Paper}
        className="TableContainer"
        ref={containerRef}      // attach ref
        style={{
          maxHeight: "550px",
          overflow: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>STT</TableCell>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  style={{
                    ...headerCellStyle,
                    textAlign: "center",
                  }}
                >
                  {col?.label}
                </TableCell>
              ))}
              {action && (
                <TableCell style={headerCellStyle}>Hành động</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows?.length > 0 ?
              <Fragment>{filteredRows?.map((row, index) => (
                  <TableRow key={row.ExamId}>
                    <TableCell style={{ textAlign: "center" }}>{index + 1}</TableCell>
                    {columns.map((col, idx) => (
                      <TableCell key={idx} style={{ textAlign: "center" }}>
                        {row[col.id] || "--"}
                      </TableCell>
                    ))}
                    {action && (
                      <TableCell style={{ textAlign: "center" }}>
                        <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={open && menuRowId === row}
                          onClose={handleMenuClose}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >

                          <MenuItem onClick={()=>{
                            handleDetail(row);
                            handleMenuClose();
                          }} >
                            <ListItemIcon><VisibilityIcon color="primary" fontSize="small" /></ListItemIcon>
                            <ListItemText>Xem thông tin bài kiểm tra</ListItemText>
                          </MenuItem>

                          <MenuItem onClick={() => { 
                            handleUpdateBefore(row); 
                            handleMenuClose(); }}>
                            <ListItemIcon><EditIcon color="primary" fontSize="small" /></ListItemIcon>
                            <ListItemText>Chỉnh sửa</ListItemText>
                          </MenuItem>

                          <MenuItem onClick={() => { handleDeleteBefore(row); handleMenuClose(); }}>
                            <ListItemIcon><DeleteIcon color="error" fontSize="small" /></ListItemIcon>
                            <ListItemText>Xóa</ListItemText>
                          </MenuItem>


                        </Menu>
                      </TableCell>
                    )}
                  </TableRow>
              ))}</Fragment> :
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  style={{ ...cellStyle, padding: "20px" }}
                >
                  Chưa có dữ liệu để hiển thị
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

export default ExamQuizTable;
