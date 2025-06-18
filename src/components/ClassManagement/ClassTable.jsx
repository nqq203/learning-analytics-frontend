import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { TableWrapper } from "../Analytics/Styles/Styles";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fragment, useEffect, useRef, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const ClassTable = ({ filteredRows, columns, handleDelete, handleEdit, handleViewStudent, handleViewInformation, action = true, onLoadMore }) => {
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

  const cellStyle = {
    fontSize: "16px",
    textAlign: "center",
  };

  const headerCellStyle = {
    ...cellStyle,
    fontWeight: "700",
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

  return (
    <TableContainer
      ref={containerRef}
      component={Paper}
      className="TableContainer"
      style={{
        width: "100%",
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
              <TableCell style={headerCellStyle}>Hành Động</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows?.length > 0 ?
            <Fragment>{filteredRows?.map((row, index) => (
              <TableRow key={row.classId}>
                <TableCell style={{ textAlign: "center" }}>{index + 1}</TableCell>
                {columns.map((col, idx) => (
                  <TableCell key={idx} style={{ textAlign: "center" }}>
                    {row[col.id]}
                  </TableCell>
                ))}
                {action && (
                  <TableCell style={{ textAlign: "center" }}>
                    <IconButton onClick={(e) => handleMenuOpen(e, row.classId)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={menuRowId === row.classId}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                      <MenuItem onClick={() => { handleViewInformation(row.classId); handleMenuClose(); }}>
                        <ListItemIcon><VisibilityIcon color="primary" fontSize="small" /></ListItemIcon>
                        <ListItemText>Xem thông tin lớp</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => { handleViewStudent(row.classId); handleMenuClose(); }}>
                        <ListItemIcon><FormatListBulletedIcon color="primary" fontSize="small" /></ListItemIcon>
                        <ListItemText>Xem danh sách lớp</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => { handleEdit(row.classId); handleMenuClose(); }}>
                        <ListItemIcon><EditIcon color="primary" fontSize="small" /></ListItemIcon>
                        <ListItemText>Chỉnh sửa</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => { handleDelete(row.classId); handleMenuClose(); }}>
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
  );
};

export default ClassTable;
