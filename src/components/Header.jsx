import styled from "styled-components";
import { IconButton, Menu, MenuItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FilterAlt } from "@mui/icons-material";
import { useFilter } from "@/context/FilterContext";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout, refresh } from "@/redux/thunk/authThunk";
import { toast } from "react-toastify";

// Hoặc bạn có thể dùng <span className="material-icons">settings</span> 
// nếu bạn thích import từ CDN Material Icons.

const HeaderContainer = styled.header`
  position: ${props => !props.transparent ? 'static' : 'fixed'};
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => !props.transparent ? 'var(--white)' : 'transparent'};
  height: 60px;
  padding: 0 20px;
  box-shadow: ${props => !props.transparent ? '0px 2px 4px rgba(0, 0, 0, 0.1);' : 'None'};
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  font-size: 24px;
`;

export default function Header({ title }) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  // if (pathname === "/") return null; // tắt header ở trang chủ
  const isLoginPage = pathname === "/login"; // Kiểm tra có phải trang login không
  // State để quản lý mở/tắt menu
  const [anchorEl, setAnchorEl] = useState(null);
  const { showFilters, setShowFilters } = useFilter();
  const router = useRouter();
  const dispatch = useDispatch();

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
  const handleLogoutClick = async () => {
    // Ví dụ: Gọi API logout, hoặc xóa token
    try {
      await dispatch(logout());
      handleCloseMenu();
      router.replace('/login')
    } catch (error) {
      console.error(error);
      toast.error("Logout failed, somnething went wrong");
    }
  };

  console.log(pathname);

  return (
    <HeaderContainer transparent={pathname === "/"}>
      {/* Tiêu đề bên trái */}
      {pathname !== "/" ? <Title>{title || "Tiêu đề "}</Title> : <Title></Title>}

      {/* Icon “Cài đặt” bên phải */}
      {!isLoginPage && (
        <>
          <div>
            <IconButton onClick={handleOpenMenu}>
              <SettingsIcon />
            </IconButton>


            {
              router.pathname == "/dashboard" ?
                (
                  <IconButton
                    onClick={() => setShowFilters(!showFilters)}
                    sx={{ bgcolor: showFilters ? "#f5f5f5" : "transparent" }}
                  >
                    <FilterAlt />
                  </IconButton>
                )
                : (<></>)

            }



          </div>


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
