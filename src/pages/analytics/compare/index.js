import { useState } from "react";
import { Card, CardContent, IconButton, Select, MenuItem, FormControl, InputLabel, Button, Checkbox } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompareResult from "./CompareResul";

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

    const studentData  = [
        { studentID: "21127149", name: "Nguyễn Văn A", subject: "Cơ sở dữ liệu", class: "21CLC05", course: 21, avg: 8.5, mid: 8.0, final: 9.0 },
        { studentID: "2112790",name: "Trần Thị B", subject: "Cơ sở dữ liệu", class: "21CLC07", course: 21, avg: 7.2, mid: 6.5, final: 8.0 },
        { studentID: "2112777",name: "Lê Văn C", subject: "Cơ sở dữ liệu", class: "22CLC01", course: 22, avg: 6.8, mid: 6.0, final: 7.5 },
        { studentID: "227324",name: "Phạm Hồng D", subject: "Cơ sở dữ liệu nâng cao", class: "22HTTT1", course: 22, avg: 9.0, mid: 8.5, final: 9.5 },
    ];

    const Compare = () => {
    const [criteria, setCriteria] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleCriteriaChange = (e) => {
        setCriteria(e.target.value);
        setSelectedValue(""); 
    };

    const handleValueChange = (e) => {
        setSelectedValue(e.target.value);
    };

    // Tạo danh sách lớp theo môn
    const getClassesBySubject = (subject) => {
        return [...new Set(classData.filter((item) => item.subject === subject).map((item) => item.class))];
    };

    // Tạo danh sách môn theo lớp
    const getSubjectsByClass = (selectedClass) => {
        return [...new Set(classData.filter((item) => item.class === selectedClass).map((item) => item.subject))];
    };

    // Kiểm tra điều kiện hiển thị nút So sánh
    const isCompareEnabled = criteria !== "" && selectedValue !== "";

    

    const handleSelectStudent = (mssv) => {
        setSelectedStudents((prevSelected) => 
        prevSelected.includes(mssv) 
            ? prevSelected.filter(id => id !== mssv) // Bỏ chọn nếu đã chọn
            : [...prevSelected, mssv] // Thêm vào danh sách nếu chưa chọn
        );
    };
    const handleSelectAll = () => {
        if (selectedStudents.length === studentData.length) {
            setSelectedStudents([]); // Bỏ chọn tất cả
        } else {
            setSelectedStudents(studentData.map(student => student.studentID)); // Chọn tất cả
        }
    };
    
    const handleCompare = () => {
        if (selectedStudents.length > 0) {
            setShowResults(true);
        }
    };

    return (
        <div style={{ width: "100%", margin: "auto", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, whiteSpace: "nowrap" }}>TIÊU CHÍ SO SÁNH</h3>

            {/* Chọn tiêu chí */}
            <FormControl style={{ minWidth: "200px" }} variant="outlined">
            <InputLabel>Chọn tiêu chí</InputLabel>
            <Select value={criteria} onChange={handleCriteriaChange} label="Chọn tiêu chí">
                <MenuItem value="class">THEO LỚP</MenuItem>
                <MenuItem value="course">THEO KHOÁ</MenuItem>
                <MenuItem value="subject">THEO MÔN</MenuItem>
            </Select>
            </FormControl>

            {/* Chọn môn nếu tiêu chí là LỚP hoặc KHOÁ */}
            {(criteria === "class" || criteria === "course") && (
            <FormControl style={{ minWidth: "200px", marginLeft: "100px" }} variant="outlined">
                <InputLabel>Chọn môn</InputLabel>
                <Select value={selectedValue} onChange={handleValueChange} label="Chọn môn">
                {[...new Set(classData.map((item) => item.subject))].map((subject) => (
                    <MenuItem key={subject} value={subject}>
                    {subject}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            )}
            {criteria === "subject" && (
            <FormControl style={{ minWidth: "200px", marginLeft: "100px" }} variant="outlined">
                <InputLabel>Chọn lớp</InputLabel>
                <Select value={selectedValue} onChange={handleValueChange} label="Chọn lớp">
                {[...new Set(classData.map((item) => item.class))].map((cls) => (
                    <MenuItem key={cls} value={cls}>
                    {cls}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            )}

            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="primary" disabled={selectedStudents.length === 0} onClick={handleCompare}>
                    So sánh
                </Button>
            </div>
            
            
        </div>

            <div>
                 {!showResults &&(
            !criteria || !selectedValue ? (
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
                                <VisibilityIcon color="primary"/>
                                </IconButton>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </CardContent>
                </Card>
                ) : (
                <Card>
                    <h3 style={{ margin: "20px" }}>DANH SÁCH SINH VIÊN</h3>
                    <CardContent>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #ccc" }}>
                                    <th style={{ textAlign: "center", padding: "8px" }}>MSSV</th>
                                    <th style={{ textAlign: "center", padding: "8px" }}>Họ và tên</th>
                                    <th style={{ textAlign: "center", padding: "8px" }}>Lớp</th>
                                    <th style={{ textAlign: "center", padding: "8px" }}>Môn</th>
                                    <th style={{ textAlign: "center", padding: "8px" }}>Khóa</th>
                                    <th style={{ textAlign: "center", padding: "8px" }}>
                                        <Checkbox
                                            checked={selectedStudents.length === studentData.length}
                                            indeterminate={selectedStudents.length > 0 && selectedStudents.length < studentData.length}
                                            onChange={handleSelectAll}
                                        />
                                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map((student, index) => (
                                    <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                                        <td style={{ textAlign: "center", padding: "8px" }}>{student.studentID}</td>
                                        <td style={{ textAlign: "center", padding: "8px" }}>{student.name}</td>
                                        <td style={{ textAlign: "center", padding: "8px" }}>{student.class}</td>
                                        <td style={{ textAlign: "center", padding: "8px" }}>{student.subject}</td>
                                        <td style={{ textAlign: "center", padding: "8px" }}>{student.course}</td>
                                        <td style={{ textAlign: "center", padding: "8px" }}>
                                            <Checkbox
                                                checked={selectedStudents.includes(student.studentID)}
                                                onChange={() => handleSelectStudent(student.studentID)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
</CardContent>

                </Card>
                )
        )}

        {showResults &&(
            <CompareResult onBack={() => setShowResults(false)}/>
        )}

        </div>
       

         

        </div>

        
    );
    
    
    };

    export default Compare;
