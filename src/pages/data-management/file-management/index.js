import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Select,
  MenuItem,
  Grid,
  Divider,
  useMediaQuery,
  useTheme
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const fileData = [
  { name: "Điểm 1.csv", date: "01-02-2025", type: "Điểm quiz" },
  { name: "Điểm 1.csv", date: "01-02-2025", type: "Điểm giữa kỳ" },
  { name: "Điểm 1.csv", date: "01-02-2025", type: "Điểm giữa kỳ" },
  { name: "Điểm 1.csv", date: "01-02-2025", type: "Điểm giữa kỳ" },
  { name: "Điểm 1.xlsx", date: "01-02-2025", type: "Điểm giữa kỳ" },
  { name: "Điểm 1.xlsx", date: "01-02-2025", type: "Điểm giữa kỳ" },
  { name: "Điểm 1.xlsx", date: "01-02-2025", type: "Điểm cuối kỳ" },
  { name: "Điểm 1.xlsx", date: "01-02-2025", type: "Điểm cuối kỳ" }
];

const FileManagement = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // <600px

  return (
    <Box p={isSmallScreen ? 2 : 4}>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm="auto">
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            fullWidth={isSmallScreen}
            sx={{ textTransform: "none" }}
          >
            Tải file
          </Button>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Select
            size="small"
            fullWidth={isSmallScreen}
            defaultValue="newest"
            sx={{ minWidth: isSmallScreen ? "100%" : 120 }}
          >
            <MenuItem value="newest">Mới nhất</MenuItem>
            <MenuItem value="oldest">Cũ nhất</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Divider
        sx={{
          my: 2,              
          borderBottomWidth: 1.5, 
          borderColor: '#ccc'   
        }}
      />

      <Box sx={{ overflowX: "auto" }}>
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 16 }}><strong>File đã tải</strong></TableCell>
                <TableCell sx={{ fontSize: 16 }}><strong>Ngày tải file lên</strong></TableCell>
                <TableCell sx={{ fontSize: 16 }}><strong>Loại file</strong></TableCell>
                <TableCell sx={{ fontSize: 16 }}><strong>Tải file</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fileData.map((file, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: 15 }}>{file.name}</TableCell>
                  <TableCell sx={{ fontSize: 15 }}>{file.date}</TableCell>
                  <TableCell sx={{ fontSize: 15 }}>{file.type}</TableCell>
                  <TableCell>
                    <IconButton sx={{ color: "#1976d2" }}>
                      <CloudDownloadIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default FileManagement;
