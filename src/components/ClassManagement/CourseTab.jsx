import React, { Fragment, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CourseTab({ rows, handleEdit, handleDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e, id) => {
    setAnchorEl(e.currentTarget);
    setMenuRowId(id);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  const cellStyle = { fontSize: "16px", textAlign: "center" };
  const headerCellStyle = { ...cellStyle, fontWeight: 700 };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
      <Table
        stickyHeader
        size="small"
        sx={{ tableLayout: "fixed", minWidth: "100%" }}
      >
        <TableHead>
          <TableRow>
            <TableCell style={headerCellStyle}>ID</TableCell>
            <TableCell style={headerCellStyle}>Mã khóa</TableCell>
            <TableCell style={headerCellStyle}>Tên khóa</TableCell>
            <TableCell style={headerCellStyle}>Tín chỉ</TableCell>
            <TableCell style={headerCellStyle}>Loại khóa</TableCell>
            <TableCell style={headerCellStyle}>Thời gian tạo</TableCell>
            <TableCell style={headerCellStyle}>Lần cuối cập nhật</TableCell>
            <TableCell style={headerCellStyle}>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length > 0 ? (
            <Fragment>
              {rows.map((r) => (
                <TableRow key={r.courseId}>
                  <TableCell style={cellStyle}>{r.courseId || "--"}</TableCell>
                  <TableCell style={cellStyle}>{r.courseCode || "--"}</TableCell>
                  <TableCell style={cellStyle}>{r.courseName || "--"}</TableCell>
                  <TableCell style={cellStyle}>{r.credit || "--"}</TableCell>
                  <TableCell style={cellStyle}>{r.courseType || "--"}</TableCell>
                  <TableCell style={cellStyle}>{r.createdDate || "--"}</TableCell>
                  <TableCell style={cellStyle}>{r.updatedDate || "--"}</TableCell>
                  <TableCell style={cellStyle}>
                    <IconButton onClick={(e) => handleMenuOpen(e, r.courseId)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={open && menuRowId === r.courseId}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleEdit(r.courseId);
                          handleMenuClose();
                        }}
                      >
                        <ListItemIcon>
                          <EditIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Chỉnh sửa</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleDelete(r.courseId);
                          handleMenuClose();
                        }}
                      >
                        <ListItemIcon>
                          <DeleteIcon color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Xóa</ListItemText>
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          ) : (
            <TableRow>
              <TableCell colSpan={8} style={{ ...cellStyle, padding: 20 }}>
                Chưa có dữ liệu để hiển thị
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
