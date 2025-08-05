import React, { useState, useEffect, Fragment, useMemo, useRef } from "react";
import generatePDF from "react-to-pdf";
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
// import AnalyticConfig from "@/components/Analytics/Config/AnalyticConfig";
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
  fetchLearningObjectivesCharts,
} from "@/redux/thunk/analyticsThunk";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import { fetchClassDetail } from "@/redux/thunk/dataThunk";
import BreadcrumbComponent from "@/components/Breadcrumb";

const StudentAnalytics = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { classId } = router.query;
  const [data, setData] = useState([]);
  const [className, setClassName] = useState("");
  const [courseName, setCourseName] = useState("");
  const { accessToken } = useSelector((state) => state.auth);
  const { _class } = useSelector((state) => state.data);
  const { learningObjectivesData: loData, learningObjectivesLoading } = useSelector((state) => state.analytics);
  const chartsRef = useRef();

  const selectedChartTypes = ["pie", "column", "scatter", "radar"]; // All chart types
  const selectedGrades = ["assignmentQuizGrade", "midtermGrade", "practiceGrade", "projectGrade", "finalGrade",  "totalGrade"]; // All grade types
  const selectedOthers = ["classification", "passFail"]; // All other charts
  const selectedLearningObjectives = ["assignmentQuiz", "finalExam"];
  const [selectedGradeField, setSelectedGradeField] = useState(selectedGrades[0]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // State for selected LOs for LO bar chart (tách biệt assignmentQuiz/finalExam)
  const [selectedLOAssignment, setSelectedLOAssignment] = useState("");
  const [selectedLOFinal, setSelectedLOFinal] = useState("");

  useEffect(() => {
    const getBreadcrumbs = () => {
      const baseBreadcrumbs = [
        {
          type: 'home',
          label: 'Trang chủ',
          path: '/'
        },
        {
          type: 'analytics',
          label: 'Thống kê & Báo cáo',
          path: '/analytics/reports-and-statistics'
        },
      ];

      if (classId) {
        if (className && courseName) {
          const classParams = new URLSearchParams({
            className: className || '',
            courseName: courseName || ''
          });

          baseBreadcrumbs.push({
            type: 'students',
            label: `${className} - ${courseName}`,
            path: `/analytics/reports-and-statistics/${classId}?${classParams.toString()}`
          });
        }

        // Current charts page
        baseBreadcrumbs.push({
          type: 'charts',
          label: 'Biểu đồ phân tích'
        });
      }

      return baseBreadcrumbs;
    }
    setBreadcrumbs(getBreadcrumbs());
  }, [classId, _class, className, courseName]);


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

  // Fetch learning objectives data when LO is selected
  useEffect(() => {
    if (classId) {
      dispatch(fetchLearningObjectivesCharts({
        classId
      }));
    }
  }, [classId, dispatch]);

  // Hàm tính toán phân bố điểm theo các khoảng: 0-4, 4-6, 6-8, 8-10
  const computeDistribution = (data, fieldName) => {
    const ranges = [
      { min: 0, max: 4, label: "0-4", count: 0 },
      { min: 4, max: 6, label: "4-6", count: 0 },
      { min: 6, max: 8, label: "6-8", count: 0 },
      { min: 8, max: 10, label: "8-10", count: 0 },
    ];

    data?.forEach((item) => {
      const score = parseFloat(item[fieldName]);
      ranges?.forEach((range) => {
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

  // Render pie chart
  const renderPieChart = () => {
    const handleGradeFieldChange = (newField) => {
      if (newField && newField !== selectedGradeField && selectedGrades.includes(newField)) {
        setSelectedGradeField(newField);
      }
    };

    if (!data.length) {
      return (
        <Box p={2} textAlign="center" sx={{ backgroundColor: '#fff3cd', borderRadius: 1 }}>
          <CircularProgress size={20} />
          <p>Đang tải dữ liệu sinh viên...</p>
        </Box>
      );
    }

    if (!selectedGradeField) {
      return null;
    }

    // Compute pieChartData directly here instead of using useEffect to prevent hanging
    let currentPieChartData = null;
    try {
      currentPieChartData = computeDistribution(data, selectedGradeField);
    } catch (error) {
      console.error('Error in direct computation:', error);
      return null;
    }

    return (
      <PieChartAnalytics
        pieChartData={currentPieChartData}
        selectedGradeField={selectedGradeField}
        selectedGrades={selectedGrades}
        setSelectedGradeField={handleGradeFieldChange}
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

  // =============== LEARNING OBJECTIVES CHARTS ===============
  // Updated LO Radar Chart for both assignmentQuiz and finalExam
  const renderLORadarChart = (loType, chartData) => {
    if (!chartData || !chartData.radarChart) return null;

    const getChartTitle = (loType) => {
      switch (loType) {
        case 'finalExam':
          return '🎯 Phân Tích Nhóm Sinh Viên - Kỳ Thi Cuối Kỳ (% hoàn thành)';
        case 'assignmentQuiz':
          return '🎯 Phân Tích Nhóm Sinh Viên - Bài Tập & Quiz (điểm số)';
        default:
          return '🎯 Phân Tích Nhóm Sinh Viên';
      }
    };

    return (
      <Box key={`${loType}-radar`} sx={{ mb: 15 }}>
        <h5 style={{
          textAlign: 'center',
          marginBottom: '15px',
          color: '#1976d2',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          {getChartTitle(loType)}
        </h5>

        <div style={{ height: '450px', width: '100%' }}>
          <RadarChartAnalytics
            data={[]}
            selectedGrades={[]}
            isLOChart={true}
            loData={chartData.radarChart}
            loType={loType}
          />
        </div>
      </Box>
    );
  };

  // Màu custom cho các loại phân loại
  const chartColorMap = {
    gioi: '#3b82f6', // Giỏi
    kha: '#10b981', // Khá
    trungbinh: '#f59e0b', // Trung bình
    yeu: '#ef4444', // Yếu
    dau: '#10b981', // Đậu
    rot: '#ef4444', // Rớt
  };

  // Updated LO Histogram for both assignmentQuiz and finalExam
  const renderLOHistogram = (loType, chartData) => {
    if (!chartData) return null;

    // Get LO list from classInfo
    const loList = (loData?.classInfo?.learningOutcomes || []).filter(lo => {
      if (loType === 'assignmentQuiz') {
        return chartData.histogram?.some(h => h.loCode === lo.loCode);
      } else if (loType === 'finalExam') {
        return chartData.histogram?.some(h => h.loCode === lo.loCode);
      }
      return false;
    });

    const isAssignment = loType === 'assignmentQuiz';
    const selectedLO = isAssignment ? selectedLOAssignment : selectedLOFinal;
    const setSelectedLO = isAssignment ? setSelectedLOAssignment : setSelectedLOFinal;

    // Default: chọn LO đầu tiên nếu chưa chọn
    const currentLO = selectedLO || (loList[0]?.loCode || "");

    // Lấy dữ liệu histogram cho LO đang chọn
    const histogramData = chartData.histogram?.find(h => h.loCode === currentLO);

    // Handler for LO selection
    const handleLOChange = (e) => {
      setSelectedLO(e.target.value);
    };

    return (
      <Box key={`${loType}-histogram`} sx={{ mb: 2 }} style={{ position: 'relative', height: '92%' }}>
        <Box display="flex" alignItems="center" sx={{ mb: 2, alignItems: 'center', justifyContent: 'center' }}>
          <h5 style={{
            textAlign: 'center',
            marginBottom: 0,
            color: '#1976d2',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            {loType === 'finalExam' ? '📊 Phân bố hoàn thành theo LO - Kỳ Thi Cuối Kỳ' : '📊 Phân bố điểm theo LO - Bài Tập & Quiz'}
          </h5>
        </Box>
        {histogramData ? (
          <>
            <HistogramChartAnalytics
              data={[]}
              selectedGrades={[]}
              isLOChart={true}
              loCode={histogramData.loCode}
              loData={loType === 'finalExam' ? histogramData.completionDistribution : histogramData.scoreDistribution}
              loType={loType}
              colorMap={chartColorMap}
            />
            <Box display="flex" justifyContent="center" sx={{ mt: 2 }} style={{ position: 'absolute', bottom: "-20px", left: 0, right: 0 }}>
              <FormControl size="small" sx={{ minWidth: 220 }}>
                <InputLabel id={`select-lo-label-${loType}`}>Chọn mục tiêu học tập</InputLabel>
                <Select
                  labelId={`select-lo-label-${loType}`}
                  value={currentLO}
                  onChange={handleLOChange}
                  label="Chọn mục tiêu học tập"
                >
                  {loList.map((lo) => (
                    <MenuItem key={lo.loCode} value={lo.loCode}>
                      {lo.loCode} - {lo.loDescription}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </>
        ) : (
          <Box sx={{ p: 2, textAlign: 'center', color: '#666' }}>
            <p>Không có dữ liệu cho mục tiêu học tập này.</p>
          </Box>
        )}
      </Box>
    );
  };

  // Learning Objectives Info Table Component
  const renderLOInfoTable = () => {
    // Get LO info from class data
    const learningOutcomes = loData?.classInfo?.learningOutcomes || [];

    if (learningOutcomes.length === 0) return null;

    return (
      <Box sx={{ mb: 4, p: 3, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #dee2e6' }}>
        <h4 style={{
          fontSize: "18px",
          marginBottom: "16px",
          color: "#2c3e50",
          textAlign: "center",
          fontWeight: "bold"
        }}>
          📋 Danh Sách Mục Tiêu Học Tập
        </h4>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 2,
          maxHeight: '300px',
          overflowY: 'auto',
          p: 1
        }}>
          {learningOutcomes.map((lo, index) => (
            <Box key={lo.loId} sx={{
              p: 2,
              backgroundColor: '#ffffff',
              borderRadius: 1,
              border: '1px solid #e9ecef',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              '&:hover': {
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                transform: 'translateY(-1px)',
                transition: 'all 0.2s ease'
              }
            }}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box sx={{
                  minWidth: '50px',
                  height: '50px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  {lo.loCode}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '4px'
                  }}>
                    {lo.loCode}: {lo.loDescription}
                  </div>

                  <div style={{
                    fontSize: '12px',
                    color: '#6c757d',
                    marginBottom: '2px'
                  }}>
                    📚 {lo.courseName}
                  </div>

                  <div style={{
                    fontSize: '11px',
                    color: '#868e96'
                  }}>
                    🆔 ID: {lo.loId} | 📅 {new Date(lo.createdDate).toLocaleDateString('vi-VN')}
                  </div>
                </Box>

                <Box sx={{
                  padding: '4px 8px',
                  backgroundColor: index % 2 === 0 ? '#e3f2fd' : '#f3e5f5',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: index % 2 === 0 ? '#1976d2' : '#7b1fa2'
                }}>
                  #{index + 1}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Summary Info */}
        <Box sx={{ mt: 2, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1, textAlign: 'center' }}>
          <span style={{ fontSize: '14px', color: '#1976d2', fontWeight: 'bold' }}>
            📊 Tổng cộng: {learningOutcomes.length} Mục tiêu học tập |
            📚 Môn học: {learningOutcomes[0]?.courseName} ({learningOutcomes[0]?.courseCode})
          </span>
        </Box>
      </Box>
    );
  };

  // Main LO Charts Renderer - Chỉ Radar và Histogram
  const renderLearningObjectivesCharts = () => {
    if (selectedLearningObjectives.length === 0 || !loData) return null;

    return (
      <Box mt={4}>
        <h3
          style={{
            fontSize: "24px",
            marginBottom: "30px",
            padding: "15px",
            background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
            color: "white",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          🎯 THỐNG KÊ MỤC TIÊU HỌC TẬP
        </h3>

        {/* Learning Objectives Info Table */}
        {renderLOInfoTable()}

        {/* Horizontal layout for all LO types: Radar left, Histogram right */}
        <Box display="flex" flexDirection="column" gap={4}>
          {/* Assignment/Quiz Charts */}
          {selectedLearningObjectives.includes('assignmentQuiz') && loData.assignmentQuiz && (
            <Box sx={{
              p: 3,
              border: '2px solid #1976d2',
              borderRadius: 2,
              backgroundColor: '#fafafa'
            }}>
              <h4 style={{
                fontSize: "20px",
                marginBottom: "20px",
                color: "#1976d2",
                textAlign: "center",
                padding: "12px",
                backgroundColor: "#e3f2fd",
                borderRadius: "8px",
                borderLeft: "4px solid #1976d2",
                margin: "0 0 20px 0"
              }}>
                📝 Bài Tập & Quiz
              </h4>

              <Box sx={{ mb: 3, p: 1.5, backgroundColor: '#e8f5e8', borderRadius: 2, textAlign: 'center' }}>
                <span style={{ fontSize: '14px', color: '#2e7d32', fontStyle: 'italic', fontWeight: '500' }}>
                  ✨ Thang điểm: 0-10 | Hiển thị: Radar Chart, Histogram
                </span>
              </Box>

              {/* Flex row: Radar left, Histogram right */}
              <Box display="flex" flexDirection="row" gap={4}>
                <Box sx={{ flex: 1, minWidth: 0, maxWidth: '50%' }}>
                  {renderLORadarChart('assignmentQuiz', loData.assignmentQuiz)}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0, maxWidth: '50%' }}>
                  {renderLOHistogram('assignmentQuiz', loData.assignmentQuiz)}
                </Box>
              </Box>
            </Box>
          )}

          {/* Final Exam Charts */}
          {selectedLearningObjectives.includes('finalExam') && loData.finalExam && (
            <Box sx={{
              p: 3,
              border: '2px solid #1976d2',
              borderRadius: 2,
              backgroundColor: '#fafafa'
            }}>
              <h4 style={{
                fontSize: "20px",
                marginBottom: "20px",
                color: "#1976d2",
                textAlign: "center",
                padding: "12px",
                backgroundColor: "#e3f2fd",
                borderRadius: "8px",
                borderLeft: "4px solid #1976d2",
                margin: "0 0 20px 0"
              }}>
                📋 Kỳ Thi Cuối Kỳ (Final Exam)
              </h4>

              <Box sx={{ mb: 3, p: 1.5, backgroundColor: '#e8f5e8', borderRadius: 2, textAlign: 'center' }}>
                <span style={{ fontSize: '14px', color: '#2e7d32', fontStyle: 'italic', fontWeight: '500' }}>
                  ✨ Thang đo: 0-100% completion | Hiển thị: Radar Chart, Histogram
                </span>
              </Box>

              {/* Flex row: Radar left, Histogram right */}
              <Box display="flex" flexDirection="row" gap={4}>
                <Box sx={{ flex: 1, minWidth: 0, maxWidth: '50%' }}>
                  {renderLORadarChart('finalExam', loData.finalExam)}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0, maxWidth: '50%' }}>
                  {renderLOHistogram('finalExam', loData.finalExam)}
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {learningObjectivesLoading && (
          <Box display="flex" justifyContent="center" alignItems="center" p={4}>
            <CircularProgress />
            <Box ml={2}>Đang tải dữ liệu Mục tiêu học tập...</Box>
          </Box>
        )}
      </Box>
    );
  };

  const renderOtherCharts = () => {
    if (selectedOthers.length === 0) return;
    return (
      <Box mt={2}>
        <h3
          style={{
            fontSize: "24px",
            marginBottom: "30px",
            padding: "15px",
            background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
            color: "white",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          📊 THỐNG KÊ TỔNG QUAN
        </h3>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(600px, 1fr))"
          gap={2}
          sx={{
            p: 3,
            border: '2px solid #1976d2',
            borderRadius: 2,
            backgroundColor: '#fafafa'
          }}
        >
          <ClassificationPieChart data={data} colorMap={chartColorMap} />
          <PassFailPieChart data={data} colorMap={chartColorMap} />
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
            fontSize: "24px",
            marginBottom: "30px",
            padding: "15px",
            background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
            color: "white",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          📊 THỐNG KÊ ĐIỂM THÀNH PHẦN
        </h3>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(600px, 1fr))"
          gap={2}
          sx={{
            p: 3,
            border: '2px solid #1976d2',
            borderRadius: 2,
            backgroundColor: '#fafafa'
          }}
        >
          {selectedChartTypes.map((type) => {
            switch (type) {
              case "column":
                return renderBarChart();
              case "scatter":
                return renderScatterChart();
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
      <Header style={{ marginBottom: "10px" }}>
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
        <ActionButton
          variant="outlined"
          sx={{
            // width: "50%",
            fontWeight: 600,
            fontSize: "15px",
            py: 1.2,
            textTransform: "none",
            whiteSpace: "nowrap",
            borderRadius: 1,
            color: "primary.main",
            borderColor: "primary.main",
            transition: "all 0.3s ease",
            width: "200px",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.1)",
              color: "primary.main",
              borderColor: "primary.main",
            },
          }}
          onClick={() => generatePDF(chartsRef, {
            filename: "charts.pdf",
            page: { format: [210, 400] },
            scale: 0.85
          })}
        >
          Xuất PDF
        </ActionButton>
        {/* </ButtonWrapper> */}
      </Header>

      {/* Breadcrumbs */}
      <BreadcrumbComponent
        variant="default"
        breadcrumbs={breadcrumbs}
      />

      {/* Check if there's any data to display */}
      {(selectedGrades.length === 0 && selectedLearningObjectives.length === 0) ||
        (selectedGrades.length > 0 && selectedChartTypes.length === 0) ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt={20}
        >
          <h3>Chưa có dữ liệu hiển thị, vui lòng cấu hình để tiếp tục</h3>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <p><strong>📊 Thống kê điểm số:</strong> Cần chọn loại điểm và loại biểu đồ</p>
            <p><strong>🎯 Mục tiêu học tập:</strong> Chọn Bài tập/Quiz để xem phân tích chi tiết</p>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '12px' }}>
              * Mục tiêu học tập sẽ tự động hiển thị tất cả biểu đồ phù hợp
            </p>
          </div>
        </Box>
      ) : (
        <Box mt={2} ref={chartsRef}>
          {/* Always render other charts */}
          {data.length > 0 && renderOtherCharts()}

          {/* Always render grade charts */}
          {data.length > 0 && renderCharts()}



          {/* Always render learning objectives charts when data is available */}
          {loData && renderLearningObjectivesCharts()}

          {/* Loading state */}
          {(!data.length || learningObjectivesLoading) && (
            <Box display="flex" justifyContent="center" alignItems="center" p={8}>
              <CircularProgress size={60} />
              <Box ml={3}>
                <h3>Đang tải dữ liệu phân tích...</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  Vui lòng đợi trong giây lát để hệ thống tải và xử lý dữ liệu
                </p>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default StudentAnalytics;
