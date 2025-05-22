import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirm = () => setShowConfirm((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !role
    ) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp.");
      return;
    }

    // TODO: Gọi API đăng ký thật tại đây
    console.log("Đăng ký thành công với dữ liệu:", {
      ...formData,
      role,
    });

    //chuyển hướng về trang đăng nhập
    window.location.href = "/auth/login";
  };

  return (
    <Box
      sx={{
        bgcolor: "#f0f0f0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            padding: 4,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img src="/images/logo.png" alt="Logo" style={{ height: 100 }} />
          </Box>

          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label={
                <>
                  Họ và tên <span style={{ color: "red" }}>(*)</span>
                </>
              }
              margin="normal"
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label={
                <>
                  Email <span style={{ color: "red" }}>(*)</span>
                </>
              }
              margin="normal"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label={
                <>
                  Tên đăng nhập <span style={{ color: "red" }}>(*)</span>
                </>
              }
              margin="normal"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>
                Mật khẩu <span style={{ color: "red" }}>(*)</span>
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={
                  <>
                    Mật khẩu <span style={{ color: "red" }}>(*)</span>
                  </>
                }
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>
                Nhập lại mật khẩu <span style={{ color: "red" }}>(*)</span>
              </InputLabel>
              <OutlinedInput
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirm}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={
                  <>
                    Nhập lại mật khẩu <span style={{ color: "red" }}>(*)</span>
                  </>
                }
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>
                Vai trò người dùng <span style={{ color: "red" }}>(*)</span>
              </InputLabel>
              <Select
                value={role}
                label={
                  <>
                    Vai trò người dùng <span style={{ color: "red" }}>(*)</span>
                  </>
                }
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="giangvien">Giảng viên</MenuItem>
                <MenuItem value="sinhvien">Sinh viên</MenuItem>
              </Select>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleRegister}
            >
              Đăng ký tài khoản
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" align="center">
              Bạn đã có tài khoản?{" "}
              <a href="/auth/login" style={{ color: "#1976d2" }}>
                Đăng nhập
              </a>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

Register.unauthorized = true;
