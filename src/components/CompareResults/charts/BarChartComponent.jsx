import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarChartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 10]} tickCount={21} tick={{ fontSize: 12 }} /> 
        <Tooltip />
        <Legend />
        <Bar dataKey="midterm" fill="#8884d8" />
        <Bar dataKey="practice" fill="#82ca9d" />
        <Bar dataKey="project" fill="#ffc658" />
        <Bar dataKey="final" fill="#ff8042" />
        <Bar dataKey="total" fill="#8dd1e1" />
      </BarChart>
    </ResponsiveContainer>
  );
}


