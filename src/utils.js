export const getTabTitle = (pathname) => {
    // Split the pathname by '/'
    const pathSegments = pathname.split('/').filter(Boolean);  // filter(Boolean) removes empty segments

    // Check if the pathname starts with "/analytics"
    if (pathname.startsWith("/analytics/reports-and-statistics")) {
        // If there's only one segment after "/analytics", return "DANH SÁCH SINH VIÊN"
        if (pathSegments.length === 2) {
            return "DANH SÁCH LỚP/MÔN";
        }
        // If there are more than one segment after "/analytics", return "THỐNG KÊ KẾT QUẢ HỌC TẬP"
        else if (pathSegments.length > 2) {
            return "THỐNG KÊ KẾT QUẢ HỌC TẬP";
        }
    }

    if (pathname === "/analytics/reports-and-statistics") {
        return "BIỂU ĐỒ VÀ BÁO CÁO";
    } else if (pathname.startsWith("/analytics/learning-outcome")) {
        return "KẾT QUẢ HỌC TẬP";
    } else if(pathname.startsWith("/analytics/compare")) {
        return "SO SÁNH KẾT QUẢ HỌC TẬP";
    } else if (pathname.startsWith("/predictions/fraud-detection")) {
        return "PHÁT HIỆN GIAN LẬN";
    } else if (pathname.startsWith("/predictions/predict-achievements")) {
        return "DỰ ĐOÁN THÀNH TÍCH";
    } else if(pathname.startsWith("/alerts")) {
        return "THÔNG BÁO"
    } else if(pathname.startsWith("/data-management/file-management")) {
        return "QUẢN LÝ TẬP TIN"
    } else if(pathname.startsWith("/data-management/student-management")) {
        return "QUẢN LÝ SINH VIÊN"
    } else if(pathname.startsWith("/data-management/class-management")) {
        return "QUẢN LÝ LỚP HỌC"
    }  else if (pathname.startsWith("/")) {
        return "TRANG CHỦ";
    } 
    
    return "TIÊU ĐỀ";
}