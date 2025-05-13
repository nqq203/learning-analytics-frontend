import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function BarChartComponent({ data }) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="midterm" fill="hsl(var(--chart-1))" />
          <Bar dataKey="practice" fill="hsl(var(--chart-2))" />
          <Bar dataKey="project" fill="hsl(var(--chart-3))" />
          <Bar dataKey="final" fill="hsl(var(--chart-4))" />
          <Bar dataKey="total" fill="hsl(var(--chart-5))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
