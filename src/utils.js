export const getTabTitle = (pathname) => {
  if (pathname.startsWith("/analytics/charts")) {
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