import React, { useState, useEffect, Fragment, useMemo } from "react";
import {
  Container,
  ActionButton,
  Header,
  TitleWrapper,
  Title,
  ButtonWrapper,
} from "@/components/Analytics/Styles/Styles";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import AnalyticConfig from "@/components/Analytics/Config/AnalyticConfig";
import { PieChartAnalytics } from "@/components/Analytics/Charts/PieChart";
import BarChartAnalytics from "@/components/Analytics/Charts/BarChart";
import ScatterChartAnalytics from "@/components/Analytics/Charts/ScatterPlot";
import HistogramChartAnalytics from "@/components/Analytics/Charts/HistogramChart";
import RadarChartAnalytics from "@/components/Analytics/Charts/RadarChart";
import ClassificationPieChart from "@/components/Analytics/Charts/ClassificationPieChart";
import PassFailPieChart from "@/components/Analytics/Charts/PassFailPieChart";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  fetchStudentsDetails,
} from "@/redux/thunk/analyticsThunk";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import { fetchClassDetail } from "@/redux/thunk/dataThunk";

const StudentAnalytics = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpenAnalyticConfig, setIsOpenAnalyticConfig] = useState(false);
  const [selectedChartTypes, setSelectedChartTypes] = useState([]);
  const [selectedOthers, setSelectedOthers] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [pieChartData, setPieChartData] = useState(null);
  const [selectedGradeField, setSelectedGradeField] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { classId } = router.query;
  const [data, setData] = useState([]);
  const [className, setClassName] = useState("");
  const [courseName, setCourseName] = useState("");
  const { accessToken } = useSelector((state) => state.auth);
  const { _class } = useSelector((state) => state.data);

  const userId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const { sub } = jwtDecode(accessToken);
      return sub;
    } catch {
      return null;
    }
  }, [accessToken]);

  useEffect(() => {
    dispatch(fetchClassDetail({ instructorId: userId, classId: classId }));
  }, [userId]);

  useEffect(() => {
    if (!_class) return;
    setClassName(_class?.className);
    setCourseName(_class?.courseName);
  }, [_class]);

  useEffect(() => {
    const fetchData = async () => {
      if (!classId) return;

      const response = await dispatch(
        fetchStudentsDetails({ classId })
      ).unwrap();
      setData(response?.data?.studentList || []);
    };
    fetchData();
  }, [classId, dispatch]);

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

    data.forEach((item) => {
      const score = parseFloat(item[fieldName]);
      ranges.forEach((range) => {
        if (
          score >= range.min &&
          (score < range.max || (range.max === 10 && score === 10))
        ) {
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
    return (
      <PieChartAnalytics
        pieChartData={pieChartData}
        selectedGradeField={selectedGradeField}
        selectedGrades={selectedGrades}
        setSelectedGradeField={setSelectedGradeField}
      />
    );
  };

  const renderBarChart = () => {
    return <BarChartAnalytics data={data} selectedGrades={selectedGrades} />;
  };

  const renderScatterChart = () => {
    return (
      <ScatterChartAnalytics data={data} selectedGrades={selectedGrades} />
    );
  };

  // const renderHistogramChart = () => {
  //   return (
  //     <HistogramChartAnalytics data={data} selectedGrades={selectedGrades} />
  //   );
  // };

  const renderRadarChart = () => {
    return <RadarChartAnalytics data={data} selectedGrades={selectedGrades} />;
  };

  const renderOtherCharts = () => {
    if (selectedOthers.length === 0) return;
    return (
      <Box mt={2}>
        <h3
          style={{
            // alignItems: "center",
            // justifyContent: "center",
            fontSize: "24px",
            marginBottom: "20px",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          Thống kê khác
        </h3>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(600px, 1fr))"
          gap={2}
        >
          <ClassificationPieChart data={data} />
          <PassFailPieChart data={data} />
        </Box>
      </Box>
    );
  };

  // Render các biểu đồ (chỉ xử lý pie chart, các loại khác để trống)
  const renderCharts = () => {
    return (
      <Box>
        <h3
          style={{
            // alignItems: "center",
            // justifyContent: "center",
            fontSize: "24px",
            marginBottom: "30px",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          Thống Kê Điểm Số
        </h3>
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
              // case "histogram":
              //   return renderHistogramChart();
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
            value={courseName || <CircularProgress />}
            style={{ width: "20%", minWidth: 250 }}
            size="small"
            disabled
          />
          <TextField
            variant="outlined"
            label="Lớp"
            value={className || <CircularProgress />}
            style={{ width: "20%", minWidth: 250 }}
            size="small"
            disabled
          />
        </Box>
        <ButtonWrapper>
          <ActionButton
            variant="contained"
            sx={{
              width: "50%",
              fontWeight: 600,
              fontSize: "15px",
              py: 1.2,
              textTransform: "none",
              whiteSpace: "nowrap",
              borderRadius: 1,
              boxShadow: 2,
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
                boxShadow: 3,
              },
            }}
            onClick={handleOpenConfig}
          >
            Cấu hình biểu đồ
          </ActionButton>

          <ActionButton
            variant="outlined"
            sx={{
              width: "50%",
              fontWeight: 600,
              fontSize: "15px",
              py: 1.2,
              textTransform: "none",
              whiteSpace: "nowrap",
              borderRadius: 1,
              color: "primary.main",
              borderColor: "primary.main",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                color: "primary.main",
                borderColor: "primary.main",
              },
            }}
          >
            Xuất PDF
          </ActionButton>
        </ButtonWrapper>
      </Header>

      {selectedGrades.length === 0 || selectedChartTypes === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt={20}
        >
          <h3>Chưa có dữ liệu hiển thị, vui lòng cấu hình để tiếp tục</h3>
        </Box>
      ) : (
        <Box mt={2}>
          {renderCharts()}
          {renderOtherCharts()}
        </Box>
      )}

      {isOpenAnalyticConfig && (
        <AnalyticConfig
          open={isOpenAnalyticConfig}
          onClose={handleCloseConfig}
          onApply={handleApplyChartConfig}
        />
      )}
    </Container>
  );
};

export default StudentAnalytics;
