export const getTabTitle = (pathname) => {
    // Split the pathname by '/'
    const pathSegments = pathname.split('/').filter(Boolean);  // filter(Boolean) removes empty segments

    // Check if the pathname starts with "/analytics"
    if (pathname.startsWith("/analytics")) {
        // If there's only one segment after "/analytics", return "DANH SÁCH SINH VIÊN"
        if (pathSegments.length === 2) {
            return "DANH SÁCH SINH VIÊN";
        }
        // If there are more than one segment after "/analytics", return "THỐNG KÊ KẾT QUẢ HỌC TẬP"
        else if (pathSegments.length > 2) {
            return "THỐNG KÊ KẾT QUẢ HỌC TẬP";
        }
    }

    if (pathname === "/analytics") {
        return "BIỂU ĐỒ VÀ BÁO CÁO";
    } else if (pathname.startsWith("/analytics/learning-outcome")) {
        return "KẾT QUẢ HỌC TẬP";
    } else if (pathname.startsWith("/")) {
        return "TRANG CHỦ";
    } else if (pathname.startsWith("/predictions/fraud-detection")) {
        return "PHÁT HIỆN GIAN LẬN";
    } else if (pathname.startsWith("/predictions/predict-achievements")) {
        return "DỰ ĐOÁN THÀNH TÍCH";
    }
    return "TIÊU ĐỀ";
}