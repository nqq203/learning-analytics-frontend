import { useState } from "react";
import { Card, CardContent } from "@mui/material";
import {  IconButton, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const classData = [
  { subject: "Cơ sở dữ liệu", class: "21CLC05", course: 21 },
  { subject: "Cơ sở dữ liệu", class: "21CLC07", course: 21 },
  { subject: "Cơ sở dữ liệu", class: "22CLC01", course: 22 },
  { subject: "Cơ sở dữ liệu", class: "22CLC03", course: 22 },
  { subject: "Cơ sở dữ liệu nâng cao", class: "21HTTT1", course: 21 },
  { subject: "Cơ sở dữ liệu nâng cao", class: "22HTTT1", course: 22 },
  { subject: "Cơ sở dữ liệu nâng cao", class: "22HTTT2", course: 22 },
  { subject: "Cơ sở dữ liệu nâng cao", class: "23HTTT2", course: 23 },
];

const Compare = () => {
  const [criteria, setCriteria] = useState("");

  return (
    <div style={{ width: "100%", margin: "auto", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, whiteSpace: "nowrap" }}>TIÊU CHÍ SO SÁNH</h3>
            <FormControl style={{ minWidth: "200px" }} variant="outlined">
                <InputLabel id="criteria-label">Chọn tiêu chí so sánh</InputLabel>
                <Select
                    labelId="criteria-label"
                    value={criteria}
                    onChange={(e) => setCriteria(e.target.value)}
                    label="Chọn tiêu chí so sánh"
                >
                    <MenuItem value="grade">THEO LỚP</MenuItem>
                    <MenuItem value="grade">THEO KHOÁ</MenuItem>
                    <MenuItem value="grade">THEO KHOÁ</MenuItem>
                    <MenuItem value="attendance">THEO MÔN</MenuItem>
                </Select>
            </FormControl>


        </div>

      <Card>
      <h3 style={{ margin: "20px" }}>DANH SÁCH CÁC MÔN ĐÃ DẠY</h3>
        <CardContent>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            
            <thead>
              <tr style={{ borderBottom: "1px solid #ccc" }}>
                <th style={{ textAlign: "left", padding: "8px" }}>Môn</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Lớp</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Khóa</th>
                <th style={{ textAlign: "center", padding: "8px" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {classData.map((item, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px" }}>{item.subject}</td>
                  <td style={{ padding: "8px" }}>{item.class}</td>
                  <td style={{ padding: "8px" }}>{item.course}</td>
                  <td style={{ textAlign: "center", padding: "8px" }}>
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Compare;
