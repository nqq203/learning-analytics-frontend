import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export default function PieChartComponent({ data }) {
  // const pieData = data
  // .map((item) => ({
  //   name: item.class_name,
  //   value: item.total_avg != null ? item.total_avg : 0,
  // }))
  // .sort((a, b) => b.value - a.value);
  const pieData = data.map((item) => ({
  name: item.name,
  value: item.total, // đã đảm bảo total là số hợp lệ
  })).filter(item => item.value > 0);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={150}
          fill="#8884d8"
          label
          startAngle={90}     
          endAngle={-270}    
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="top" align="left" layout="vertical" />
      </PieChart>
    </ResponsiveContainer>
  );
}
