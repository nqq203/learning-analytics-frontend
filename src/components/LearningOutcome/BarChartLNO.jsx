"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import { Bar } from "react-chartjs-2";
// const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), { ssr: false });



const BarChart = ({studentGrade}) => {
  const scores = [
    { name: "Điểm đồ án",score: studentGrade.projectGrade},
    { name: "Điểm thực hành",score: studentGrade.practiceGrade },
    { name: "Điểm giữa kỳ",score: studentGrade.midtermGrade },
    { name: "Điểm cuối kỳ",score: studentGrade.finalGrade },
    { name: "Điểm tổng kết",score: studentGrade.totalGrade }
  ];
  const data = {
    labels: scores.map((item) => item.name),
    datasets: [
      {
        label: "Điểm số",
        data: scores.map((item) => item.score),
        backgroundColor: ["rgba(54, 162, 235, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 0.5)"],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  

  const barOptions = () => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Điểm" },
    },
  });


  return (
   
      <Bar data={data} options={barOptions()}  />
    
  );
};

export default BarChart;
