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

const StudentAnalytics = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpenAnalyticConfig, setIsOpenAnalyticConfig] = useState(false);
  // const [selectedChartTypes, setSelectedChartTypes] = useState([]);
  // const [selectedOthers, setSelectedOthers] = useState([]);
  // const [selectedGrades, setSelectedGrades] = useState([]);
  // const [selectedLearningObjectives, setSelectedLearningObjectives] = useState([]);
  const [pieChartData, setPieChartData] = useState(null);
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
  const selectedLearningObjectives = ["assignmentQuiz"];
  const [selectedGradeField, setSelectedGradeField] = useState(selectedGrades[0]);


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

  // const handleOpenConfig = () => {
  //   setIsOpenAnalyticConfig(true);
  // };

  // const handleCloseConfig = () => {
  //   setIsOpenAnalyticConfig(false);
  // };

  // const handleApplyChartConfig = (selectedFields) => {
  //   setSelectedChartTypes(selectedFields.chartTypes);
  //   setSelectedGrades(selectedFields.grades);
  //   setSelectedOthers(selectedFields.otherFields);
  //   setSelectedLearningObjectives(selectedFields.learningObjectives);

  //   setSelectedGradeField(selectedFields.grades[0]);
  // };

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

  // Khi người dùng chọn loại điểm trong dropdown filter, cập nhật pieChartData
  // useEffect(() => {
  //   if (selectedGradeField && data.length > 0) {
  //     const distribution = computeDistribution(data, selectedGradeField);
  //     setPieChartData(distribution);
  //   }
  // }, [selectedGradeField, data]);

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

  // const renderHistogramChart = () => {
  //   return (
  //     <HistogramChartAnalytics data={data} selectedGrades={selectedGrades} />
  //   );
  // };

  const renderRadarChart = () => {
    return <RadarChartAnalytics data={data} selectedGrades={selectedGrades} />;
  };

  // =============== LEARNING OBJECTIVES CHARTS ===============

  // LO Bar Chart - So sánh điểm trung bình giữa các LO
  const renderLOBarChart = (loType, chartData) => {
    if (!chartData || !chartData.barChart) return null;

    return (
      <Box key={`${loType}-bar`} sx={{ mb: 2 }}>
        <div style={{ height: '400px', width: '100%' }}>
          <BarChartAnalytics
            data={[]} // Empty for LO charts
            selectedGrades={[]} // Empty for LO charts
            isLOChart={true}
            loType={loType}
            loData={chartData.barChart}
          />
        </div>
        {/* Enhanced Insights */}
        <Box sx={{ mt: 1, p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e9ecef' }}>
          <strong style={{ fontSize: '15px', color: '#2c3e50' }}>📊 Phân tích chi tiết:</strong>

          {/* Performance Overview */}
          <Box sx={{ mt: 1.5, p: 1.5, backgroundColor: '#ffffff', borderRadius: 1, border: '1px solid #dee2e6' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#495057', marginBottom: '8px' }}>
              🎯 Tổng quan hiệu suất:
            </div>
            {(() => {
              const avgScore = chartData.barChart.reduce((sum, lo) => sum + lo.averageScore, 0) / chartData.barChart.length;
              const excellentLOs = chartData.barChart.filter(lo => lo.averageScore >= 8).length;
              const goodLOs = chartData.barChart.filter(lo => lo.averageScore >= 6.5 && lo.averageScore < 8).length;
              const poorLOs = chartData.barChart.filter(lo => lo.averageScore < 5).length;

              return (
                <div style={{ fontSize: '12px' }}>
                  <div>• Điểm trung bình chung: <strong style={{ color: avgScore >= 7 ? '#28a745' : avgScore >= 5 ? '#ffc107' : '#dc3545' }}>
                    {avgScore.toFixed(2)} điểm</strong></div>
                  <div>• LO xuất sắc (≥8.0): <strong style={{ color: '#28a745' }}>{excellentLOs}</strong></div>
                  <div>• LO khá (6.5-7.9): <strong style={{ color: '#17a2b8' }}>{goodLOs}</strong></div>
                  <div>• LO cần cải thiện (&lt;5.0): <strong style={{ color: '#dc3545' }}>{poorLOs}</strong></div>
                </div>
              );
            })()}
          </Box>

          {/* Top and Bottom Performers */}
          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
            <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#d4edda', borderRadius: 1, border: '1px solid #c3e6cb' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#155724', marginBottom: '6px' }}>
                🏆 LO hiệu suất cao nhất:
              </div>
              {[...chartData.barChart]
                .sort((a, b) => b.averageScore - a.averageScore)
                .slice(0, 3)
                .map((lo, index) => (
                  <div key={lo.loCode} style={{ fontSize: '11px', color: '#155724' }}>
                    {index + 1}. <strong>{lo.loCode}</strong>: {lo.averageScore?.toFixed(2)} điểm
                  </div>
                ))}
            </Box>

            {chartData.barChart.some(lo => lo.averageScore < 6) && (
              <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#f8d7da', borderRadius: 1, border: '1px solid #f5c6cb' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#721c24', marginBottom: '6px' }}>
                  ⚠️ LO cần chú ý:
                </div>
                {[...chartData.barChart]
                  .filter(lo => lo.averageScore < 6)
                  .sort((a, b) => a.averageScore - b.averageScore)
                  .slice(0, 3)
                  .map((lo, index) => (
                    <div key={lo.loCode} style={{ fontSize: '11px', color: '#721c24' }}>
                      {index + 1}. <strong>{lo.loCode}</strong>: {lo.averageScore?.toFixed(2)} điểm
                    </div>
                  ))}
              </Box>
            )}
          </Box>

          {/* Recommendations */}
          <Box sx={{ mt: 1, p: 1.5, backgroundColor: '#fff3cd', borderRadius: 1, border: '1px solid #ffeaa7' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#856404', marginBottom: '6px' }}>
              💡 Khuyến nghị:
            </div>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#856404' }}>
              {(() => {
                const poorLOs = chartData.barChart.filter(lo => lo.averageScore < 5);
                const recommendations = [];

                if (poorLOs.length > 0) {
                  recommendations.push(`Tập trung cải thiện ${poorLOs.map(lo => lo.loCode).join(', ')} với phương pháp giảng dạy khác`);
                }

                const variance = chartData.barChart.reduce((sum, lo) => {
                  const avg = chartData.barChart.reduce((s, l) => s + l.averageScore, 0) / chartData.barChart.length;
                  return sum + Math.pow(lo.averageScore - avg, 2);
                }, 0) / chartData.barChart.length;

                if (variance > 2) {
                  recommendations.push('Cân bằng độ khó giữa các LO để đảm bảo học sinh tiếp thu đều');
                }

                if (chartData.barChart.some(lo => lo.averageScore >= 8)) {
                  const topLO = chartData.barChart.find(lo => lo.averageScore === Math.max(...chartData.barChart.map(l => l.averageScore)));
                  recommendations.push(`Áp dụng phương pháp từ ${topLO.loCode} (${topLO.averageScore.toFixed(1)}) cho các LO khác`);
                }

                return recommendations.length > 0 ? recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                )) : <li>Tiếp tục duy trì chất lượng giảng dạy hiện tại</li>;
              })()}
            </ul>
          </Box>
        </Box>
      </Box>
    );
  };

  // LO Pie Chart - Tỷ lệ học sinh đạt/trượt từng LO
  const renderLOPieChart = (loType, chartData) => {
    if (!chartData || !chartData.pieChart) return null;

    return (
      <Box sx={{ mb: 2 }}>
        <h5 style={{ textAlign: 'center', marginBottom: '15px', color: '#1976d2', fontSize: '16px', fontWeight: 'bold' }}>
          📊 Tỷ lệ đạt/trượt theo Mục tiêu học tập (LO)
        </h5>

        {/* Charts Grid - Better responsive layout */}
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={2} sx={{ mb: 2 }}>
          {chartData.pieChart.slice(0, 6).map((loData) => (
            <Box key={loData.loCode} sx={{
              p: 2,
              border: '2px solid #e3f2fd',
              borderRadius: 2,
              backgroundColor: '#fafafa',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }
            }}>
              <h6 style={{
                textAlign: 'center',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#1976d2',
                padding: '8px',
                backgroundColor: '#e3f2fd',
                borderRadius: '4px'
              }}>
                {loData.loCode}
              </h6>

              <div style={{ height: '200px', width: '100%' }}>
                <PieChartAnalytics
                  pieChartData={[
                    { label: 'Đạt', count: loData.passed, color: '#4caf50' },
                    { label: 'Trượt', count: loData.failed, color: '#f44336' }
                  ]}
                  selectedGrades={[]} // Pass empty array for LO charts
                  selectedGradeField=""
                  setSelectedGradeField={() => { }} // Empty function for LO charts
                  isLOChart={true}
                  loCode={loData.loCode}
                />
              </div>

              {/* Enhanced Statistics */}
              <Box sx={{ mt: 1, p: 1.5, backgroundColor: '#ffffff', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                  <span style={{ color: '#4caf50', fontSize: '12px', fontWeight: 'bold' }}>
                    ✅ Đạt: {loData.passed}
                  </span>
                  <span style={{ color: '#f44336', fontSize: '12px', fontWeight: 'bold' }}>
                    ❌ Trượt: {loData.failed}
                  </span>
                </Box>

                <Box sx={{ mt: 1, textAlign: 'center' }}>
                  {(() => {
                    const total = loData.passed + loData.failed;
                    const passRate = (loData.passed / total) * 100;
                    const getStatus = (rate) => {
                      if (rate >= 80) return { text: 'Xuất sắc', color: '#4caf50', icon: '🏆' };
                      if (rate >= 70) return { text: 'Tốt', color: '#8bc34a', icon: '✅' };
                      if (rate >= 60) return { text: 'Khá', color: '#ffc107', icon: '⚠️' };
                      if (rate >= 50) return { text: 'Trung bình', color: '#ff9800', icon: '📊' };
                      return { text: 'Cần cải thiện', color: '#f44336', icon: '🚨' };
                    };
                    const status = getStatus(passRate);

                    return (
                      <>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: status.color,
                          marginBottom: '4px'
                        }}>
                          {passRate.toFixed(1)}%
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: status.color,
                          fontWeight: 'bold'
                        }}>
                          {status.icon} {status.text}
                        </div>
                      </>
                    );
                  })()}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Overall Analysis */}
        <Box sx={{ mt: 2, p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #dee2e6' }}>
          <strong style={{ fontSize: '15px', color: '#2c3e50' }}>📈 Phân tích tổng quan:</strong>

          {(() => {
            const totalStudents = chartData.pieChart[0]?.passed + chartData.pieChart[0]?.failed || 0;
            const overallPassRate = chartData.pieChart.reduce((sum, lo) => {
              const rate = (lo.passed / (lo.passed + lo.failed)) * 100;
              return sum + rate;
            }, 0) / chartData.pieChart.length;

            const excellentLOs = chartData.pieChart.filter(lo =>
              (lo.passed / (lo.passed + lo.failed)) * 100 >= 80
            ).length;

            const poorLOs = chartData.pieChart.filter(lo =>
              (lo.passed / (lo.passed + lo.failed)) * 100 < 50
            ).length;

            return (
              <Box sx={{ mt: 1 }}>
                <Box display="flex" gap={2} sx={{ mb: 1.5 }}>
                  <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#e8f5e8', borderRadius: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#2e7d32' }}>
                      🎯 Tỷ lệ đạt trung bình
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e7d32' }}>
                      {overallPassRate.toFixed(1)}%
                    </div>
                  </Box>

                  <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#fff3e0', borderRadius: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#f57c00' }}>
                      👥 Tổng số học sinh
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f57c00' }}>
                      {totalStudents}
                    </div>
                  </Box>
                </Box>

                <Box display="flex" gap={1} sx={{ mb: 1.5 }}>
                  <Box sx={{ flex: 1, p: 1, backgroundColor: '#d4edda', borderRadius: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#155724' }}>LO xuất sắc (≥80%)</div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#155724' }}>{excellentLOs}</div>
                  </Box>

                  <Box sx={{ flex: 1, p: 1, backgroundColor: '#f8d7da', borderRadius: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#721c24' }}>LO cần cải thiện (&lt;50%)</div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#721c24' }}>{poorLOs}</div>
                  </Box>
                </Box>

                {/* Recommendations */}
                <Box sx={{ p: 1.5, backgroundColor: '#fff3cd', borderRadius: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#856404', marginBottom: '6px' }}>
                    💡 Khuyến nghị cải thiện:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#856404' }}>
                    {poorLOs > 0 && (
                      <li>Tập trung vào {poorLOs} LO có tỷ lệ đạt thấp, xem xét điều chỉnh phương pháp giảng dạy</li>
                    )}
                    {overallPassRate < 70 && (
                      <li>Tỷ lệ đạt tổng thể dưới 70%, cần đánh giá lại toàn bộ chương trình</li>
                    )}
                    {excellentLOs > chartData.pieChart.length / 2 && (
                      <li>Có {excellentLOs} LO đạt tỷ lệ cao, có thể tăng độ khó để thách thức học sinh</li>
                    )}
                    <li>Phân tích chi tiết từng LO để xác định nguyên nhân và giải pháp cụ thể</li>
                  </ul>
                </Box>
              </Box>
            );
          })()}
        </Box>
      </Box>
    );
  };

  // LO Radar Chart - Phân tích nhóm sinh viên
  const renderLORadarChart = (loType, chartData) => {
    if (!chartData || !chartData.radarChart) return null;

    return (
      <Box key={`${loType}-radar`} sx={{ mb: 2 }}>
        <div style={{ height: '450px', width: '100%' }}>
          <RadarChartAnalytics
            data={[]} // Empty for LO charts
            selectedGrades={[]} // Empty for LO charts
            isLOChart={true}
            loData={chartData.radarChart}
          />
        </div>
        {/* Enhanced Group Analysis */}
        <Box sx={{ mt: 8 }}>
          <h6 style={{ fontSize: '15px', marginBottom: '12px', color: '#2c3e50', fontWeight: 'bold' }}>
            📈 Phân tích chi tiết theo nhóm học sinh:
          </h6>

          {chartData.radarChart.slice(0, 4).map((group, index) => {
            // Safe check for loAverages to prevent reduce errors
            const loAverages = group.loAverages || [];
            const avgScore = loAverages.length > 0
              ? loAverages.reduce((sum, lo) => sum + lo.averageScore, 0) / loAverages.length
              : 0;
            const strongLOs = loAverages.filter(lo => lo.averageScore >= 7);
            const weakLOs = loAverages.filter(lo => lo.averageScore < 5);
            const consistentPerformance = loAverages.length > 0
              ? Math.max(...loAverages.map(lo => lo.averageScore)) - Math.min(...loAverages.map(lo => lo.averageScore))
              : 0;

            return (
              <Box key={index} sx={{
                mb: 2,
                p: 2,
                backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff',
                borderRadius: 2,
                border: '1px solid #dee2e6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                {/* Group Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                  <strong style={{ fontSize: '14px', color: '#1976d2' }}>
                    👥 {group.groupName}
                  </strong>
                  <Box display="flex" gap={1}>
                    <span style={{
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      backgroundColor: avgScore >= 7 ? '#d4edda' : avgScore >= 5 ? '#fff3cd' : '#f8d7da',
                      color: avgScore >= 7 ? '#155724' : avgScore >= 5 ? '#856404' : '#721c24',
                      fontWeight: 'bold'
                    }}>
                      TB: {avgScore.toFixed(2)}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      backgroundColor: consistentPerformance <= 2 ? '#d4edda' : consistentPerformance <= 4 ? '#fff3cd' : '#f8d7da',
                      color: consistentPerformance <= 2 ? '#155724' : consistentPerformance <= 4 ? '#856404' : '#721c24',
                      fontWeight: 'bold'
                    }}>
                      {consistentPerformance <= 2 ? 'Ổn định' : consistentPerformance <= 4 ? 'Dao động' : 'Không đều'}
                    </span>
                  </Box>
                </Box>

                {/* Performance Details */}
                <Box display="flex" gap={2} sx={{ mb: 1 }}>
                  {/* Strengths */}
                  <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#d4edda', borderRadius: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#155724', marginBottom: '6px' }}>
                      🏆 Điểm mạnh:
                    </div>
                    {strongLOs.length > 0 ? (
                      <div style={{ fontSize: '12px', color: '#155724' }}>
                        {strongLOs.map(lo => `${lo.loCode} (${lo.averageScore.toFixed(1)})`).join(', ')}
                        <div style={{ marginTop: '4px', fontSize: '11px', fontStyle: 'italic' }}>
                          {strongLOs.length}/{loAverages.length} LO đạt mức tốt
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: '12px', color: '#6c757d', fontStyle: 'italic' }}>
                        Chưa có LO nào đạt mức tốt (≥7.0)
                      </div>
                    )}
                  </Box>

                  {/* Weaknesses */}
                  <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#f8d7da', borderRadius: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#721c24', marginBottom: '6px' }}>
                      ⚠️ Cần cải thiện:
                    </div>
                    {weakLOs.length > 0 ? (
                      <div style={{ fontSize: '12px', color: '#721c24' }}>
                        {weakLOs.map(lo => `${lo.loCode} (${lo.averageScore.toFixed(1)})`).join(', ')}
                        <div style={{ marginTop: '4px', fontSize: '11px', fontStyle: 'italic' }}>
                          {weakLOs.length}/{loAverages.length} LO cần hỗ trợ thêm
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: '12px', color: '#6c757d', fontStyle: 'italic' }}>
                        Không có LO nào dưới mức yêu cầu (&lt;5.0)
                      </div>
                    )}
                  </Box>
                </Box>

                {/* Recommendations for this group */}
                <Box sx={{ p: 1.5, backgroundColor: '#e2e3e5', borderRadius: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#495057', marginBottom: '6px' }}>
                    💡 Khuyến nghị cho nhóm:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#495057' }}>
                    {(() => {
                      const recommendations = [];

                      if (weakLOs.length > 0) {
                        recommendations.push(`Tăng cường hỗ trợ cho ${weakLOs.map(lo => lo.loCode).join(', ')}`);
                      }

                      if (strongLOs.length > 0) {
                        recommendations.push(`Duy trì và phát huy thế mạnh ở ${strongLOs.slice(0, 2).map(lo => lo.loCode).join(', ')}`);
                      }

                      if (consistentPerformance > 4) {
                        recommendations.push('Cân bằng việc học giữa các LO để đạt hiệu quả tổng thể tốt hơn');
                      }

                      if (avgScore >= 8) {
                        recommendations.push('Nhóm xuất sắc - có thể giao thêm nhiệm vụ nâng cao');
                      } else if (avgScore < 5) {
                        recommendations.push('Cần hỗ trợ đặc biệt và theo dõi sát sao tiến độ học tập');
                      }

                      return recommendations.map((rec, i) => <li key={i}>{rec}</li>);
                    })()}
                  </ul>
                </Box>
              </Box>
            );
          })}

          {/* Overall Group Comparison */}
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#e3f2fd', borderRadius: 2, border: '1px solid #bbdefb' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1976d2', marginBottom: '10px' }}>
              🔍 So sánh tổng quan giữa các nhóm:
            </div>

            {(() => {
              // Safe check to prevent reduce errors
              if (!chartData.radarChart || chartData.radarChart.length === 0) {
                return (
                  <Box textAlign="center" sx={{ color: '#666', p: 2 }}>
                    <small>Không có dữ liệu nhóm để phân tích</small>
                  </Box>
                );
              }

              const groupStats = chartData.radarChart.map(group => {
                const loAverages = group.loAverages || [];
                return {
                  name: group.groupName,
                  avg: loAverages.length > 0
                    ? loAverages.reduce((sum, lo) => sum + lo.averageScore, 0) / loAverages.length
                    : 0,
                  consistency: loAverages.length > 0
                    ? Math.max(...loAverages.map(lo => lo.averageScore)) - Math.min(...loAverages.map(lo => lo.averageScore))
                    : 0
                };
              });

              // Safe reduce with initial value
              const bestGroup = groupStats.length > 0
                ? groupStats.reduce((best, current) => current.avg > best.avg ? current : best, groupStats[0])
                : { name: 'N/A', avg: 0 };

              const mostConsistent = groupStats.length > 0
                ? groupStats.reduce((most, current) => current.consistency < most.consistency ? current : most, groupStats[0])
                : { name: 'N/A', consistency: 0 };

              return (
                <Box display="flex" gap={2}>
                  <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#d4edda', borderRadius: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#155724' }}>
                      🏅 Nhóm điểm cao nhất:
                    </div>
                    <div style={{ fontSize: '14px', color: '#155724', fontWeight: 'bold' }}>
                      {bestGroup.name} ({bestGroup.avg.toFixed(2)})
                    </div>
                  </Box>

                  <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#fff3cd', borderRadius: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#856404' }}>
                      🎯 Nhóm ổn định nhất:
                    </div>
                    <div style={{ fontSize: '14px', color: '#856404', fontWeight: 'bold' }}>
                      {mostConsistent.name} (±{mostConsistent.consistency.toFixed(1)})
                    </div>
                  </Box>
                </Box>
              );
            })()}
          </Box>
        </Box>
      </Box>
    );
  };

  // LO Histogram - Phân bố điểm
  const renderLOHistogram = (loType, chartData) => {
    if (!chartData) {
      return null;
    }

    // Debug: Log dữ liệu đầu vào để kiểm tra cấu trúc
    // console.log('DEBUG - chartData structure:', chartData);

    // Kiểm tra nhiều khả năng cấu trúc dữ liệu
    let histogramData = null;
    if (chartData.histogram) {
      histogramData = chartData.histogram;
      // console.log('Using chartData.histogram:', histogramData);
    } else if (chartData.scoreDistribution) {
      histogramData = chartData.scoreDistribution;
      // console.log('Using chartData.scoreDistribution:', histogramData);
    } else if (Array.isArray(chartData)) {
      histogramData = chartData;
      // console.log('Using chartData as array:', histogramData);
    } else {
      // Tạo mock data với nhiều LO hơn để test
      // console.log('Using mock data - API data not available');
      const mockHistogramData = [
        {
          loCode: "LO1",
          scoreDistribution: [
            { min: 0, max: 4, range: "0-4", count: 2 },
            { min: 4, max: 6, range: "4-6", count: 5 },
            { min: 6, max: 8, range: "6-8", count: 15 },
            { min: 8, max: 10, range: "8-10", count: 13 }
          ]
        },
        {
          loCode: "LO2",
          scoreDistribution: [
            { min: 0, max: 4, range: "0-4", count: 1 },
            { min: 4, max: 6, range: "4-6", count: 4 },
            { min: 6, max: 8, range: "6-8", count: 18 },
            { min: 8, max: 10, range: "8-10", count: 12 }
          ]
        },
        {
          loCode: "LO3",
          scoreDistribution: [
            { min: 0, max: 4, range: "0-4", count: 3 },
            { min: 4, max: 6, range: "4-6", count: 7 },
            { min: 6, max: 8, range: "6-8", count: 14 },
            { min: 8, max: 10, range: "8-10", count: 11 }
          ]
        }
      ];

      histogramData = mockHistogramData;
    }

    return (
      <Box key={`${loType}-histogram`} sx={{ mb: 2 }}>
        <h5 style={{ textAlign: 'center', marginBottom: '15px', color: '#1976d2', fontSize: '16px', fontWeight: 'bold' }}>
          📊 Phân bố điểm theo Mục tiêu học tập
        </h5>

        {/* Charts Grid with full width for vertical layout */}
        <Box display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
          gap={3}
          sx={{ mb: 3 }}>
          {histogramData.slice(0, loType === 'finalExam' ? 6 : 6).map((loData) => (
            <Box key={loData.loCode} sx={{
              p: 2,
              border: '2px solid #e3f2fd',
              borderRadius: 2,
              backgroundColor: '#fafafa',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }
            }}>
              <h6 style={{
                textAlign: 'center',
                fontSize: '14px',
                margin: '0 0 10px 0',
                fontWeight: 'bold',
                color: '#1976d2',
                padding: '8px',
                backgroundColor: '#e3f2fd',
                borderRadius: '4px'
              }}>
                {loData.loCode}
              </h6>

              <div style={{ height: '350px', width: '100%' }}>
                <HistogramChartAnalytics
                  data={[]} // Empty for LO charts
                  selectedGrades={[]} // Empty for LO charts
                  isLOChart={true}
                  loCode={loData.loCode}
                  loData={loData.scoreDistribution || loData.histogram || loData}
                />
              </div>

              {/* Enhanced Statistics for each LO */}
              <Box sx={{ mt: 1, p: 1.5, backgroundColor: '#ffffff', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                {(() => {
                  // Debug: Log dữ liệu để kiểm tra
                  // console.log('DEBUG - Processing loData for statistics:', loData);

                  // Handle different data structures
                  let scoreDistribution = null;

                  // Trường hợp 1: Dữ liệu từ API có scoreDistribution là array điểm số thô
                  if (loData.scoreDistribution && Array.isArray(loData.scoreDistribution)) {
                    // console.log('API Data - loData.scoreDistribution:', loData.scoreDistribution);

                    // Nếu là array số thô từ API, chuyển đổi thành histogram distribution
                    if (typeof loData.scoreDistribution[0] === 'number') {
                      const ranges = [
                        { min: 0, max: 4, range: "0-4" },
                        { min: 4, max: 6, range: "4-6" },
                        { min: 6, max: 8, range: "6-8" },
                        { min: 8, max: 10, range: "8-10" }
                      ];

                      scoreDistribution = ranges.map(range => ({
                        min: range.min,
                        max: range.max,
                        count: loData.scoreDistribution.filter(score =>
                          score >= range.min && (score < range.max || (range.max === 10 && score === 10))
                        ).length
                      }));
                      // console.log('Converted API scores to distribution:', scoreDistribution);
                    } else {
                      // Nếu đã là distribution objects
                      scoreDistribution = loData.scoreDistribution;
                      // console.log('Using API scoreDistribution as is:', scoreDistribution);
                    }
                  }
                  // Trường hợp 2: loData chính là array điểm số
                  else if (Array.isArray(loData)) {
                    if (typeof loData[0] === 'number') {
                      const ranges = [
                        { min: 0, max: 4, range: "0-4" },
                        { min: 4, max: 6, range: "4-6" },
                        { min: 6, max: 8, range: "6-8" },
                        { min: 8, max: 10, range: "8-10" }
                      ];

                      scoreDistribution = ranges.map(range => ({
                        min: range.min,
                        max: range.max,
                        count: loData.filter(score =>
                          score >= range.min && (score < range.max || (range.max === 10 && score === 10))
                        ).length
                      }));
                      // console.log('Converted direct number array to distribution:', scoreDistribution);
                    } else if (loData[0] && typeof loData[0] === 'object' && 'count' in loData[0]) {
                      // If loData is already an array of distribution objects
                      scoreDistribution = loData;
                      // console.log('Using loData as distribution array:', scoreDistribution);
                    }
                  }

                  if (!scoreDistribution || !Array.isArray(scoreDistribution)) {
                    // console.log('No valid score distribution found, showing fallback message');
                    return (
                      <Box textAlign="center" sx={{ color: '#666' }}>
                        <small>Không có dữ liệu thống kê</small>
                        <br />
                        {/* <small style={{ fontSize: '10px' }}>
                          Debug: {JSON.stringify(loData)}
                        </small> */}
                      </Box>
                    );
                  }

                  const total = scoreDistribution.reduce((sum, range) => sum + range.count, 0);
                  const weightedSum = scoreDistribution.reduce((sum, range) => {
                    const midPoint = (range.min + range.max) / 2;
                    return sum + (midPoint * range.count);
                  }, 0);
                  const avgScore = total > 0 ? weightedSum / total : 0;

                  const excellentCount = scoreDistribution
                    .filter(range => range.min >= 8)
                    .reduce((sum, range) => sum + range.count, 0);

                  const poorCount = scoreDistribution
                    .filter(range => range.max <= 4)
                    .reduce((sum, range) => sum + range.count, 0);

                  const passCount = scoreDistribution
                    .filter(range => range.min >= 5)
                    .reduce((sum, range) => sum + range.count, 0);

                  return (
                    <>
                      {/* Key Metrics */}
                      <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Box textAlign="center" sx={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', color: '#666' }}>Điểm TB</div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: avgScore >= 7 ? '#4caf50' : avgScore >= 5 ? '#ff9800' : '#f44336'
                          }}>
                            {avgScore.toFixed(1)}
                          </div>
                        </Box>

                        <Box textAlign="center" sx={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', color: '#666' }}>Tỷ lệ đạt</div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: (passCount / total) >= 0.8 ? '#4caf50' : (passCount / total) >= 0.6 ? '#ff9800' : '#f44336'
                          }}>
                            {total > 0 ? ((passCount / total) * 100).toFixed(0) : 0}%
                          </div>
                        </Box>

                        <Box textAlign="center" sx={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', color: '#666' }}>Tổng SV</div>
                          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1976d2' }}>
                            {total}
                          </div>
                        </Box>
                      </Box>

                      {/* Distribution Summary */}
                      <Box display="flex" gap={0.5} sx={{ mb: 1 }}>
                        <Box sx={{ flex: 1, textAlign: 'center', p: 0.5, backgroundColor: '#e8f5e8', borderRadius: 0.5 }}>
                          <div style={{ fontSize: '10px', color: '#2e7d32' }}>Xuất sắc</div>
                          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#2e7d32' }}>
                            {excellentCount}
                          </div>
                        </Box>

                        <Box sx={{ flex: 1, textAlign: 'center', p: 0.5, backgroundColor: '#fff3e0', borderRadius: 0.5 }}>
                          <div style={{ fontSize: '10px', color: '#f57c00' }}>Trung bình</div>
                          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#f57c00' }}>
                            {total - excellentCount - poorCount}
                          </div>
                        </Box>

                        <Box sx={{ flex: 1, textAlign: 'center', p: 0.5, backgroundColor: '#ffebee', borderRadius: 0.5 }}>
                          <div style={{ fontSize: '10px', color: '#d32f2f' }}>Yếu</div>
                          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#d32f2f' }}>
                            {poorCount}
                          </div>
                        </Box>
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

        {/* Overall Distribution Analysis */}
        <Box sx={{ mt: 2, p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #dee2e6' }}>
          <strong style={{ fontSize: '15px', color: '#2c3e50' }}>📈 Phân tích phân bố tổng thể:</strong>

          {(() => {
            // Calculate overall statistics
            // console.log('DEBUG - Processing histogramData for overall stats:', histogramData);

            const allLOStats = histogramData.map(loData => {
              // console.log('DEBUG - Processing single loData:', loData);

              // Handle different data structures với ưu tiên scoreDistribution
              let scoreDistribution = null;

              // Trường hợp 1: Dữ liệu từ API có scoreDistribution là array điểm số thô
              if (loData.scoreDistribution && Array.isArray(loData.scoreDistribution)) {
                // console.log('Overall Stats - API Data scoreDistribution:', loData.scoreDistribution.length, 'scores');

                // Nếu là array số thô từ API, chuyển đổi thành histogram distribution
                if (typeof loData.scoreDistribution[0] === 'number') {
                  const ranges = [
                    { min: 0, max: 4 },
                    { min: 4, max: 6 },
                    { min: 6, max: 8 },
                    { min: 8, max: 10 }
                  ];

                  scoreDistribution = ranges.map(range => ({
                    min: range.min,
                    max: range.max,
                    count: loData.scoreDistribution.filter(score =>
                      score >= range.min && (score < range.max || (range.max === 10 && score === 10))
                    ).length
                  }));
                  // console.log('Overall Stats - Converted API scores to distribution:', scoreDistribution);
                } else {
                  scoreDistribution = loData.scoreDistribution;
                  // console.log('Overall Stats - Using API scoreDistribution as is:', scoreDistribution);
                }
              }
              // Trường hợp 2: loData chính là array
              else if (Array.isArray(loData)) {
                if (typeof loData[0] === 'number') {
                  const ranges = [
                    { min: 0, max: 4 },
                    { min: 4, max: 6 },
                    { min: 6, max: 8 },
                    { min: 8, max: 10 }
                  ];

                  scoreDistribution = ranges.map(range => ({
                    min: range.min,
                    max: range.max,
                    count: loData.filter(score =>
                      score >= range.min && (score < range.max || (range.max === 10 && score === 10))
                    ).length
                  }));
                  // console.log('Overall Stats - Converted direct number array to distribution:', scoreDistribution);
                } else if (loData[0] && typeof loData[0] === 'object' && 'count' in loData[0]) {
                  scoreDistribution = loData;
                  // console.log('Overall Stats - Using loData as distribution array:', scoreDistribution);
                }
              }

              if (!scoreDistribution || !Array.isArray(scoreDistribution)) {
                // console.log('No valid score distribution found for LO:', loData.loCode);
                return {
                  loCode: loData.loCode || 'Unknown',
                  avgScore: 0,
                  passRate: 0,
                  total: 0
                };
              }

              const total = scoreDistribution.reduce((sum, range) => sum + range.count, 0);
              const weightedSum = scoreDistribution.reduce((sum, range) => {
                const midPoint = (range.min + range.max) / 2;
                return sum + (midPoint * range.count);
              }, 0);
              const avgScore = total > 0 ? weightedSum / total : 0;

              const passCount = scoreDistribution
                .filter(range => range.min >= 5)
                .reduce((sum, range) => sum + range.count, 0);

              return {
                loCode: loData.loCode,
                avgScore,
                passRate: total > 0 ? passCount / total : 0,
                total
              };
            });

            // Safe check for empty allLOStats array
            if (allLOStats.length === 0) {
              return (
                <Box textAlign="center" sx={{ color: '#666', p: 2 }}>
                  <small>Không có dữ liệu LO để phân tích tổng thể</small>
                </Box>
              );
            }

            const overallAvg = allLOStats.reduce((sum, lo) => sum + lo.avgScore, 0) / allLOStats.length;
            const overallPassRate = allLOStats.reduce((sum, lo) => sum + lo.passRate, 0) / allLOStats.length;

            // Safe reduce with initial value to prevent "empty array" error
            const bestLO = allLOStats.reduce((best, current) =>
              current.avgScore > best.avgScore ? current : best,
              allLOStats[0] // Use first element as initial value
            );

            const worstLO = allLOStats.reduce((worst, current) =>
              current.avgScore < worst.avgScore ? current : worst,
              allLOStats[0] // Use first element as initial value
            );

            const consistentLOs = allLOStats.filter(lo => Math.abs(lo.avgScore - overallAvg) <= 0.5).length;
            const inconsistentLOs = allLOStats.length - consistentLOs;

            return (
              <Box sx={{ mt: 1 }}>
                {/* Summary Metrics */}
                <Box display="flex" gap={2} sx={{ mb: 2 }}>
                  <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#e3f2fd', borderRadius: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '13px', color: '#1976d2' }}>Điểm TB chung</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1976d2' }}>
                      {overallAvg.toFixed(2)}
                    </div>
                  </Box>

                  <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#e8f5e8', borderRadius: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '13px', color: '#2e7d32' }}>Tỷ lệ đạt TB</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e7d32' }}>
                      {(overallPassRate * 100).toFixed(1)}%
                    </div>
                  </Box>
                </Box>

                {/* Best and Worst Performance */}
                <Box display="flex" gap={2} sx={{ mb: 2 }}>
                  <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#d4edda', borderRadius: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#155724', marginBottom: '6px' }}>
                      🏆 LO điểm cao nhất:
                    </div>
                    <div style={{ fontSize: '14px', color: '#155724' }}>
                      <strong>{bestLO.loCode}</strong>: {bestLO.avgScore.toFixed(2)} điểm
                    </div>
                    <div style={{ fontSize: '12px', color: '#155724' }}>
                      Tỷ lệ đạt: {(bestLO.passRate * 100).toFixed(1)}%
                    </div>
                  </Box>

                  <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#f8d7da', borderRadius: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#721c24', marginBottom: '6px' }}>
                      ⚠️ LO cần chú ý:
                    </div>
                    <div style={{ fontSize: '14px', color: '#721c24' }}>
                      <strong>{worstLO.loCode}</strong>: {worstLO.avgScore.toFixed(2)} điểm
                    </div>
                    <div style={{ fontSize: '12px', color: '#721c24' }}>
                      Tỷ lệ đạt: {(worstLO.passRate * 100).toFixed(1)}%
                    </div>
                  </Box>
                </Box>

                {/* Distribution Pattern Analysis */}
                <Box sx={{ p: 1.5, backgroundColor: '#fff3cd', borderRadius: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#856404', marginBottom: '8px' }}>
                    📊 Đặc điểm phân bố và khuyến nghị:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#856404' }}>
                    <li>
                      Độ đồng đều: {consistentLOs}/{allLOStats.length} LO có điểm gần mức trung bình
                      {inconsistentLOs > 0 && `, ${inconsistentLOs} LO có độ lệch lớn`}
                    </li>
                    {overallPassRate < 0.7 && (
                      <li>Tỷ lệ đạt tổng thể dưới 70% - cần đánh giá lại phương pháp giảng dạy</li>
                    )}
                    {bestLO.avgScore - worstLO.avgScore > 2 && (
                      <li>Chênh lệch lớn giữa LO ({(bestLO.avgScore - worstLO.avgScore).toFixed(1)} điểm) - cần cân bằng độ khó</li>
                    )}
                    {overallAvg >= 7.5 && (
                      <li>Điểm số tổng thể cao - có thể tăng độ khó để phân loại tốt hơn</li>
                    )}
                    <li>
                      Tập trung cải thiện {worstLO.loCode} và duy trì chất lượng của {bestLO.loCode}
                    </li>
                  </ul>
                </Box>
              </Box>
            );
          })()}
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
          📋 Danh Sách Mục Tiêu Học Tập (Learning Objectives)
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

  // Main LO Charts Renderer
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
          🎯 Thống Kê Mục Tiêu Học Tập (Learning Objectives)
        </h3>

        {/* Learning Objectives Info Table */}
        {renderLOInfoTable()}

        {/* Final Exam Selector - Removed as not relevant */}

        {/* Vertical layout for Assignment/Quiz - Full height display */}
        <Box display="flex" flexDirection="column" gap={4}>
          {/* Assignment/Quiz Charts - Full width, all charts displayed vertically */}
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
                  ✨ Tự động hiển thị: Radar Chart, Histogram
                </span>
              </Box>

              {/* Automatically display all 4 chart types for Assignment/Quiz - Full height */}
              <Box display="flex" flexDirection="column" gap={4}>
                {/* Bar Chart - Always show */}
                {/* {renderLOBarChart('assignmentQuiz', loData.assignmentQuiz)} */}

                {/* Pie Chart - Always show - Full height */}
                {/* {renderLOPieChart('assignmentQuiz', loData.assignmentQuiz)} */}

                {/* Radar Chart - Always show - Full height */}
                {renderLORadarChart('assignmentQuiz', loData.assignmentQuiz)}

                {/* Histogram - Always show - Full height */}
                {renderLOHistogram('assignmentQuiz', loData.assignmentQuiz)}
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
          📊 Thống Kê Xếp Loại và Tỉ Lệ Đậu Rớt
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
          📊 Thống Kê Điểm Thành Phần
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
              case "pie":
                return renderPieChart();
              case "column":
                return renderBarChart();
              case "scatter":
                return renderScatterChart();
              // case "histogram":
              //   return renderHistogramChart();
              // case "radar":
              //   return renderRadarChart();
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
        {/* <ButtonWrapper> */}
        {/* <ActionButton
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
          </ActionButton> */}

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

      {/* {isOpenAnalyticConfig && (
        <AnalyticConfig
          open={isOpenAnalyticConfig}
          onClose={handleCloseConfig}
          onApply={handleApplyChartConfig}
        />
      )} */}
    </Container>
  );
};

export default StudentAnalytics;
