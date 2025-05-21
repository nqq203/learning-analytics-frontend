import Button from "@/components/Button";
import { Search, Visibility, ArrowBack } from "@mui/icons-material";
import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

// sample data
const courseData = [
  { id: 1, subject: "Cơ sở dữ liệu", class: "21CLC05", term: "21" },
  { id: 2, subject: "Cơ sở dữ liệu", class: "21CLC07", term: "21" },
  { id: 3, subject: "Cơ sở dữ liệu", class: "22CLC01", term: "22" },
  { id: 4, subject: "Cơ sở dữ liệu", class: "22CLC03", term: "22" },
  { id: 5, subject: "Cơ sở dữ liệu nâng cao", class: "21HTT1", term: "21" },
  { id: 6, subject: "Cơ sở dữ liệu nâng cao", class: "22HTT1", term: "22" },
  { id: 7, subject: "Cơ sở dữ liệu nâng cao", class: "22HTT2", term: "22" },
  { id: 8, subject: "Cơ sở dữ liệu nâng cao", class: "23HTT2", term: "23" },
  { id: 9, subject: "An toàn bảo mật HTTT", class: "21HTTT", term: "21" },
  { id: 10, subject: "An toàn bảo mật HTTT", class: "21HTT2", term: "21" },
  { id: 11, subject: "Cơ sở dữ liệu", class: "24CLC01", term: "24" },
];

export default function StudentManagement() {
  const [term, setTerm] = useState("");
  const [semester, setSemester] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const router = useRouter();
  const handleViewDetail = () => {
    setShowDetail(true);
    router.push("/data-management/student-management/student-detail-view");
  };

  const handleBack = () => {
    setShowDetail(false);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          borderLeft: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex" }}>
                <TextField
                  placeholder="Tìm kiếm"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mr: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ marginRight: 0, paddingRight: 0 }}
                      >
                        <IconButton
                          // onClick={handleSearch}
                          sx={{
                            backgroundColor: "#1976D2",
                            borderRadius: "0 4px 4px 0",
                            padding: "10px",
                            height: "100%",
                            "&:hover": {
                              backgroundColor: "#1976D2",
                              marginRight: 0,
                            },
                          }}
                        >
                          <SearchIcon
                            sx={{ color: "white", fontSize: "20px" }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { paddingRight: 0 },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ minWidth: "auto" }}
                >
                  <Search />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="term-label">Khoá</InputLabel>
                <Select
                  labelId="term-label"
                  value={term}
                  label="Khoá"
                  onChange={(e) => setTerm(e.target.value)}
                >
                  <MenuItem value="21">21</MenuItem>
                  <MenuItem value="22">22</MenuItem>
                  <MenuItem value="23">23</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="semester-label">Kỳ</InputLabel>
                <Select
                  labelId="semester-label"
                  value={semester}
                  label="Kỳ"
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Paper sx={{ width: "95%", mx: "auto", mt: "20px" }}>
          <TableContainer
            component={Paper}
            sx={{
              flex: 1,
              mx: 2,
              borderRadius: 3,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0)",
              backgroundColor: "#ffffff",
              maxHeight: 500,
            }}
          >
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 650 }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Môn
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      textAlign: "center",
                    }}
                  >
                    Lớp
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      textAlign: "center",
                    }}
                  >
                    Khoá
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    Xem chi tiết
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {courseData.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { backgroundColor: "#f9f9f9" },
                      transition: "background-color 0.2s ease-in-out",
                    }}
                  >
                    <TableCell>{row.subject}</TableCell>
                    <TableCell align="center">{row.class}</TableCell>
                    <TableCell align="center">{row.term}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={handleViewDetail}>
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
}
