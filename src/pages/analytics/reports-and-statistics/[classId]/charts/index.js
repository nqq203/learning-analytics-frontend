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
  const selectedGrades = ["midtermGrade", "finalGrade", "practiceGrade", "projectGrade", "totalGrade"]; // All grade types
  const selectedOthers = ["classification", "passFail"]; // All other charts
  const selectedLearningObjectives = ["assignmentQuiz", "finalExam"];
  const [selectedGradeField, setSelectedGradeField] = useState(selectedGrades[0]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

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
      console.log('Direct computation result:', currentPieChartData);
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
          color: loType === 'finalExam' ? '#d32f2f' : '#1976d2',
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

  // Updated LO Histogram for both assignmentQuiz and finalExam
  const renderLOHistogram = (loType, chartData) => {
    if (!chartData) return null;

    const getChartTitle = (loType) => {
      switch (loType) {
        case 'finalExam':
          return '📊 Phân bố tỷ lệ hoàn thành theo LO - Kỳ Thi Cuối Kỳ';
        case 'assignmentQuiz':
          return '📊 Phân bố điểm theo LO - Bài Tập & Quiz';
        default:
          return '📊 Phân bố theo Mục tiêu học tập (Learning Outcome)';
      }
    };

    // Get histogram data
    let histogramData = null;
    if (chartData.histogram && Array.isArray(chartData.histogram)) {
      histogramData = chartData.histogram;
    } else {
      console.log('No histogram data found for', loType);
      return (
        <Box sx={{ p: 2, textAlign: 'center', color: '#666' }}>
          <p>Không có dữ liệu histogram cho {loType === 'finalExam' ? 'Final Exam' : 'Assignment/Quiz'}</p>
        </Box>
      );
    }

    return (
      <Box key={`${loType}-histogram`} sx={{ mb: 2 }}>
        <h5 style={{
          textAlign: 'center',
          marginBottom: '15px',
          color: loType === 'finalExam' ? '#d32f2f' : '#1976d2',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          {getChartTitle(loType)}
        </h5>

        <Box display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
          gap={3}
          sx={{ mb: 3 }}>
          {histogramData.slice(0, 6).map((loData) => (
            <Box key={loData.loCode} sx={{
              position: 'relative',
              p: 2,
              border: `2px solid ${loType === 'finalExam' ? '#ffebee' : '#e3f2fd'}`,
              borderRadius: 2,
              backgroundColor: '#fafafa',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'visible'           // cho phép nội dung con tràn ra nếu cần
            }}>
              <h6 style={{
                textAlign: 'center',
                fontSize: '14px',
                margin: '0 0 10px 0',
                fontWeight: 'bold',
                color: loType === 'finalExam' ? '#d32f2f' : '#1976d2',
                padding: '8px',
                backgroundColor: loType === 'finalExam' ? '#ffebee' : '#e3f2fd',
                borderRadius: '4px'
              }}>
                {loData.loCode} - {loData.loDescription || ''}
                {loType === 'finalExam' && loData.weightInExam && (
                  <div style={{ fontSize: '11px', marginTop: '4px' }}>
                    Trọng số: {loData.weightInExam} ({((loData.weightInExam / 10) * 100).toFixed(0)}%)
                  </div>
                )}
              </h6>

              <Box sx={{ width: '100%' }}>
                <HistogramChartAnalytics
                  data={[]}
                  selectedGrades={[]}
                  isLOChart={true}
                  loCode={loData.loCode}
                  loData={loType === 'finalExam' ? loData.completionDistribution : loData.scoreDistribution}
                  loType={loType}
                />
              </Box>

              {/* Enhanced Statistics for each LO */}
              <Box sx={{ mt: 1, p: 1.5, backgroundColor: '#ffffff', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                {(() => {
                  let scoreDistribution = null;
                  let isPercentage = loType === 'finalExam';

                  if (loType === 'finalExam') {
                    // For finalExam, use completionDistribution (already in percentage)
                    if (loData.completionDistribution && Array.isArray(loData.completionDistribution)) {
                      const completions = loData.completionDistribution;

                      // Create ranges for percentage completion
                      const ranges = [
                        { min: 0, max: 25, range: "0-25%", label: "Yếu" },
                        { min: 25, max: 50, range: "25-50%", label: "Trung bình yếu" },
                        { min: 50, max: 75, range: "50-75%", label: "Trung bình" },
                        { min: 75, max: 100, range: "75-100%", label: "Tốt" }
                      ];

                      scoreDistribution = ranges.map(range => ({
                        min: range.min,
                        max: range.max,
                        range: range.range,
                        label: range.label,
                        count: completions.filter(completion => {
                          const comp = parseFloat(completion);
                          return comp >= range.min && (comp < range.max || (range.max === 100 && comp >= range.min));
                        }).length
                      }));
                    }
                  } else {
                    // For assignmentQuiz, use scoreDistribution
                    if (loData.scoreDistribution && Array.isArray(loData.scoreDistribution)) {
                      const scores = loData.scoreDistribution;

                      const ranges = [
                        { min: 0, max: 4, range: "0-4", label: "Yếu" },
                        { min: 4, max: 6, range: "4-6", label: "Trung bình" },
                        { min: 6, max: 8, range: "6-8", label: "Khá" },
                        { min: 8, max: 10, range: "8-10", label: "Tốt" }
                      ];

                      scoreDistribution = ranges.map(range => ({
                        min: range.min,
                        max: range.max,
                        range: range.range,
                        label: range.label,
                        count: scores.filter(score => {
                          const numScore = parseFloat(score);
                          return numScore >= range.min && (numScore < range.max || (range.max === 10 && numScore === 10));
                        }).length
                      }));
                    }
                  }

                  if (!scoreDistribution || !Array.isArray(scoreDistribution)) {
                    return (
                      <Box textAlign="center" sx={{ color: '#666' }}>
                        <small>Không có dữ liệu thống kê cho {loData.loCode}</small>
                      </Box>
                    );
                  }

                  const total = scoreDistribution.reduce((sum, range) => sum + range.count, 0);

                  // Calculate statistics based on type
                  let avgValue, excellentCount, poorCount, passCount;

                  if (loType === 'finalExam') {
                    // For finalExam, calculate based on completion percentage
                    const weightedSum = scoreDistribution.reduce((sum, range) => {
                      const midPoint = (range.min + range.max) / 2;
                      return sum + (midPoint * range.count);
                    }, 0);
                    avgValue = total > 0 ? weightedSum / total : 0;

                    excellentCount = scoreDistribution
                      .filter(range => range.min >= 75)
                      .reduce((sum, range) => sum + range.count, 0);

                    poorCount = scoreDistribution
                      .filter(range => range.max <= 25)
                      .reduce((sum, range) => sum + range.count, 0);

                    passCount = scoreDistribution
                      .filter(range => range.min >= 50)
                      .reduce((sum, range) => sum + range.count, 0);
                  } else {
                    // For assignmentQuiz, use 0-10 scale
                    const weightedSum = scoreDistribution.reduce((sum, range) => {
                      const midPoint = (range.min + range.max) / 2;
                      return sum + (midPoint * range.count);
                    }, 0);
                    avgValue = total > 0 ? weightedSum / total : 0;

                    excellentCount = scoreDistribution
                      .filter(range => range.min >= 8)
                      .reduce((sum, range) => sum + range.count, 0);

                    poorCount = scoreDistribution
                      .filter(range => range.max <= 4)
                      .reduce((sum, range) => sum + range.count, 0);

                    passCount = scoreDistribution
                      .filter(range => range.min >= 5)
                      .reduce((sum, range) => sum + range.count, 0);
                  }

                  return (
                    <>
                      {/* Key Metrics */}
                      <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Box textAlign="center" sx={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', color: '#666' }}>
                            {loType === 'finalExam' ? 'Hoàn thành TB' : 'Điểm TB'}
                          </div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: avgValue >= (isPercentage ? 70 : 7) ? '#4caf50' :
                              avgValue >= (isPercentage ? 50 : 5) ? '#ff9800' : '#f44336'
                          }}>
                            {avgValue.toFixed(1)}{isPercentage ? '%' : ''}
                          </div>
                        </Box>

                        <Box textAlign="center" sx={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', color: '#666' }}>Tỷ lệ đạt</div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: (passCount / total) >= 0.8 ? '#4caf50' :
                              (passCount / total) >= 0.6 ? '#ff9800' : '#f44336'
                          }}>
                            {total > 0 ? ((passCount / total) * 100).toFixed(0) : 0}%
                          </div>
                        </Box>

                        <Box textAlign="center" sx={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', color: '#666' }}>Tổng SV</div>
                          <div style={{ fontSize: '14px', fontWeight: 'bold', color: loType === 'finalExam' ? '#d32f2f' : '#1976d2' }}>
                            {total}
                          </div>
                        </Box>
                      </Box>

                      {/* Distribution Summary */}
                      <Box display="flex" gap={0.5} sx={{ mb: 1 }}>
                        {scoreDistribution.map((range, index) => (
                          <Box key={index} sx={{
                            flex: 1,
                            textAlign: 'center',
                            p: 0.5,
                            backgroundColor: index === 3 ? '#e8f5e8' :
                              index === 2 ? '#fff3e0' :
                                index === 1 ? '#fff8e1' : '#ffebee',
                            borderRadius: 0.5
                          }}>
                            <div style={{
                              fontSize: '10px',
                              color: index === 3 ? '#2e7d32' :
                                index === 2 ? '#f57c00' :
                                  index === 1 ? '#ff9800' : '#d32f2f'
                            }}>
                              {range.label}
                            </div>
                            <div style={{
                              fontSize: '12px',
                              fontWeight: 'bold',
                              color: index === 3 ? '#2e7d32' :
                                index === 2 ? '#f57c00' :
                                  index === 1 ? '#ff9800' : '#d32f2f'
                            }}>
                              {range.count}
                            </div>
                          </Box>
                        ))}
                      </Box>

                      {/* Status indicator */}
                      <Box textAlign="center" sx={{ mt: 1 }}>
                        {(() => {
                          const passRate = total > 0 ? (passCount / total) : 0;

                          if (passRate >= 0.9) return <span style={{ fontSize: '11px', color: '#4caf50', fontWeight: 'bold' }}>🏆 Xuất sắc</span>;
                          if (passRate >= 0.8) return <span style={{ fontSize: '11px', color: '#8bc34a', fontWeight: 'bold' }}>✅ Tốt</span>;
                          if (passRate >= 0.7) return <span style={{ fontSize: '11px', color: '#ffc107', fontWeight: 'bold' }}>⚠️ Khá</span>;
                          if (passRate >= 0.5) return <span style={{ fontSize: '11px', color: '#ff9800', fontWeight: 'bold' }}>📊 Trung bình</span>;
                          return <span style={{ fontSize: '11px', color: '#f44336', fontWeight: 'bold' }}>🚨 Cần cải thiện</span>;
                        })()}
                      </Box>
                    </>
                  );
                })()}
              </Box>
            </Box>
          ))}
        </Box>
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
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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

        {/* Vertical layout for all LO types */}
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

              <Box display="flex" flexDirection="column" gap={4}>
                {/* Radar Chart for Assignment/Quiz */}
                {renderLORadarChart('assignmentQuiz', loData.assignmentQuiz)}

                {/* Histogram for Assignment/Quiz */}
                {renderLOHistogram('assignmentQuiz', loData.assignmentQuiz)}
              </Box>
            </Box>
          )}

          {/* Final Exam Charts */}
          {selectedLearningObjectives.includes('finalExam') && loData.finalExam && (
            <Box sx={{
              p: 3,
              border: '2px solid #d32f2f',
              borderRadius: 2,
              backgroundColor: '#fafafa'
            }}>
              <h4 style={{
                fontSize: "20px",
                marginBottom: "20px",
                color: "#d32f2f",
                textAlign: "center",
                padding: "12px",
                backgroundColor: "#ffebee",
                borderRadius: "8px",
                borderLeft: "4px solid #d32f2f",
                margin: "0 0 20px 0"
              }}>
                📋 Kỳ Thi Cuối Kỳ (Final Exam)
              </h4>

              <Box sx={{ mb: 3, p: 1.5, backgroundColor: '#fff3e0', borderRadius: 2, textAlign: 'center' }}>
                <span style={{ fontSize: '14px', color: '#f57c00', fontStyle: 'italic', fontWeight: '500' }}>
                  ✨ Thang đo: 0-100% completion | Hiển thị: Radar Chart, Histogram
                </span>
              </Box>

              <Box display="flex" flexDirection="column" gap={4}>
                {/* Radar Chart for Final Exam */}
                {renderLORadarChart('finalExam', loData.finalExam)}

                {/* Histogram for Final Exam */}
                {renderLOHistogram('finalExam', loData.finalExam)}
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
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
            fontSize: "24px",
            marginBottom: "30px",
            padding: "15px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
