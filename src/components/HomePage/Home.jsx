import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import SecurityIcon from "@mui/icons-material/Security";
import { useRouter } from "next/router";
import "@fontsource/inter";

const features = [
  {
    title: "Phân Tích Thống Kê",
    description:
      "Khám phá dữ liệu học tập thông qua các biểu đồ sinh động và dễ hiểu.",
    icon: AutoGraphIcon,
    colorStart: "#3b82f6",
    colorEnd: "#06b6d4",
    badge: "Analytics",
    link: "/analytics/reports-and-statistics",
  },
  {
    title: "Dự Đoán Thành Tích",
    description:
      "Dự đoán kết quả học tập trong tương lai dựa trên dữ liệu hiện tại.",
    icon: BatchPredictionIcon,
    colorStart: "#22c55e",
    colorEnd: "#10b981",
    badge: "Prediction",
    link: "/predictions/predict-achievements",
  },
  {
    title: "Phát Hiện Gian Lận",
    description:
      "Phân tích hành vi bất thường để phát hiện các dấu hiệu gian lận.",
    icon: SecurityIcon,
    colorStart: "#ef4444",
    colorEnd: "#f97316",
    badge: "Discovery",
    link: "/predictions/fraud-detection",
  },
];

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)`,
        py: 8,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 10 }}>
        <Typography
          variant="h2"
          fontWeight={900}
          sx={{
            fontFamily: "'Inter', sans-serif",
            background: `linear-gradient(90deg, #1e40af, #8b5cf6, #1e40af)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
            lineHeight: 1.1,
          }}
        >
          Khám Phá Dữ Liệu
          <br />
          <Box
            component="span"
            sx={{
              fontFamily: "'Inter', sans-serif",
              background: `linear-gradient(90deg, #3b82f6, #8b5cf6)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Học Tập Thông Minh
          </Box>
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto", mb: 6, fontWeight: 400 }}
        >
          Nền tảng phân tích dữ liệu giáo dục tiên tiến với các công cụ trực
          quan hóa mạnh mẽ, giúp bạn hiểu sâu hơn về quá trình học tập và đưa ra
          quyết định thông minh
        </Typography>
      </Container>

      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  onClick={() => router.push(feature.link)}
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255, 255, 255, 0.75)",
                    boxShadow:
                      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow:
                        "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 10px 10px -5px rgb(0 0 0 / 0.1)",
                      transform: "translateY(-8px)",
                      "& .iconWrapper": {
                        transform: "scale(1.1)",
                        filter: "drop-shadow(0 0 5px rgba(0,0,0,0.2))",
                      },
                      "& h3": {
                        color: theme.palette.primary.dark,
                      },
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Box
                      className="iconWrapper"
                      sx={{
                        width: 64,
                        height: 64,
                        mx: "auto",
                        mb: 2,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${feature.colorStart}, ${feature.colorEnd})`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Icon fontSize="large" />
                    </Box>

                    <Box
                      sx={{
                        mb: 1,
                        px: 1.8,
                        py: 0.5,
                        fontWeight: 700,
                        color: feature.colorStart,
                        borderRadius: "999px",
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        display: "inline-block",
                        userSelect: "none",
                        letterSpacing: 0.5,
                        border: `1.5px solid ${feature.colorStart}`,
                      }}
                    >
                      {feature.badge}
                    </Box>

                    <Typography
                      variant="h6"
                      component="h3"
                      fontWeight={700}
                      sx={{ mb: 1, transition: "color 0.3s ease" }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 400, lineHeight: 1.5 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Box
        sx={{
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          borderRadius: 4,
          p: { xs: 4, md: 6 },
          color: "common.white",
          textAlign: "center",
          mx: "auto",
          maxWidth: 1150,
          boxShadow: "0 12px 24px rgba(59, 130, 246, 0.5)",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={2}>
          Sẵn sàng khám phá dữ liệu?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            opacity: 0.85,
            fontWeight: 400,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Bắt đầu hành trình phân tích dữ liệu học tập của bạn ngay hôm nay với
          các công cụ mạnh mẽ và trực quan.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            onClick={() => router.push("/analytics/reports-and-statistics")}
            sx={{
              backgroundColor: "white",
              color: "#2563eb",
              px: 6,
              fontWeight: 700,
              borderRadius: 1,
              textTransform: "none",
            }}
          >
            Bắt đầu phân tích
          </Button>
          <Button
            variant="outlined"
            color="common"
            size="large"
            onClick={() => router.push("/predictions/predict-achievements")}
            sx={{
              px: 6,
              borderColor: "white",
              color: "white",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#e0e7ff",
                color: "#1e40af",
                textTransform: "none",
              },
            }}
          >
            Xem dự đoán
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
