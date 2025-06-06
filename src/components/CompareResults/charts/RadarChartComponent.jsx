import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function RadarChartComponent({ data, getDisplayName, getClassColor }) {
  const radarData = [
    { subject: "Giữa kỳ", key: "midterm" },
    { subject: "Thực hành", key: "practice" },
    { subject: "Đồ án", key: "project" },
    { subject: "Cuối kỳ", key: "final" },
    { subject: "Tổng", key: "total" },
  ];

  return (
    <div style={{ display: "flex", gap: "80px", flexWrap: "wrap", justifyContent: "center" }}>
      {data.map((item, index) => (
        <div key={index} style={{ width: "300px", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              outerRadius={70}
              data={radarData.map((d) => ({
                subject: d.subject,
                value: item[d.key] ?? 0,
              }))}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[0, 10]} />
              <Tooltip />
              <Radar
                name={getDisplayName ? getDisplayName(item) : item.name}
                dataKey="value"
                stroke={getClassColor ? getClassColor(index) : "#8884d8"}
                fill={getClassColor ? getClassColor(index) : "#8884d8"}
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
