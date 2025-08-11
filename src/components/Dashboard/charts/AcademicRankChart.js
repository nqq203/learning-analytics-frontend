import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Divider,
  Chip,
  Tooltip as MUI_Tooltip,
} from "@mui/material";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip
} from "recharts";
import { useSelector } from "react-redux";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import { LightbulbOutlined } from "@mui/icons-material";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
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
          Phân loại học lực: {data.name}
        </Typography>

        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: data.color,
            }}
          />
          <Typography variant="body2" color="#64748b">
            Sinh viên:
          </Typography>
          <Typography variant="body2" fontWeight="600" color="#0f172a">
            {data.value} ({data.payload.percentage})
          </Typography>
        </Box>
      </Paper>
    );
  }
  return null;
};

export function AcademicRankChart() {
  const { academicRankData = [] } = useSelector((state) => state.dashboard);

  if (!Array.isArray(academicRankData) || academicRankData.length === 0)
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <SchoolIcon sx={{ fontSize: 48, color: "#64748b", mb: 2 }} />
        <Typography variant="h6" color="#64748b">
          Không có dữ liệu
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ height: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <EmojiEventsIcon />
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6" fontWeight="700" color="#1e293b">
                Phân loại học lực
              </Typography>

              <MUI_Tooltip
                arrow
                title={
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Hướng dẫn đọc & ý nghĩa biểu đồ Phân loại học lực
                    </Typography>
                    <Typography variant="body2">
                      <strong>Cách đọc:</strong>
                      <br />
                      • Biểu đồ hình tròn thể hiện tỷ lệ phần trăm sinh viên ở
                      từng mức học lực.
                      <br />
                      • Mỗi màu tương ứng với một mức học lực:
                      <br />
                      &nbsp;&nbsp;•{" "}
                      <span style={{ color: "#4285F4" }}>Xanh dương</span> –
                      Giỏi
                      <br />
                      &nbsp;&nbsp;•{" "}
                      <span style={{ color: "#34A853" }}>Xanh lá</span> – Khá
                      <br />
                      &nbsp;&nbsp;•{" "}
                      <span style={{ color: "#FBBC05" }}>Cam</span> – Trung bình
                      <br />
                      &nbsp;&nbsp;• <span style={{ color: "#EA4335" }}>
                        Đỏ
                      </span>{" "}
                      – Yếu
                      <br />• Con số bên cạnh tên mức học lực là{" "}
                      <strong>số lượng sinh viên</strong> và{" "}
                      <strong>tỷ lệ %</strong> của tổng số.
                      <br />
                      <br />
                      <strong>Ý nghĩa trong dữ liệu này:</strong>
                      <br />
                      • Giúp nhìn nhanh cơ cấu học lực của toàn bộ sinh viên.
                      <br />
                      • Xác định tỷ lệ sinh viên đạt kết quả cao (Giỏi, Khá) so
                      với nhóm cần hỗ trợ (Trung bình, Yếu).
                      <br />• Hỗ trợ nhà trường/giảng viên đánh giá chất lượng
                      đào tạo và đưa ra biện pháp cải thiện phù hợp.
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
                    bgcolor: "#efb15a",
                    borderRadius: "50%",
                    p: "2px",
                    fontSize: 20,
                    color: "#ffffff",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                />
              </MUI_Tooltip>
            </Box>

            <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
              Phân bố xếp loại học lực của sinh viên theo phần trăm.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              height: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={academicRankData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  startAngle={90}
                  endAngle={-270}
                  labelLine={false}
                  paddingAngle={2}
                >
                  {academicRankData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        {/* Legend */}
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: { xs: 2, lg: 6 },
              height: "fit-content",
            }}
          >
            {academicRankData.map((item, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 2.5,
                  border: "1px solid #e2e8f0",
                  borderRadius: 3,
                  background: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        bgcolor: COLORS[index % COLORS.length],
                        border: "2px solid white",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Box>
                      <Typography
                        fontWeight="600"
                        fontSize="1rem"
                        color="#1e293b"
                        sx={{ mb: 0.5 }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="#64748b"
                        fontSize="0.875rem"
                      >
                        {item.value} sinh viên
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={item.percentage}
                    sx={{
                      bgcolor: COLORS[index % COLORS.length] + "20",
                      color: COLORS[index % COLORS.length],
                      fontWeight: "700",
                      fontSize: "0.875rem",
                      minWidth: "60px",
                    }}
                  />
                </Box>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
