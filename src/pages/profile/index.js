import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormData({ email: user?.email || "", password: "" });
  }, [user]);

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setFormData({ email: user?.email || "", password: "" });
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: '#f8fafc',
        pb: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 8,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background: '#fff',
          boxShadow: '0 4px 24px rgba(30,58,138,0.08)',
          mt: 0,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            src={user?.avatarUrl || undefined}
            alt={user?.fullName}
            sx={{
              width: 110,
              height: 110,
              bgcolor: "#1e3a8a",
              fontSize: 40,
              mb: 2,
              color: "#fff",
              border: '4px solid #e0e7ef',
              boxShadow: '0 2px 8px rgba(30,58,138,0.10)',
            }}
          >
            {user?.fullName?.charAt(0)}
          </Avatar>
          <Typography variant="h5" fontWeight={700} color="#1e3a8a" gutterBottom>
            {user?.fullName}
          </Typography>
          <Typography variant="body1" color="#64748b" fontWeight={500}>
            {user?.role}
          </Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: '#e0e7ef' }} />

        {/* Form */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              value={formData.email}
              onChange={handleChange("email")}
              disabled={!isEditing}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#64748b',
                },
              }}
            />
          </Grid>
          {/*
          <Grid item xs={12}>
            <TextField
              label="Mật khẩu mới"
              fullWidth
              type="password"
              placeholder="Để trống nếu không đổi"
              value={formData.password}
              onChange={handleChange("password")}
              disabled={!isEditing}
            />
          </Grid>
          */}
          <Grid item xs={12}>
            <TextField
              label="Ngày tạo tài khoản"
              fullWidth
              value={
                user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                  : "Không xác định"
              }
              disabled
              InputProps={{ readOnly: true }}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#64748b',
                },
              }}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                bgcolor: '#059669',
                '&:hover': { bgcolor: '#047857' },
              }}
              color="success"
            >
              Chỉnh sửa
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 600,
                  color: '#dc2626',
                  borderColor: '#dc2626',
                  '&:hover': {
                    bgcolor: '#fee2e2',
                    borderColor: '#dc2626',
                  },
                }}
                color="error"
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 600,
                  bgcolor: '#1e3a8a',
                  '&:hover': { bgcolor: '#3b82f6' },
                }}
                color="primary"
              >
                Lưu
              </Button>
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Profile;
