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
  onLoadMore,
  mode,
  action = true
}) => {
  const containerRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleMenuOpen = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
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
                      <IconButton onClick={(e) => handleMenuOpen(e, row.ExamId)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open && menuRowId === row.ExamId}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                      >
                        <MenuItem onClick={() => { handleEdit(row.ExamId,mode); handleMenuClose(); }}>
                          <ListItemIcon><EditIcon color="primary" fontSize="small" /></ListItemIcon>
                          <ListItemText>Chỉnh sửa</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => { handleDelete(row.ExamId, mode); handleMenuClose(); }}>
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
