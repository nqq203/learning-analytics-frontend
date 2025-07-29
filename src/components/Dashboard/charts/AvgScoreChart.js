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
} from "@mui/material";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
const PlotlyBoxPlot = dynamic(() => import("./PlotlyBoxPlot"), { ssr: false });
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const CustomYAxisLabel = ({ x, y, payload }) => {
  if (payload && payload.value === 10) {
    return (
      <g transform={`translate(${x - 30},${y - 30})`}>
        <text x={0} y={0} dy={16} textAnchor="start" fill="#64748b" fontSize="12" fontWeight="bold">
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
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
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

export function AvgScoreChart({ data = [], selectedSubject = '', selectedYear = '' }) {
  const theme = useTheme();
  const [scale, setScale] = useState(10);

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

    return lines.join('<br>');
  };

  let xLabels = [];
  let boxPlotData = [];

  if (isSubjectFilter && !isYearFilter) {
    // Filter theo môn: trục hoành là lớp, show điểm trung bình các lớp của môn đó
    xLabels = data.map((d) => d.name);
    boxPlotData = [{
      y: data.map((d) => d.value),
      x: xLabels,
      name: 'Điểm TB',
      type: 'box',
      boxpoints: 'all',
      jitter: 0.5,
      whiskerwidth: 0.2,
      marker: { size: 4, color: '#3b82f6' },
      line: { width: 2, color: '#1d4ed8' },
      hoverinfo: 'y+name',
      hovertemplate: '<b>%{x}</b><br>Điểm TB: %{y}<extra></extra>'
    }];
  } else if (!isSubjectFilter && isYearFilter) {
    // Filter theo khoá: trục hoành là môn, show điểm trung bình các môn theo khoá
    xLabels = data.map((d) => d.name);
    boxPlotData = [{
      y: data.map((d) => d.value),
      x: xLabels,
      name: 'Điểm TB',
      type: 'box',
      boxpoints: 'all',
      jitter: 0.5,
      whiskerwidth: 0.2,
      marker: { size: 4, color: '#3b82f6' },
      line: { width: 2, color: '#1d4ed8' },
      hoverinfo: 'y+name',
      hovertemplate: '<b>%{x}</b><br>Điểm TB: %{y}<extra></extra>'
    }];
  } else if (isSubjectFilter && isYearFilter) {
    // Filter cả 2: trục hoành là lớp, show điểm trung bình các lớp của môn đó, chỉ lấy các lớp thuộc khoá đã chọn
    xLabels = data.map((d) => d.name);
    boxPlotData = [{
      y: data.map((d) => d.value),
      x: xLabels,
      name: 'Điểm TB',
      type: 'box',
      boxpoints: 'all',
      jitter: 0.5,
      whiskerwidth: 0.2,
      marker: { size: 4, color: '#3b82f6' },
      line: { width: 2, color: '#1d4ed8' },
      hoverinfo: 'y+name',
      hovertemplate: '<b>%{x}</b><br>Điểm TB: %{y}<extra></extra>'
    }];
  } else {
    // Không filter: trục hoành là môn, show điểm trung bình các môn
    xLabels = data.map((d) => d.name);
    boxPlotData = [{
      y: data.map((d) => d.value),
      x: xLabels,
      name: 'Điểm TB',
      type: 'box',
      boxpoints: 'all',
      jitter: 0.5,
      whiskerwidth: 0.2,
      marker: { size: 4, color: '#3b82f6' },
      line: { width: 2, color: '#1d4ed8' },
      hoverinfo: 'y+name',
      hovertemplate: '<b>%{x}</b><br>Điểm TB: %{y}<extra></extra>'
    }];
  }

  if (!data.length) {
    return (
      <Box sx={{ height: '100%' }}>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <ShowChartIcon />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="700" color="#1e293b">
                Phân bố điểm tổng kết
              </Typography>
              <Typography variant="body2" color="#64748b">
                Hiển thị điểm tổng kết theo từng khóa, môn.
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
              title: 'Phân bố điểm',
              dragmode: false,
              hovermode: 'closest',
              yaxis: {
                title: {
                  text: '',
                  font: { size: 14, color: '#64748b', weight: 'bold' },
                  standoff: 0,
                  y: 1.05
                },
                range: [0, 10],
                dtick: 1,
                zeroline: false,
                gridcolor: '#e2e8f0',
                tickfont: { color: '#64748b', size: 12 },
                titlefont: { size: 14, color: '#64748b' },
                fixedrange: true,
              },
              xaxis: {
                title: isSubjectFilter ? 'Lớp' : 'Môn',
                tickfont: { color: '#64748b', size: 12 },
                titlefont: { size: 14, color: '#64748b' },
                showgrid: false,
                categoryorder: 'array',
                categoryarray: [],
                fixedrange: true,
                tickangle: 0,
                tickmode: 'array',
                ticktext: [],
                tickvals: [],
              },
              boxmode: 'group',
              plot_bgcolor: 'white',
              paper_bgcolor: 'white',
              margin: { t: 40, r: 30, l: 50, b: 100 },
              legend: { orientation: 'h', y: -0.2 },
            }}
            config={{ 
              responsive: true, 
              displayModeBar: false,
              modeBarButtonsToRemove: ['zoom', 'pan', 'select', 'lasso2d', 'resetScale2d'],
              scrollZoom: false,
              displaylogo: false,
              toImageButtonOptions: {
                format: 'png',
                filename: 'chart',
                height: 500,
                width: 700,
                scale: 1
              }
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <ShowChartIcon />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="700" color="#1e293b">
            Phân bố điểm tổng kết
            </Typography>
            <Typography variant="body2" color="#64748b">
              Hiển thị điểm tổng kết theo từng khóa, môn.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Chart */}
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
          data={boxPlotData}
          layout={{
            title: 'Phân bố điểm',
            dragmode: false,
            hovermode: 'closest',
            yaxis: {
              title: {
                text: '',
                font: { size: 14, color: '#64748b', weight: 'bold' },
                standoff: 0,
                y: 1.05
              },
              range: [0, 10],
              dtick: 1,
              zeroline: false,
              gridcolor: '#e2e8f0',
              tickfont: { color: '#64748b', size: 12 },
              titlefont: { size: 14, color: '#64748b' },
              fixedrange: true,
            },
            xaxis: {
              title: isSubjectFilter ? 'Lớp' : 'Môn',
              tickfont: { color: '#64748b', size: 10 },
              titlefont: { size: 14, color: '#64748b' },
              showgrid: false,
              categoryorder: 'array',
              categoryarray: xLabels,
              fixedrange: true,
              tickangle: 0,
              tickmode: 'array',
              ticktext: xLabels.map(label => createMultiLineLabel(label)),
              tickvals: xLabels,
            },
            boxmode: 'group',
            plot_bgcolor: 'white',
            paper_bgcolor: 'white',
            margin: { t: 40, r: 30, l: 50, b: 100 },
            legend: { orientation: 'h', y: -0.2 },
          }}
          config={{ 
            responsive: true, 
            displayModeBar: false,
            modeBarButtonsToRemove: ['zoom', 'pan', 'select', 'lasso2d', 'resetScale2d'],
            scrollZoom: false,
            displaylogo: false,
            toImageButtonOptions: {
              format: 'png',
              filename: 'chart',
              height: 500,
              width: 700,
              scale: 1
            }
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
    </Box>
  );
}
