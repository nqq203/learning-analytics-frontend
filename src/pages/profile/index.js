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
    //API save info
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        pt: 5, 
        px: 2,
        pb: 4,
        minHeight: "calc(100vh - 64px)", 
        backgroundColor: "#f0f4f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 700,
          p: 4,
          borderRadius: 4,
          backgroundColor: "#ffffff",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            src={user?.avatarUrl || undefined}
            alt={user?.fullName}
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#90caf9",
              fontSize: 36,
              mb: 2,
              color: "#ffffff",
            }}
          >
            {user?.fullName?.charAt(0)}
          </Avatar>
          <Typography variant="h6" fontWeight={600} color="primary">
            {user?.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.role}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Form */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              value={formData.email}
              onChange={handleChange("email")}
              disabled={!isEditing}
            />
          </Grid>
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
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{ textTransform: "none", borderRadius: 2 }}
              color="primary"
            >
              Chỉnh sửa
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                sx={{ textTransform: "none", borderRadius: 2 }}
                color="inherit"
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{ textTransform: "none", borderRadius: 2 }}
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
