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
    { subject: "Giữa kỳ", key: "midterm_avg" },
    { subject: "Thực hành", key: "practice_avg" },
    { subject: "Đồ án", key: "project_avg" },
    { subject: "Cuối kỳ", key: "final_avg" },
    { subject: "Tổng", key: "total_avg" },
  ];

  return (
    <div style={{ display: "flex", gap: "80px", flexWrap: "wrap", justifyContent: "center" }}>
      {data.map((item, index) => (
        <div key={index} style={{ width: "300px", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={70} data={radarData.map((d) => ({
              subject: d.subject,
              value: item[d.key],
            }))}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[0, 10]} />
              <Tooltip />
              <Radar
                name={getDisplayName(item)}
                dataKey="value"
                stroke={getClassColor(index)}
                fill={getClassColor(index)}
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
