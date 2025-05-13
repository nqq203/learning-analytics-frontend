import BarChartComponent from "./BarChartComponent"
import RadarChartComponent from "./RadarChartComponent"
import PieChartComponent from "./PieChartComponent"

export default function ScoreComparisonCharts({ chartType, data, getDisplayName, getClassColor }) {
  if (!data || data.length === 0) {
    return <div className="text-center py-10">Không có dữ liệu để hiển thị.</div>
  }

  if (chartType === "bar") {
    const barData = data.map((item) => ({
      name: item.class_name,
      midterm: item.midterm_avg,
      practice: item.practice_avg,
      project: item.project_avg,
      final: item.final_avg,
      total: item.total_avg,
    }))
    return <BarChartComponent data={barData} />
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
