import { Typography } from "@mui/material";
import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarChartComponent({ data,scoreType }) {

  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}>
          <p>{`Tên lớp: ${label}`}</p>
          {payload.map((item, idx) => (
            <p key={idx} style={{ color: item.color }}>
              Điểm: {item.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };


  
  return (
    <>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 10]} tickCount={21} tick={{ fontSize: 12 }} /> 
          <Tooltip content={<CustomTooltip />} />

          {scoreType === "midterm" &&(<Bar dataKey="midterm" fill="#f95d6a" />)}
          {scoreType === "practice" &&(<Bar dataKey="practice" fill="#82ca9d" />)}
          {scoreType === "project" &&(<Bar dataKey="project" fill="#ffc658" />)}
          {scoreType === "final" &&(<Bar dataKey="final" fill="#d45087" />)}
          {scoreType === "total" &&(<Bar dataKey="total" fill="#8dd1e1" />)}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}


