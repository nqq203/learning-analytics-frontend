import styled from "styled-components";
import { IconButton, Menu, MenuItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { usePathname } from "next/navigation";

// Hoặc bạn có thể dùng <span className="material-icons">settings</span> 
// nếu bạn thích import từ CDN Material Icons.

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--white);
  height: 60px;
  padding: 0 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  font-size: 24px;
`;

export default function Header({ title }) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const isLoginPage = pathname === "/login"; // Kiểm tra có phải trang login không
  // State để quản lý mở/tắt menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Mở menu (dropdown)
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Xử lý khi chọn "Profile"
  const handleProfileClick = () => {
    // Ví dụ: Chuyển trang profile, hoặc mở modal
    alert("Nhấn Profile");
    handleCloseMenu();
  };

  // Xử lý khi chọn "Logout"
  const handleLogoutClick = () => {
    // Ví dụ: Gọi API logout, hoặc xóa token
    alert("Nhấn Logout");
    handleCloseMenu();
  };

  return (
    <HeaderContainer>
      {/* Tiêu đề bên trái */}
      <Title>{title || "Tiêu đề "}</Title>

      {/* Icon “Cài đặt” bên phải */}
      {!isLoginPage && (
        <>
          <IconButton onClick={handleOpenMenu}>
            <SettingsIcon />
          </IconButton>
          {/* dropdown menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </HeaderContainer>
  );
}
