import {
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
  Box,
  Paper,
  Chip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import PeopleIcon from "@mui/icons-material/People";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const cardData = [
  {
    title: "Môn Học",
    subtitle: "Tổng số môn học",
    valueKey: "subjects",
    icon: <SchoolIcon fontSize="medium" />,
    color: "#3b82f6",
    bgColor: "#dbeafe",
    trend: "+12%",
    trendUp: true,
  },
  {
    title: "Học Phần / Lớp",
    subtitle: "Các lớp học phần",
    valueKey: "classes",
    icon: <ClassIcon fontSize="medium" />,
    color: "#10b981",
    bgColor: "#d1fae5",
    trend: "+8%",
    trendUp: true,
  },
  {
    title: "Tổng Số Sinh Viên",
    subtitle: "Sinh Viên Đang Theo Học",
    valueKey: "students",
    icon: <PeopleIcon fontSize="medium" />,
    color: "#8b5cf6",
    bgColor: "#ede9fe",
    trend: "+15%",
    trendUp: true,
  },
  {
    title: "Tỷ Lệ Rớt Môn",
    subtitle: "Tỷ lệ sinh viên rớt môn",
    valueKey: "dropoutRate",
    isPercentage: true,
    icon: <WarningAmberIcon fontSize="medium" />,
    color: "#f59e0b",
    bgColor: "#fef3c7",
    trend: "-5%",
    trendUp: false,
  },
];

export function DashboardCards({ data }) {
  const theme = useTheme();
  return (
    <Grid container spacing={3}>
      {cardData.map((item, index) => (
        <Grid item xs={12} sm={6} lg={3} key={index}>
          <Paper
            elevation={0}
            sx={{
              height: "100%",
              border: "1px solid #e2e8f0",
              borderRadius: 3,
              background: "white",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                transform: "translateY(-4px)",
                "& .card-icon": {
                  transform: "scale(1.1)",
                },
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}80 100%)`,
              },
            }}
          >
            <CardContent sx={{ p: 3, position: "relative" }}>
              <Box
                className="card-icon"
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: item.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.color,
                  transition: "all 0.3s ease",
                }}
              >
                {item.icon}
              </Box>

              <Box sx={{ pr: 6 }}>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  sx={{ 
                    color: "#1e293b",
                    mb: 0.5,
                    fontSize: "1rem"
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ 
                    color: "#64748b",
                    mb: 2,
                    fontSize: "0.875rem"
                  }}
                >
                  {item.subtitle}
                </Typography>

                <Typography 
                  variant="h3" 
                  fontWeight="700"
                  sx={{ 
                    color: "#0f172a",
                    mb: 1,
                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                    letterSpacing: "-0.02em"
                  }}
                >
                  {data?.[item.valueKey] !== undefined
                    ? item.isPercentage
                      ? `${data[item.valueKey]}%`
                      : data[item.valueKey].toLocaleString()
                    : "--"}
                </Typography>
              </Box>
            </CardContent>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
