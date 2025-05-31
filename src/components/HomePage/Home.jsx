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
import { motion } from "framer-motion";

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
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center", pt: 4, pb: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                display: "block",
                background: `linear-gradient(90deg, #1e40af, #8b5cf6, #1e40af)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Khám Phá Dữ Liệu
            </Box>
            <Box
              component="span"
              sx={{
                display: "block",
                background: `linear-gradient(90deg, #3b82f6, #8b5cf6)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Học Tập Thông Minh
            </Box>
          </Typography>
        </motion.div>
      </Container>

      <Container maxWidth="lg" sx={{ flexGrow: 1, mt: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} sm={4} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card
                    onClick={() => router.push(feature.link)}
                    sx={{
                      cursor: "pointer",
                      textAlign: "center",
                      px: 2,
                      py: 3,
                      borderRadius: 2,
                      height: "100%",
                      background: "#ffffffdd",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        boxShadow: 4,
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          mx: "auto",
                          mb: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${feature.colorStart}, ${feature.colorEnd})`,
                          color: "#fff",
                        }}
                      >
                        <Icon fontSize="medium" />
                      </Box>
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 1.5,
                          py: 0.5,
                          border: `1.5px solid ${feature.colorStart}`,
                          borderRadius: "999px",
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: feature.colorStart,
                            fontWeight: 600,
                            letterSpacing: 1,
                            textTransform: "uppercase",
                          }}
                        >
                          {feature.badge}
                        </Typography>
                      </Box>

                      <Typography variant="subtitle1" fontWeight={700}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            mt: 2,
            py: { xs: 4, md: 6 },
            px: 2,
            textAlign: "center",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            color: "white",
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            boxShadow: "0 -8px 24px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              mb: 2,
              letterSpacing: 1,
            }}
          >
            🎯 Sẵn sàng khám phá dữ liệu?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: "center",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "#2563eb",
                  textTransform: "none",
                  px: 4,
                  fontWeight: 600,
                  boxShadow: 2,
                  "&:hover": {
                    backgroundColor: "#e0e7ff",
                  },
                  width: { xs: "100%", sm: "auto" },
                }}
                onClick={() => router.push("/analytics/reports-and-statistics")}
              >
                Bắt đầu phân tích
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  textTransform: "none",
                  px: 4,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#f0f9ff",
                    color: "#1e40af",
                  },
                  width: { xs: "100%", sm: "auto" },
                }}
                onClick={() => router.push("/predictions/predict-achievements")}
              >
                Xem dự đoán
              </Button>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
