import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { Home, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar as toggleGlobalSidebar } from "../redux/slice/sidebarSlice";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import HomeIcon from "@mui/icons-material/Home";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import AddchartIcon from "@mui/icons-material/Addchart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Link from "next/link";
import { Button } from "@mui/material";
import { logout } from "@/redux/thunk/authThunk";
import LogoutIcon from '@mui/icons-material/Logout';

const SidebarWrapper = styled.div`
  z-index: 1100;
  width: ${({ $isMobile, $collapsed }) =>
    $isMobile ? `100%` : `${$collapsed ? "80px" : "260px"}`};
  transition: all 0.3s ease-in-out;
  background-color: var(--white);
  height: 100vh;
  position: ${({ $isMobile }) => ($isMobile ? "fixed" : "relative")};
  top: 0;
  left: ${({ $isMobile, $visible }) =>
    $isMobile && !$visible ? "-100%" : "0"};
  display: flex;
  flex-direction: column;
  align-items: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
  padding: 10px;
  box-shadow: ${({ $isMobile }) =>
    $isMobile
      ? "0px 0px 15px rgba(0, 0, 0, 0.3)"
      : "2px 0 5px rgba(0, 0, 0, 0.1)"};
  overflow-x: hidden;

  &::after {
    content: "";
    display: ${({ $isMobile, $visible }) =>
    $isMobile && $visible ? "block" : "none"};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
`;

const ToggleButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  cursor: pointer;
  color: var(--blue-700);
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  gap: 10px; /* Bạn có thể giữ gap cố định */
  justify-content: flex-start; /* Luôn căn trái */
  padding: 10px;
  color: ${({ $active }) => ($active ? "var(--blue-700)" : "var(--grey-600)")};
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  background-color: ${({ $active }) =>
    $active ? "var(--background)" : "transparent"};
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--background);
  }
`;

const NavIcon = styled.div`
  color: inherit;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 40px; /* Chiều rộng cố định cho icon */
  flex-shrink: 0;
`;

const NavText = styled.span`
  display: inline-block;
  max-width: ${({ $collapsed }) => ($collapsed ? "0" : "200px")};
  overflow: hidden;
  white-space: nowrap;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: max-width 0.3s ease-in-out, opacity 0.3s ease-in-out;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  margin-left: 5px; /* Giá trị cố định, không thay đổi */
  margin-top: 2px;
`;

// Section cho Logo
const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 10px;
`;

const LogoImage = styled.img`
  width: 80px;
`;

// Section cho Avatar & User Name (ở bottom của sidebar)
const UserProfileSection = styled.div`
  margin-top: auto;
  width: 100%;
  padding: 10px 0;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid var(--grey-400);
  width: 100%;
  margin-bottom: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  display: inline-block;
  max-width: ${({ $collapsed }) => ($collapsed ? "0" : "200px")};
  overflow: hidden;
  white-space: nowrap;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: max-width 0.3s ease-in-out, opacity 0.3s ease-in-out;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  margin-left: 10px;
  margin-top: 2px;
`;

const SubNavItem = styled(NavItem)`
  padding-left: 40px;
  font-size: 14px;
`;

const DropdownItem = styled.div`
  position: absolute;
  right: 20px;
`;

const ExpandableContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  margin: 4px 0;

  /* Màu nền thay đổi dựa trên props $open */
  background-color: ${({ $open }) =>
    $open ? "rgba(0,0,0,0.05)" : "transparent"};
  /* Bạn có thể dùng màu khác, ví dụ: #f2f2f2, #e8e8e8, v.v. */
  transition: background-color 0.3s ease;
`;

const LogoutNavItem = styled(NavItem)`
  color: var(--error-600) !important;
  border: 1px solid var(--error-600);
  border-radius: 10px;
  margin-top: 5px;
  height: 40px;
  gap: 35px;
  background-color: #fff;
  transition: background-color 0.2s, color 0.2s;
  &:hover {
    background-color: var(--error-600) !important;
    color: var(--white) !important;
  }
`

const Sidebar = ({
  role,
  isMobile,
  sidebarVisible,
  toggleSidebar: toggleProps,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isFetch } = useSelector((state) => state.sidebar);
  const [openStatistic, setOpenStatistic] = useState(false);
  const [openPrediction, setOpenPrediction] = useState(false);

  const handleToggleStatistic = () => {
    if (collapsed) toggleSidebar();

    setOpenStatistic((prev) => !prev);
  };

  const handleTogglePredictiion = () => {
    if (collapsed) toggleSidebar();

    setOpenPrediction((prev) => !prev);
  };

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
    dispatch(toggleGlobalSidebar(!collapsed));
    if (!collapsed) {
      setOpenStatistic(false);
      setOpenPrediction(false);
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };
  const handleLogoutClick = async () => {
    try {
      await dispatch(logout());
      router.replace("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed, something went wrong");
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <SidebarWrapper
      $collapsed={collapsed}
      $isMobile={isMobile}
      $visible={sidebarVisible}
    >
      {/* Toggle Button */}
      {!isMobile ? (
        <ToggleButton $collapsed={collapsed} onClick={toggleSidebar}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </ToggleButton>
      ) : (
        <ToggleButton>
          <CloseIcon onClick={toggleProps} />
        </ToggleButton>
      )}

      {/* Section Logo */}
      <LogoContainer $collapsed={collapsed}>
        <LogoImage src="/images/logo.png" alt="Logo" $collapsed={collapsed} />
      </LogoContainer>

      {/* Navigation Items */}
      <Link href="/" passHref style={{ width: "100%" }}>
        <NavItem
          $collapsed={collapsed}
          $active={router.pathname === "/"}
          $isMobile={isMobile}
          onClick={toggleProps}
        >
          <NavIcon>
            <HomeIcon />
          </NavIcon>
          <NavText
            $collapsed={collapsed}
            $isMobile={isMobile}
            $active={router.pathname === "/"}
          >
            {"TRANG CHỦ"}
          </NavText>
        </NavItem>
      </Link>
      <Link href="/dashboard" passHref style={{ width: "100%" }}>
        <NavItem
          $collapsed={collapsed}
          $active={router.pathname.startsWith("/dashboard")}
          $isMobile={isMobile}
          onClick={toggleProps}
        >
          <NavIcon>
            <SpaceDashboardIcon />
          </NavIcon>
          <NavText
            $collapsed={collapsed}
            $isMobile={isMobile}
            $active={router.pathname.startsWith("/dashboard")}
          >
            BẢNG ĐIỀU KHIỂN
          </NavText>
        </NavItem>
      </Link>

      <ExpandableContainer $open={openStatistic}>
        {/* Analytics Tab */}
        <NavItem
          $collapsed={collapsed}
          $active={router.pathname.startsWith("/analytics")}
          $isMobile={isMobile}
          onClick={handleToggleStatistic}
        >
          <NavIcon>
            <AutoGraphIcon />
          </NavIcon>
          <NavText
            $collapsed={collapsed}
            $isMobile={isMobile}
            $active={router.pathname.startsWith("/analytics")}
          >
            THỐNG KÊ
          </NavText>
          {!collapsed && (
            <DropdownItem>
              {openStatistic ? <ExpandLess /> : <ExpandMore />}
            </DropdownItem>
          )}
        </NavItem>

        {/* Analytics Collapsed */}
        <Collapse in={openStatistic} timeout="auto" unmountOnExit>
          <Link
            href="/analytics/reports-and-statistics"
            passHref
            style={{ width: "100%" }}
          >
            <SubNavItem
              $collapsed={collapsed}
              $active={router.pathname.startsWith(
                "/analytics/reports-and-statistics"
              )}
              $isMobile={isMobile}
            // onClick={toggleProps} // Nếu muốn đóng sidebar khi click
            >
              <NavText
                $collapsed={collapsed}
                $isMobile={isMobile}
                $active={router.pathname.startsWith(
                  "/analytics/reports-and-statistics"
                )}
              >
                THEO LỚP
              </NavText>
            </SubNavItem>
          </Link>

          <Link
            href="/analytics/learning-outcome"
            passHref
            style={{ width: "100%" }}
          >
            <SubNavItem
              $collapsed={collapsed}
              $active={router.pathname.startsWith(
                "/analytics/learning-outcome"
              )}
              $isMobile={isMobile}
            >
              <NavText
                $collapsed={collapsed}
                $isMobile={isMobile}
                $active={router.pathname.startsWith(
                  "/analytics/learning-outcome"
                )}
              >
                THEO SINH VIÊN
              </NavText>
            </SubNavItem>
          </Link>

          <Link href="/analytics/compare" passHref style={{ width: "100%" }}>
            <SubNavItem
              $collapsed={collapsed}
              $active={router.pathname.startsWith("/analytics/compare")}
              $isMobile={isMobile}
            >
              <NavText
                $collapsed={collapsed}
                $isMobile={isMobile}
                $active={router.pathname.startsWith("/analytics/compare")}
              >
                THEO MÔN
              </NavText>
            </SubNavItem>
          </Link>
        </Collapse>
      </ExpandableContainer>

      <ExpandableContainer $open={openPrediction}>
        {/* Predictions Tab */}

        <NavItem
          $collapsed={collapsed}
          $active={router.pathname.startsWith("/predictions")}
          $isMobile={isMobile}
          onClick={handleTogglePredictiion}
        >
          <NavIcon>
            <BatchPredictionIcon />
          </NavIcon>
          <NavText
            $collapsed={collapsed}
            $isMobile={isMobile}
            $active={router.pathname.startsWith("/predictions")}
          >
            DỰ ĐOÁN
          </NavText>
          {!collapsed && (
            <DropdownItem>
              {openPrediction ? <ExpandLess /> : <ExpandMore />}
            </DropdownItem>
          )}
        </NavItem>

        {/* Predictions Collapsed */}
        <Collapse in={openPrediction} timeout="auto" unmountOnExit>
          <Link
            href="/predictions/fraud-detection"
            passHref
            style={{ width: "100%" }}
          >
            <SubNavItem
              $collapsed={collapsed}
              $active={router.pathname.startsWith(
                "/predictions/fraud-detection"
              )}
              $isMobile={isMobile}
            // onClick={toggleProps} // Nếu muốn đóng sidebar khi click
            >
              <NavText
                $collapsed={collapsed}
                $isMobile={isMobile}
                $active={router.pathname.startsWith(
                  "/predictions/fraud-detection"
                )}
              >
                PHÁT HIỆN GIAN LẬN
              </NavText>
            </SubNavItem>
          </Link>

          <Link
            href="/predictions/predict-achievements"
            passHref
            style={{ width: "100%" }}
          >
            <SubNavItem
              $collapsed={collapsed}
              $active={router.pathname.startsWith(
                "/predictions/predict-achievements"
              )}
              $isMobile={isMobile}
            >
              <NavText
                $collapsed={collapsed}
                $isMobile={isMobile}
                $active={router.pathname.startsWith(
                  "/predictions/predict-achievements"
                )}
              >
                DỰ ĐOÁN THÀNH TÍCH
              </NavText>
            </SubNavItem>
          </Link>
        </Collapse>
      </ExpandableContainer>
      {/* <Link href="/alerts" passHref style={{ width: "100%" }}>

        <NavItem
          $collapsed={collapsed}
          $active={router.pathname === "/alerts"}
          $isMobile={isMobile}
          onClick={toggleProps}
        >
          <NavIcon>
            <NotificationsIcon />
          </NavIcon>
          <NavText $collapsed={collapsed} $isMobile={isMobile} $active={router.pathname === "/alerts"}>
            THÔNG BÁO
          </NavText>
        </NavItem>
      </Link>
      */}

      <Link href="/data-management" passHref style={{ width: "100%" }}>
        <NavItem
          $collapsed={collapsed}
          $active={router.pathname.startsWith("/data-management")}
          $isMobile={isMobile}
          onClick={toggleProps}
        >
          <NavIcon>
            <AddchartIcon />
          </NavIcon>
          <NavText
            $collapsed={collapsed}
            $isMobile={isMobile}
            $active={router.pathname.startsWith("/data-management")}
          >
            {"QUẢN LÝ"}
          </NavText>
        </NavItem>
      </Link>

      {/* Section Avatar & User Name ở Bottom */}
      <UserProfileSection>
        <Divider />
        <AvatarContainer onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <AvatarImage
            src={user?.avatar || "/images/avatar.png"}
            alt="Avatar"
            $collapsed={collapsed}
          />
          <UserName $collapsed={collapsed}>
            {user?.fullName || "User Name"}
          </UserName>
        </AvatarContainer>
        {/* <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={handleLogoutClick}
          startIcon={<LogoutIcon />}
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "row",
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: 0.5,
            borderColor: 'error.main',
            color: 'error.main',
            backgroundColor: '#fff',
            '&:hover': {
              backgroundColor: 'error.main',
              color: '#fff',
              borderColor: 'error.main',
            },
            // '& .MuiButton-startIcon': {
            //  marginRight: collapsed ? 0 : 1,
            // },
            // '& .MuiButton-label': {
            //  display: collapsed ? 'none' : 'block',
            // },
            // justifyContent: collapsed ? 'center' : 'flex-start',
            // minWidth: collapsed ? '40px' : 'auto',
            // width: collapsed ? '40px' : '100%',
            // height: collapsed ? '40px' : 'auto',
            // borderRadius: collapsed ? '50%' : 1,
          }}
        >
          <NavText
            $collapsed={collapsed}
            $isMobile={isMobile}>
            Đăng xuất
          </NavText>
        </Button> */}

        <LogoutNavItem
          $collapsed={collapsed}
          $isMobile={isMobile}
          onClick={handleLogoutClick}
          style={{
            color: "var(--error-600)",
            border: "1px solid var(--error-600)",
            borderRadius: '10px',
            marginTop: "5px",
            height: "40px",
            gap: '35px',
            '&:hover': {
              backgroundColor: 'var(--error-600)',
              color: 'var(--white)',
            }
          }}
        >
          <NavIcon>
            <LogoutIcon />
          </NavIcon>
          <NavText
            $collapsed={collapsed}
            $isMobile={isMobile}
          >
            {"Đăng xuất"}
          </NavText>
        </LogoutNavItem>
      </UserProfileSection>
    </SidebarWrapper>
  );
};

export default Sidebar;
