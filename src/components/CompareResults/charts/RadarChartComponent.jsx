import {
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

export default function RadarChartComponent({
  data,
  getDisplayName,
  getClassColor,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((item, index) => {
        const radarData = [
          { subject: "Giữa kỳ", value: item.midterm_avg },
          { subject: "Thực hành", value: item.practice_avg },
          { subject: "Đồ án", value: item.project_avg },
          { subject: "Cuối kỳ", value: item.final_avg },
          { subject: "Trung bình", value: item.total_avg },
        ];

        return (
          <div key={index} className="h-[300px]">
            <Card>
              <CardHeader
                title={
                  <Typography variant="body1">
                    {getDisplayName(item)}
                  </Typography>
                }
                subheader={`Số SV: ${item.total_students}`}
              />
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar
                      name={getDisplayName(item)}
                      dataKey="value"
                      stroke={getClassColor(index)}
                      fill={getClassColor(index)}
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
