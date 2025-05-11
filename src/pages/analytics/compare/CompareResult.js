import {
  Card,
  CardContent,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CompareResult = ({
  data,
  mode,
  onBack,
  criteria,
  course,
  selectedItems,
}) => {
  if (!data) {
    return (
      <Card>
        <CardContent>
          <p>Không có dữ liệu để hiển thị.</p>
          <Button
            variant="contained"
            color="secondary"
            onClick={onBack}
            style={{ marginTop: "16px" }}
          >
            Quay lại
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card style={{ marginTop: "32px" }}>
      <CardContent>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          Kết quả so sánh
        </Typography>
        {/* Thông tin */}
        <Typography variant="body1" style={{ marginTop: "8px" }}>
          <strong>Tiêu chí: </strong>
          {criteria === "class" ? "Theo Lớp" : "Theo Khóa"}
        </Typography>
        <Typography variant="body1">
          <strong>Môn học: </strong>
          {course || "Tất cả"}
        </Typography>
        <Typography variant="body1">
          <strong>
            {criteria === "class" ? "Lớp đã chọn" : "Khóa đã chọn"}:{" "}
          </strong>
          {selectedItems?.length ? selectedItems.join(", ") : "Không có"}
        </Typography>

        <TableContainer component={Paper} style={{ marginTop: "16px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>{mode === "class" ? "Tên lớp" : "Khoá"}</strong>
                </TableCell>
                {mode === "class" && (
                  <TableCell>
                    <strong>Tên môn học</strong>
                  </TableCell>
                )}
                <TableCell>
                  <strong>Điểm giữa kỳ</strong>
                </TableCell>
                <TableCell>
                  <strong>Điểm thực hành</strong>
                </TableCell>
                <TableCell>
                  <strong>Điểm đồ án</strong>
                </TableCell>
                <TableCell>
                  <strong>Điểm cuối kỳ</strong>
                </TableCell>
                <TableCell>
                  <strong>Điểm trung bình</strong>
                </TableCell>
                <TableCell>
                  <strong>Số lượng SV</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(data).map((item, index) => (
                <TableRow
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                  }}
                >
                  <TableCell>
                    {mode === "class"
                      ? item.class_name
                      : item.class_name.match(/K\d+/)?.[0] || "N/A"}
                  </TableCell>
                  {mode === "class" && (
                    <TableCell>{item.course_name}</TableCell>
                  )}
                  <TableCell>{item.midterm_avg}</TableCell>
                  <TableCell>{item.practice_avg}</TableCell>
                  <TableCell>{item.project_avg}</TableCell>
                  <TableCell>{item.final_avg}</TableCell>
                  <TableCell>{item.total_avg}</TableCell>
                  <TableCell>{item.total_students}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          color="secondary"
          onClick={onBack}
          style={{ marginTop: "16px" }}
        >
          Quay lại
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompareResult;
