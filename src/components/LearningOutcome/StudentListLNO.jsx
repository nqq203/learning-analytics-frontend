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
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { TableWrapper } from "../Analytics/Styles/Styles";






export default function StudentListLNO({ TableContent, TableHeader, setStudentID, onScrollEnd, action = true, loading }) {
    const [isFetching, setIsFetching] = useState(false);


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

    return (
        <>
            <TableWrapper
                className="scroll-view">
                <TableContainer
                    onScroll={handleScroll}
                    component={Paper}
                    className="TableContainer"
                    style={{
                        maxHeight: "550px",
                        overflow: "auto"
                    }}


                >
                    <Table stickyHeader>
                        <TableHead >
                            <TableRow >
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
                                TableContent.length > 0 ?
                                    TableContent.map((row, index) => (
                                        <TableRow key={index} style={{ borderBottom: "1px solid #eee" }}>
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

                                                            onClick={() => setStudentID(row.studentId)}

                                                        >

                                                        </VisibilityIcon>
                                                    </TableCell>
                                                )

                                            }


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