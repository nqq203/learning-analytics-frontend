"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), { ssr: false });



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
        backgroundColor: ["#FBB03B"],
        borderColor: ["#FBB03B"],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        // text: "Bảng điểm",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0, // Bắt đầu từ 2
        max: 10, // Kết thúc ở 10
        ticks: {
          stepSize: 2, // Chỉ hiển thị các giá trị 2, 4, 6, 8, 10
        },
      },
    },
  };

  return (
    <div style={{ height: "22rem",width:"40rem" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
