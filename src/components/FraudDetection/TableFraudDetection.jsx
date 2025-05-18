import styled from "styled-components";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton

} from "@mui/material";
export function TableFraudDetection({data}){


    return(
        <>
            <TableContainer component={Paper} sx={{ width: "100%", maxWidth: "100%" }}>
                  <Table sx={{ width: "100%", fontSize: "16px", '& td, & th': { textAlign: 'center', fontSize: '16px' } }}>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>MSSV</strong></TableCell>
                          <TableCell><strong>Tên</strong></TableCell>
                          <TableCell><strong>Điểm</strong></TableCell>
                          <TableCell><strong>Thời gian làm</strong></TableCell>
                          <TableCell><strong>Độ lệch cao</strong></TableCell>
                          <TableCell><strong>Độ lệch thấp</strong></TableCell>
                          <TableCell><strong>Lý do</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.studentId}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.score}</TableCell>
                            <TableCell>{row.duration}</TableCell>
                            <TableCell>{row.deviationHigh}</TableCell>
                            <TableCell>{row.deviationLow}</TableCell>
                            <TableCell>{row.reason}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
        </>
    )
}