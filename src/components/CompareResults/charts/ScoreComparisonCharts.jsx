import BarChartComponent from "./BarChartComponent"
import RadarChartComponent from "./RadarChartComponent"
import PieChartComponent from "./PieChartComponent"

export default function ScoreComparisonCharts({ chartType, data, getDisplayName, getClassColor }) {
  if (!data || data.length === 0) {
    return <div className="text-center py-10">Không có dữ liệu để hiển thị.</div>
  }

  if (chartType === "bar") {
    return <BarChartComponent data={data} />
  }

  if (chartType === "radar") {
    return (
      <RadarChartComponent
        data={data}
        getDisplayName={getDisplayName}
        getClassColor={getClassColor}
      />
    )
  }

  if (chartType === "pie") {
    return <PieChartComponent data={data} />
  }

  return <div className="text-center py-10">Loại biểu đồ không hợp lệ.</div>
}
