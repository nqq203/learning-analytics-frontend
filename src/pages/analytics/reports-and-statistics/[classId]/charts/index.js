import React, { useState, useEffect, Fragment } from "react";
import {
  Container,
  ActionButton,
  Header,
  TitleWrapper,
  Title,
  ButtonWrapper
} from "@/components/Analytics/Styles/Styles";
import { Box, FormControl, InputLabel, Select, MenuItem, Grid, TextField } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import AnalyticConfig from "@/components/Analytics/Config/AnalyticConfig";
import { PieChartAnalytics } from "@/components/Analytics/Charts/PieChart";
import BarChartAnalytics from "@/components/Analytics/Charts/BarChart";
import ScatterChartAnalytics from "@/components/Analytics/Charts/ScatterPlot";
import HistogramChartAnalytics from "@/components/Analytics/Charts/HistogramChart";
import RadarChartAnalytics from "@/components/Analytics/Charts/RadarChart";
import ClassificationPieChart from "@/components/Analytics/Charts/ClassificationPieChart";
import PassFailPieChart from "@/components/Analytics/Charts/PassFailPieChart";

const StudentAnalytics = () => {
  const [isOpenAnalyticConfig, setIsOpenAnalyticConfig] = useState(false);
  const [selectedChartTypes, setSelectedChartTypes] = useState([]);
  const [selectedOthers, setSelectedOthers] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [pieChartData, setPieChartData] = useState(null);
  const [selectedGradeField, setSelectedGradeField] = useState("");

  // Giả sử data gốc (danh sách sinh viên) được dùng ở đây
  const [data, setData] = useState([
    { id: 1, identificationCode: '21127001', fullName: 'Nguyễn Văn A', midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc', academicYear: "2021" },
    { id: 2, identificationCode: "21127002", fullName: "Hoàng Văn B", midtermGrade: '9', finalGrade: '9', projectGrade: '10', practiceGrade: '10', totalGrade: '9.9', classification: 'Xuất sắc', academicYear: "2021" },
    { id: 3, identificationCode: "21127003", fullName: "Trần Văn C", midtermGrade: '8', finalGrade: '8', projectGrade: '8', practiceGrade: '8', totalGrade: '8', classification: 'Giỏi', academicYear: "2021" },
    { id: 4, identificationCode: "21127004", fullName: "Nguyễn Văn D", midtermGrade: '5', finalGrade: '5', projectGrade: '5', practiceGrade: '5', totalGrade: '5', classification: 'Trung bình', academicYear: "2021" },
    { id: 5, identificationCode: "21127005", fullName: "Lê Văn A", midtermGrade: '4.5', finalGrade: '4.5', projectGrade: '4.5', practiceGrade: '4.5', totalGrade: '4.5', classification: 'Yếu', academicYear: "2021" },
    { id: 6, identificationCode: "21127006", fullName: "Trần Văn E", midtermGrade: '0', finalGrade: '0', projectGrade: '7', practiceGrade: '8', totalGrade: '3.2', classification: 'Yếu', academicYear: "2021" },
    { id: 7, identificationCode: "21127007", fullName: "Nguyễn Văn F", midtermGrade: '9', finalGrade: '8', projectGrade: '8', practiceGrade: '10', totalGrade: '9.2', classification: 'Xuất sắc', academicYear: "2021" },
    { id: 8, identificationCode: "21127008", fullName: "Nguyễn Văn G", midtermGrade: '8', finalGrade: '9', projectGrade: '8', practiceGrade: '9', totalGrade: '8.5', classification: 'Giỏi', academicYear: "2021" },
    { id: 9, identificationCode: "21127009", fullName: "Trần Thị H", midtermGrade: '7', finalGrade: '7', projectGrade: '10', practiceGrade: '10', totalGrade: '8.8', classification: 'Giỏi', academicYear: "2022" },
    { id: 10, identificationCode: "21127010", fullName: "Hoàng Văn A", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc', academicYear: "2021" },
    { id: 11, identificationCode: "21127011", fullName: "Nguyễn Văn A", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc', academicYear: "2022" },
    { id: 12, identificationCode: "21127012", fullName: "Nguyễn Văn A", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc', academicYear: "2022" },
  ]);

  const handleOpenConfig = () => {
    setIsOpenAnalyticConfig(true);
  };

  const handleCloseConfig = () => {
    setIsOpenAnalyticConfig(false);
  };

  const handleApplyChartConfig = (selectedFields) => {
    setSelectedChartTypes(selectedFields.chartTypes);
    setSelectedGrades(selectedFields.grades);
    setSelectedOthers(selectedFields.otherFields);

    setSelectedGradeField(selectedFields.grades[0]);
  };

  // Hàm tính toán phân bố điểm theo các khoảng: 0-4, 4-6, 6-8, 8-10
  const computeDistribution = (data, fieldName) => {
    const ranges = [
      { min: 0, max: 4, label: "0-4", count: 0 },
      { min: 4, max: 6, label: "4-6", count: 0 },
      { min: 6, max: 8, label: "6-8", count: 0 },
      { min: 8, max: 10, label: "8-10", count: 0 },
    ];

    data.forEach(item => {
      const score = parseFloat(item[fieldName]);
      ranges.forEach(range => {
        if (score >= range.min && (score < range.max || (range.max === 10 && score === 10))) {
          range.count++;
        }
      });
    });
    return ranges;
  };

  // Khi người dùng chọn loại điểm trong dropdown filter, cập nhật pieChartData
  useEffect(() => {
    if (selectedGradeField) {
      const distribution = computeDistribution(data, selectedGradeField);
      setPieChartData(distribution);
    }
  }, [selectedGradeField, data]);

  // Render pie chart 
  const renderPieChart = () => {
    return <PieChartAnalytics pieChartData={pieChartData} selectedGradeField={selectedGradeField} selectedGrades={selectedGrades} setSelectedGradeField={setSelectedGradeField} />
  };

  const renderBarChart = () => {
    return <BarChartAnalytics data={data} selectedGrades={selectedGrades} />
  }

  const renderScatterChart = () => {
    return <ScatterChartAnalytics data={data} selectedGrades={selectedGrades} />
  }

  const renderHistogramChart = () => {
    return <HistogramChartAnalytics data={data} selectedGrades={selectedGrades} />
  }

  const renderRadarChart = () => {
    return <RadarChartAnalytics data={data} selectedGrades={selectedGrades} />
  }

  const renderOtherCharts = () => {
    if (selectedOthers.length === 0) return;
    return <Box mt={2}>
      <h3 style={{
        // alignItems: "center",
        // justifyContent: "center",
        fontSize: "24px",
        marginBottom: "20px",
        padding: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}>Thống kê khác</h3>
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(600px, 1fr))" gap={2}>
        <ClassificationPieChart data={data} />
        <PassFailPieChart data={data} />
      </Box>
    </Box>
  }

  // Render các biểu đồ (chỉ xử lý pie chart, các loại khác để trống)
  const renderCharts = () => {
    return (
      <Box>
        <h3 style={{
          // alignItems: "center",
          // justifyContent: "center",
          fontSize: "24px",
          marginBottom: "30px",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}>Thống Kê Điểm Số</h3>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(600px, 1fr))"
          gap={2}
        >
          {selectedChartTypes.map((type) => {
            switch (type) {
              case "pie":
                return renderPieChart();
              case "column":
                return renderBarChart();
              case "scatter":
                return renderScatterChart();
              case "histogram":
                return renderHistogramChart();
              case "radar":
                return renderRadarChart();
              default:
                return null;
            }
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Container>
      <Header>
        <Box display="flex" gap="10px">
          <TextField
            variant="outlined"
            label="Môn học"
            value={"Cở sở dữ liệu"}
            style={{ width: "90%" }}
            disabled
          />
          <TextField
            variant="outlined"
            label="Lớp"
            value={"21CLC05"}
            style={{ width: "90%" }}
            disabled
          />
        </Box>
        <ButtonWrapper>
          <ActionButton
            variant="contained"
            style={{
              fontWeight: "700",
              fontSize: "14px",
              width: "50%",
              height: "90%"
            }}
            onClick={handleOpenConfig}
          >
            Thiết lập & Thống kê
          </ActionButton>
          <ActionButton
            variant="outlined"
            style={{
              fontWeight: "700",
              fontSize: "14px",
              width: "50%",
              height: "90%"
            }}
          >
            Xuất PDF
          </ActionButton>
        </ButtonWrapper>
      </Header>

      {selectedGrades.length === 0 || selectedChartTypes === 0 ?
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={20}>
          <h3>Chưa có dữ liệu hiển thị, vui lòng thiết lập để tiếp tục</h3>
        </Box> :
        <Box mt={2}>
          {renderCharts()}
          {renderOtherCharts()}
        </Box>}

      {isOpenAnalyticConfig && (
        <AnalyticConfig
          onClose={handleCloseConfig}
          onApply={handleApplyChartConfig}
        />
      )}
    </Container>
  );
};

export default StudentAnalytics;