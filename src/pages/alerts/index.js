import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  ButtonGroup,
  Button,
} from "@mui/material";

const notifications = [
  {
    id: 1,
    title: "[CCSV] Danh sách sinh viên dưới trung bình",
    time: "Wednesday, 19 February 2025, 11:20 AM",
    subject: "Cơ sở dữ liệu",
    class: "23CLC02",
    exam: "Kiểm tra thực hành lần 1",
    type: "alert",
    content:
      "Dưới đây là danh sách các sinh viên có điểm dưới 5 trong bài Kiểm tra thực hành lần 1.",
  },
  {
    id: 2,
    title: "[THVP] Thông báo nộp bài tập tuần 5",
    time: "Monday, 17 February 2025, 3:00 PM",
    subject: "Tin học văn phòng",
    class: "23THVP01",
    exam: "Bài tập tuần 5",
    type: "reminder",
    content: "Nhắc nhở sinh viên nộp bài tập Excel tuần 5 trước thứ Sáu.",
  },
  {
    id: 3,
    title: "[AVCN] Báo cáo tiến độ project nhóm",
    time: "Saturday, 15 February 2025, 9:00 AM",
    subject: "An toàn và bảo mật hệ thống",
    class: "23SEC01",
    exam: "Project giữa kỳ",
    type: "reminder",
    content:
      "Tất cả các nhóm cần nộp báo cáo tiến độ cho giảng viên trước ngày 20 tháng 2.",
  },
  {
    id: 4,
    title: "[KTLT] Danh sách sinh viên vắng kiểm tra",
    time: "Thursday, 13 February 2025, 2:00 PM",
    subject: "Kỹ thuật lập trình",
    class: "23KTLT02",
    exam: "Bài kiểm tra giữa kỳ",
    type: "reminder",
    content:
      "Danh sách sinh viên vắng mặt không lý do trong buổi kiểm tra giữa kỳ được đăng tải tại đây.",
  },
  {
    id: 5,
    title: "[KTLT] Danh sách sinh viên vắng kiểm tra",
    time: "Thursday, 13 February 2025, 2:00 PM",
    subject: "Kỹ thuật lập trình",
    class: "23KTLT02",
    exam: "Bài kiểm tra giữa kỳ",
    type: "reminder",
    content:
      "Danh sách sinh viên vắng mặt không lý do trong buổi kiểm tra giữa kỳ được đăng tải tại đây.",
  },
  {
    id: 6,
    title: "[KTLT] Danh sách sinh viên vắng kiểm tra",
    time: "Thursday, 13 February 2025, 2:00 PM",
    subject: "Kỹ thuật lập trình",
    class: "23KTLT02",
    exam: "Bài kiểm tra giữa kỳ",
    type: "reminder",
    content:
      "Danh sách sinh viên vắng mặt không lý do trong buổi kiểm tra giữa kỳ được đăng tải tại đây.",
  },
];

const NotificationsPage = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(notifications[0].id);
  const [filterType, setFilterType] = useState("all");

  const selected = notifications.find((n) => n.id === selectedId);

  const filteredNotifications =
    filterType === "all"
      ? notifications
      : notifications.filter((n) => n.type === filterType);

  const handleNavigateToAlerts = () => {
    router.push("/alerts/notification");
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        p: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: "2.5vw",
            "@media (max-width:600px)": { fontSize: "6vw" },
            marginBottom: "2vh",
            marginTop: "2vh",
          }}
        >
          Thông báo
        </Typography>
        <ButtonGroup sx={{ mb: 2 }}>
          <Button
            variant={filterType === "all" ? "contained" : "outlined"}
            onClick={() => setFilterType("all")}
          >
            Tất cả
          </Button>
          <Button
            variant={filterType === "alert" ? "contained" : "outlined"}
            onClick={() => setFilterType("alert")}
          >
            Cảnh báo
          </Button>
          <Button
            variant={filterType === "reminder" ? "contained" : "outlined"}
            onClick={() => setFilterType("reminder")}
          >
            Nhắc nhở
          </Button>
        </ButtonGroup>
      </div>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        {/* Sidebar danh sách thông báo */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: "calc(100vh - 120px)",
              overflowY: "auto",
              pr: 1,
              border: "1px solid #ddd",
              borderRadius: 1,
            }}
          >
            {filteredNotifications.map((n) => (
              <Paper
                key={n.id}
                onClick={() => setSelectedId(n.id)}
                elevation={3}
                sx={{
                  p: "1.5vw",
                  mb: "2vh",
                  cursor: "pointer",
                  border:
                    n.id === selectedId
                      ? "2px solid #1976D2"
                      : "1px solid #ccc",
                  backgroundColor: n.id === selectedId ? "#BBDEFB" : "#fff",
                  "&:hover": {
                    backgroundColor: "#f1f8ff",
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    fontSize: "16px",
                    "@media (max-width:600px)": { fontSize: "11px" },
                  }}
                >
                  {n.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{
                    fontSize: "12px",
                    "@media (max-width:600px)": { fontSize: "8px" },
                  }}
                >
                  {n.time}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Grid>

        {/* Nội dung chi tiết thông báo */}
        <Grid item xs={12} md={8}>
          {selected && (
            <Paper
              elevation={3}
              sx={{
                p: "2vw",
                border: "2px solid #1976d2",
                borderRadius: 2,
                backgroundColor: "#f9fafb",
                height: "calc(100vh - 120px)",
                overflowY: "auto",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontSize: "22px",
                  "@media (max-width:600px)": { fontSize: "15px" },
                }}
              >
                {selected.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  mb: "2vh",
                  fontSize: "14px",
                  "@media (max-width:600px)": { fontSize: "11px" },
                }}
              >
                by System - {selected.time}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  fontSize: "16px",
                  "@media (max-width:600px)": { fontSize: "11px" },
                }}
              >
                Môn: <b>{selected.subject}</b>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  fontSize: "16px",
                  "@media (max-width:600px)": { fontSize: "11px" },
                }}
              >
                Lớp: <b>{selected.class}</b>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: "2vh",
                  fontSize: "16px",
                  "@media (max-width:600px)": { fontSize: "11px" },
                }}
              >
                {selected.content}
              </Typography>
              {selected.type === "alert" && (
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "16px",
                    "@media (max-width:600px)": { fontSize: "11px" },
                  }}
                  onClick={handleNavigateToAlerts}
                >
                  Danh sách sinh viên
                </Typography>
              )}
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotificationsPage;
