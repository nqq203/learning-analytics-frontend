import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
  Paper,
  Divider,
  Tooltip,
} from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
const PlotlyBoxPlot = dynamic(() => import("./PlotlyBoxPlot"), { ssr: false });
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Help,
  InfoOutlined,
  LightbulbOutlined,
  QuestionAnswer,
} from "@mui/icons-material";

const CustomYAxisLabel = ({ x, y, payload }) => {
  if (payload && payload.value === 10) {
    return (
      <g transform={`translate(${x - 30},${y - 30})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="start"
          fill="#64748b"
          fontSize="12"
          fontWeight="bold"
        >
          Điểm (10)
        </text>
      </g>
    );
  }

  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill="#64748b" fontSize="12">
      {payload?.value ?? ""}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          border: "1px solid #e2e8f0",
          borderRadius: 2,
          background: "white",
        }}
      >
        <Typography variant="subtitle2" fontWeight="600" color="#1e293b">
          Khóa: {label}
        </Typography>
        <Divider sx={{ my: 1 }} />
        {payload.map((entry, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: entry.color,
              }}
            />
            <Typography variant="body2" color="#64748b">
              {entry.name}:
            </Typography>
            <Typography variant="body2" fontWeight="600" color="#0f172a">
              {entry.value}
            </Typography>
          </Box>
        ))}
      </Paper>
    );
  }
  return null;
};

export function AvgScoreChart({
  allGrades = [],
  data = [],
  selectedSubject = "",
  selectedYear = "",
  subjects = [],
}) {
  const theme = useTheme();
  const [scale, setScale] = useState(10);

  const [chartData, setChartData] = useState({
    boxPlotData: [],
    xLabels: [],
    isLoading: true,
  });

  const isSubjectFilter = !!selectedSubject;
  const isYearFilter = !!selectedYear;

  const createMultiLineLabel = (text, maxCharsPerLine = 15) => {
    if (text.length <= maxCharsPerLine) return text;

    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      if ((currentLine + " " + word).trim().length > maxCharsPerLine) {
        if (currentLine.trim()) lines.push(currentLine.trim());
        currentLine = word;
      } else {
        currentLine += " " + word;
      }
    });
    if (currentLine.trim()) lines.push(currentLine.trim());

    return lines.join("<br>");
  };

  useEffect(() => {
    const processChartData = () => {
      let xLabels = [];
      let boxPlotData = [];

      if (allGrades && allGrades.length > 0) {
        let filteredGrades = allGrades;

        if (isSubjectFilter) {
          filteredGrades = filteredGrades.filter((item) => {
            return String(item.id) === String(selectedSubject);
          });
        }

        if (filteredGrades.length > 0) {
          const allYValues = [];
          const allXLabels = [];

          filteredGrades.forEach((item) => {
            item.grades.forEach((grade) => {
              allYValues.push(grade);
              allXLabels.push(`${item.name} (${item.id})`);
            });
          });

          boxPlotData = [
            {
              y: allYValues,
              x: allXLabels,
              type: "box",
              boxpoints: "outliers",
              marker: { size: 4, color: "#3b82f6" },
              line: { width: 2, color: "#1d4ed8" },
              boxmean: false,
              hoverinfo: "y+name",
              hovertemplate: "<b>%{x}</b><br>Điểm: %{y}<extra></extra>",
            },
          ];

          xLabels = allXLabels;
        } else {
          // If no subject filter matches, show all subjects
          filteredGrades = allGrades;

          const allYValues = [];
          const allXLabels = [];

          filteredGrades.forEach((item) => {
            item.grades.forEach((grade) => {
              allYValues.push(grade);
              allXLabels.push(`${item.name} (${item.id})`);
            });
          });

          boxPlotData = [
            {
              y: allYValues,
              x: allXLabels,
              type: "box",
              boxpoints: "outliers",
              marker: { size: 4, color: "#3b82f6" },
              line: { width: 2, color: "#1d4ed8" },
              boxmean: false,
              hoverinfo: "y+name",
              hovertemplate: "<b>%{x}</b><br>Điểm: %{y}<extra></extra>",
            },
          ];

          xLabels = allXLabels;
        }
      } else if (data && data.length > 0) {
        // Use data prop when allGrades is not available
        const baseBoxConfig = {
          name: "Điểm TB",
          type: "box",
          boxpoints: "all",
          jitter: 0.5,
          whiskerwidth: 0.2,
          marker: { size: 4, color: "#3b82f6" },
          line: { width: 2, color: "#1d4ed8" },
          boxmean: false,
          hoverinfo: "y+name",
          hovertemplate: "<b>%{x}</b><br>Điểm TB: %{y}<extra></extra>",
        };

        xLabels = data.map((d) => d.name);
        boxPlotData = [
          {
            y: data.map((d) => d.value),
            x: xLabels,
            ...baseBoxConfig,
          },
        ];
      }

      setChartData({
        boxPlotData,
        xLabels,
        isLoading: false,
      });
    };

    processChartData();
  }, [
    allGrades,
    data,
    selectedSubject,
    selectedYear,
    isSubjectFilter,
    isYearFilter,
  ]);

  const chartTitle = useMemo(() => {
    if (isSubjectFilter && !isYearFilter) {
      return "Phân bố điểm tổng kết theo môn/lớp";
    } else if (!isSubjectFilter && isYearFilter) {
      return "Phân bố điểm tổng kết theo niên khóa";
    } else if (isSubjectFilter && isYearFilter) {
      return "Phân bố điểm tổng kết theo lớp và niên khóa";
    } else {
      return "Phân bố điểm tổng kết theo môn/lớp";
    }
  }, [isSubjectFilter, isYearFilter]);

  const chartSubtitle = useMemo(() => {
    const parts = [];
    if (selectedSubject) {
      const subjectName = subjects.filter((g) => g.id === selectedSubject);
      parts.push(`Môn: ${subjectName.map((s) => s.name).join(", ")}`);
    }
    if (selectedYear) {
      parts.push(`Khóa: ${selectedYear}`);
    }
    if (parts.length === 0) {
      return "Hiển thị điểm tổng kết theo từng khóa, môn, lớp.";
    }
    return parts.join(" • ");
  }, [selectedSubject, selectedYear, allGrades, data]);

  if (!chartData.boxPlotData.length && !allGrades?.length && !data?.length) {
    return (
      <Box sx={{ height: "100%" }}>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <ShowChartIcon />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="700" color="#1e293b">
                {chartTitle}
              </Typography>
              <Typography variant="body2" color="#64748b">
                Không có dữ liệu để hiển thị
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ height: 350, mb: 3, position: "relative" }}>
          <Typography
            variant="subtitle2"
            sx={{
              position: "absolute",
              top: 2,
              left: 15,
              fontSize: 12,
              color: "#64748b",
              zIndex: 1,
              fontWeight: "bold",
            }}
          >
            Điểm
          </Typography>
          <PlotlyBoxPlot
            data={[]}
            layout={{
              title: "",
              dragmode: false,
              hovermode: "closest",
              yaxis: {
                title: {
                  text: "",
                  font: { size: 14, color: "#64748b", weight: "bold" },
                  standoff: 0,
                  y: 1.05,
                },
                range: [0, 10],
                dtick: 1,
                zeroline: false,
                gridcolor: "#e2e8f0",
                tickfont: { color: "#64748b", size: 12 },
                titlefont: { size: 14, color: "#64748b" },
                fixedrange: true,
              },
              xaxis: {
                title: isSubjectFilter ? "Lớp" : "Môn",
                tickfont: { color: "#64748b", size: 12 },
                titlefont: { size: 14, color: "#64748b" },
                showgrid: false,
                categoryorder: "array",
                categoryarray: chartData.xLabels,
                fixedrange: true,
                tickangle: 0,
                tickmode: "array",
                ticktext: [],
                tickvals: [],
              },
              boxmode: "group",
              plot_bgcolor: "white",
              paper_bgcolor: "white",
              margin: { t: 40, r: 30, l: 50, b: 100 },
              legend: { orientation: "h", y: -0.2 },
            }}
            config={{
              responsive: true,
              displayModeBar: false,
              modeBarButtonsToRemove: [
                "zoom",
                "pan",
                "select",
                "lasso2d",
                "resetScale2d",
              ],
              scrollZoom: false,
              displaylogo: false,
              toImageButtonOptions: {
                format: "png",
                filename: "chart",
                height: 500,
                width: 700,
                scale: 1,
              },
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "8px",
              backgroundColor: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShowChartIcon sx={{ color: "#1d4ed8" }} />
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6" fontWeight="700" color="#1e293b">
                {chartTitle}
              </Typography>

              <Tooltip
                arrow
                title={
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Hướng dẫn đọc & ý nghĩa biểu đồ Phân bố điểm tổng kết
                    </Typography>
                    <Typography variant="body2">
                      <strong>Cách đọc:</strong>
                      <br />
                      • Mỗi hộp (box) biểu thị khoảng điểm từ Q1 (25%) đến Q3
                      (75%) của môn/lớp.
                      <br />• Đường nằm ngang trong hộp là điểm trung vị (
                      <em>median</em>).
                      <br />
                      • “Râu” thể hiện điểm nhỏ nhất và lớn nhất không phải
                      ngoại lệ.
                      <br />• Các chấm rời bên ngoài là ngoại lệ (
                      <em>outliers</em>) – điểm bất thường quá thấp hoặc quá
                      cao.
                      <br />
                      • Trục X: tên môn học (kèm số lượng sinh viên tham gia).
                      <br />
                      • Trục Y: thang điểm (0–10).
                      <br />
                      <br />
                      <strong>Ý nghĩa trong dữ liệu này:</strong>
                      <br />
                      • Giúp so sánh phân bố điểm tổng kết giữa các môn/lớp.
                      <br />
                      • Xác định môn/lớp có mức điểm ổn định hay dao động lớn.
                      <br />
                      • Phát hiện môn/lớp có nhiều điểm bất thường (quá thấp
                      hoặc quá cao so với nhóm).
                      <br />• Hỗ trợ giảng viên nhận diện môn/lớp cần xem xét
                      lại phương pháp giảng dạy hoặc đánh giá.
                    </Typography>
                  </Box>
                }
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "#fff9db",
                      color: "#1e293b",
                      border: "1px solid #e2e8f0",
                      maxWidth: 400,
                    },
                  },
                }}
              >
                <LightbulbOutlined
                  sx={{
                    bgcolor: "#efb15aff",
                    borderRadius: "50%",
                    p: "2px",
                    fontSize: 20,
                    color: "#ffffff",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                />
              </Tooltip>
            </Box>
            <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
              So sánh điểm tổng kết giữa các môn/lớp.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          overflowX: "auto",
          width: "100%",
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 #f1f5f9",
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f5f9",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#94a3b8",
          },
        }}
      >
        <Box
          sx={{ height: 350, mb: 3, position: "relative", minWidth: "750px" }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              position: "absolute",
              top: 2,
              left: 15,
              fontSize: 12,
              color: "#64748b",
              zIndex: 1,
              fontWeight: "bold",
            }}
          >
            Điểm
          </Typography>
          <PlotlyBoxPlot
            data={chartData.boxPlotData}
            layout={{
              title: "",
              dragmode: false,
              hovermode: "closest",
              yaxis: {
                title: {
                  text: "",
                  font: { size: 14, color: "#64748b", weight: "bold" },
                  standoff: 0,
                  y: 1.05,
                },
                range: [0, 10],
                dtick: 1,
                zeroline: false,
                gridcolor: "#e2e8f0",
                tickfont: { color: "#64748b", size: 12 },
                titlefont: { size: 14, color: "#64748b" },
                fixedrange: true,
              },
              xaxis: {
                title: isSubjectFilter ? "Lớp" : "Môn",
                tickfont: { color: "#64748b", size: 10 },
                titlefont: { size: 14, color: "#64748b" },
                showgrid: false,
                categoryorder: "array",
                categoryarray: chartData.xLabels,
                fixedrange: true,
                tickangle: 0,
                tickmode: "array",
                ticktext: chartData.xLabels.map((label) =>
                  createMultiLineLabel(label)
                ),
                tickvals: chartData.xLabels,
              },
              boxmode: "group",
              plot_bgcolor: "white",
              paper_bgcolor: "white",
              margin: {
                t: 40,
                r: 30,
                l: 50,
                b: chartData.xLabels.some((label) => label.length > 15)
                  ? 120
                  : 100,
              },
              legend: { orientation: "h", y: -0.2 },
            }}
            config={{
              responsive: true,
              displayModeBar: false,
              modeBarButtonsToRemove: [
                "zoom",
                "pan",
                "select",
                "lasso2d",
                "resetScale2d",
              ],
              scrollZoom: false,
              displaylogo: false,
              toImageButtonOptions: {
                format: "png",
                filename: "chart",
                height: 500,
                width: 700,
                scale: 1,
              },
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
