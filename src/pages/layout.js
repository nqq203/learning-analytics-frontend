import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import Sidebar from "@/components/Sidebar";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import Scrollbar from "@/components/Scrollbar";
import { useRouter } from "next/router";
import { getTabTitle } from "@/utils";

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: ${({ $isCollapsed }) =>
        $isCollapsed ? "calc(100% - 80px)" : "calc(100% - 260px)"};
  height: 100vh;
  transition: width 0.3s;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const RootLayout = ({ children }) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [title, setTitle] = useState("Tiêu đề");
    const router = useRouter();

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    const scrollbarStyle = {
        flex: 1,
        height: "100vh",
        overflowY: "auto",
    };
    

    useEffect(() => {
        const handledTitle = getTabTitle(router.pathname);
        setTitle(handledTitle);
    }, [router]);

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <AppWrapper>
                <Sidebar
                    role={"lecturer"}
                    isMobile={isMobile}
                    sidebarVisible={sidebarVisible}
                    toggleSidebar={toggleSidebar}
                />
                <ComponentWrapper $isCollapsed={isCollapsed}>
                    <Scrollbar style={scrollbarStyle}>
                        <Header title={title}/>
                        {children}
                    </Scrollbar>
                </ComponentWrapper>
            </AppWrapper>
        </>
    );
};

export default RootLayout;
