import React, { useEffect, useRef } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TableWrapper } from '../Analytics/Styles/Styles';

export default function ClassViewTable({
    filteredRows,
    columns,
    onView,      // callback: (classId) => void
    onLoadMore,  // optional infinite scroll
}) {
    const containerRef = useRef();

    // scroll listener để load thêm
    useEffect(() => {
        const el = containerRef.current;
        if (!el || !onLoadMore) return;
        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                onLoadMore();
            }
        };
        el.addEventListener('scroll', onScroll);
        return () => el.removeEventListener('scroll', onScroll);
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
                ref={containerRef}
                style={{ maxHeight: 550, overflow: 'auto' }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={headerCellStyle}>STT</TableCell>
                            {columns.map(col => (
                                <TableCell key={col.id} style={headerCellStyle}>
                                    {col.label}
                                </TableCell>
                            ))}
                            <TableCell style={headerCellStyle}>Xem</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows?.length > 0 ? (
                            filteredRows.map((row, idx) => (
                                <TableRow hover key={row.classId || idx}>
                                    <TableCell style={cellStyle}>{idx + 1}</TableCell>
                                    {columns.map(col => (
                                        <TableCell key={col.id} align={col.align || 'left'}>
                                            {row[col.id]}
                                        </TableCell>
                                    ))}
                                    <TableCell style={cellStyle}>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => onView(row.classId)}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + 2} align="center">
                                    Chưa có dữ liệu để hiển thị
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </TableWrapper>
    );
}
