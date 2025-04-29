import { useState } from "react";
import { Card, CardContent, Select, MenuItem, FormControl, InputLabel, Button, Checkbox } from "@mui/material";
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

const Compare = () => {
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedClass, setSelectedClass] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [showResults, setShowResults] = useState(false);

    const filteredClasses = classData.filter(item =>
        (!selectedSubject || item.subject === selectedSubject) &&
        (selectedClass.length === 0 || selectedClass.includes(item.class)) &&
        (!selectedCourse || item.course === selectedCourse)
    );

    const handleCompare = () => {
        if (selectedSubject || selectedClass.length > 0 || selectedCourse) {
            setShowResults(true);
        }
    };

    const handleSelectClass = (cls) => {
        setSelectedClass((prevSelected) =>
            prevSelected.includes(cls)
                ? prevSelected.filter(id => id !== cls) // Bỏ chọn nếu đã chọn
                : [...prevSelected, cls] // Thêm vào danh sách nếu chưa chọn
        );
    };

    const handleSelectAllClasses = () => {
        const allClasses = filteredClasses.map(item => item.class);
        if (selectedClass.length === allClasses.length) {
            setSelectedClass([]); // Bỏ chọn tất cả
        } else {
            setSelectedClass(allClasses); // Chọn tất cả lớp
        }
    };

    return (
        <div style={{ width: "100%", margin: "auto", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                <h3 style={{ margin: 0, whiteSpace: "nowrap" }}>TIÊU CHÍ SO SÁNH</h3>
                <FormControl style={{ minWidth: "200px" }} variant="outlined">
                    <InputLabel>Môn học</InputLabel>
                    <Select label="Môn học" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        {[...new Set(classData.map((item) => item.subject))].map((subject) => (
                            <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl style={{ minWidth: "200px" }} variant="outlined">
                    <InputLabel>Lớp</InputLabel>
                    <Select
                        label="Lớp"
                        multiple
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        {[...new Set(filteredClasses.map((item) => item.class))].map((cls) => (
                            <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl style={{ minWidth: "200px" }} variant="outlined">
                    <InputLabel>Khóa</InputLabel>
                    <Select label="Khoá" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                        {[...new Set(filteredClasses.map((item) => item.course))].map((course) => (
                            <MenuItem key={course} value={course}>{course}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" disabled={!selectedSubject && selectedClass.length === 0 && !selectedCourse} onClick={handleCompare}>
                    So sánh
                </Button>
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
                                <th style={{ textAlign: "center", padding: "8px" }}>
                                    <Checkbox
                                        checked={selectedClass.length === filteredClasses.length}
                                        indeterminate={selectedClass.length > 0 && selectedClass.length < filteredClasses.length}
                                        onChange={handleSelectAllClasses}
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClasses.map((item, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "8px" }}>{item.subject}</td>
                                    <td style={{ padding: "8px" }}>{item.class}</td>
                                    <td style={{ padding: "8px" }}>{item.course}</td>
                                    <td style={{ textAlign: "center", padding: "8px" }}>
                                        <Checkbox
                                            checked={selectedClass.includes(item.class)}
                                            onChange={() => handleSelectClass(item.class)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            {showResults && <CompareResult onBack={() => setShowResults(false)} />}
        </div>
    );
};

export default Compare;
