import React, { Fragment } from "react";
import {
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FacultyTable({ rows }) {
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

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
            <Table stickyHeader size="small" sx={{ tableLayout: "fixed", minWidth: "100%" }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={headerCellStyle}>ID</TableCell>
                        <TableCell style={headerCellStyle}>Tên khoa</TableCell>
                        <TableCell style={headerCellStyle}>Hành Động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.length > 0 ?
                        <Fragment>
                            {rows.map((r) => (
                                <TableRow key={r.facultyId}>
                                    <TableCell style={{ textAlign: "center" }}>{r.facultyId}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{r.facultyName}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <IconButton onClick={(e) => handleMenuOpen(e, r.facultyId)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={menuRowId === r.facultyId}
                                            onClose={handleMenuClose}
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                                        >
                                            <MenuItem onClick={() => { handleEdit(r.facultyId); handleMenuClose(); }}>
                                                <ListItemIcon><EditIcon color="primary" fontSize="small" /></ListItemIcon>
                                                <ListItemText>Chỉnh sửa</ListItemText>
                                            </MenuItem>
                                            <MenuItem onClick={() => { handleDelete(r.facultyId); handleMenuClose(); }}>
                                                <ListItemIcon><DeleteIcon color="error" fontSize="small" /></ListItemIcon>
                                                <ListItemText>Xóa</ListItemText>
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Fragment> :
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                style={{ ...cellStyle, padding: "20px" }}
                            >
                                Chưa có dữ liệu để hiển thị
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
