import { Card, CardContent, IconButton, Checkbox, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

const studentData = [
    { studentID: "21127149", name: "Nguyễn Văn A", subject: "Cơ sở dữ liệu", class: "21CLC05", course: 21, quizz: 8.5, mid: 8.0, final: 9.0, project: 8.0, ta: 7.5 },
    { studentID: "2112790", name: "Trần Thị B", subject: "Cơ sở dữ liệu", class: "21CLC07", course: 21, quizz: 7.2, mid: 6.5, final: 8.0, project: 8.0, ta: 7.5 },
    { studentID: "2112777", name: "Lê Văn C", subject: "Cơ sở dữ liệu", class: "22CLC01", course: 22, quizz: 6.8, mid: 6.0, final: 7.5, project: 8.0, ta: 7.5 },
    { studentID: "227324", name: "Phạm Hồng D", subject: "Cơ sở dữ liệu", class: "22HTTT1", course: 22, quizz: 9.0, mid: 8.5, final: 9.5, project: 8.0, ta: 7.5 },
];

const Compareresult = ({ onBack }) => {

    return (
        <>
        
        <Card>
            <h3 style={{ margin: "20px" }}>KẾT QUẢ HỌC TẬP</h3>
            <CardContent>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid #ccc" }}>
                            <th>MSSV</th> <th>Họ và tên</th> <th>Môn</th> <th>Bài Quizz</th>
                            <th>Giữa kì</th> <th>Đồ án</th> <th>TA</th> <th>Tổng kết</th> <th>Xem chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map((student, index) => (
                            <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ textAlign: "center",padding: "8px" }}>{student.studentID}</td>
                                <td style={{ textAlign: "center",padding: "8px" }}>{student.name}</td>
                                <td style={{ textAlign: "center",padding: "8px" }}>{student.subject}</td>
                                <td style={{ textAlign: "center",padding: "8px" }}>{student.quizz}</td>
                                <td style={{ textAlign: "center",padding: "8px" }}>{student.mid}</td>
                                <td style={{ textAlign: "center",padding: "8px" }}>{student.project}</td>
                                <td style={{ textAlign: "center",padding: "8px" }}>{student.ta}</td>
                                <td style={{ textAlign: "center",padding: "8px" }}>{student.final}</td>
                                <td style={{ textAlign: "center",padding: "8px" }}>
                                    <IconButton>
                                        <VisibilityIcon color="primary" />
                                    </IconButton>
                                </td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
            <Button variant="contained" color="primary" onClick={onBack}>
                Quay lại
            </Button>
        </div>

    </>
    );
};

export default Compareresult;
