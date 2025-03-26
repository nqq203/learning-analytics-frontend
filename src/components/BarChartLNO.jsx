"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), { ssr: false });

const scores = [
  { name: "Quizz 1", score: 9.7 },
  { name: "Quizz 2", score: 5.7 },
  { name: "Quizz 3", score: 6.7 },
  { name: "Giữa kỳ", score: 7.7 },
  { name: "Thành phần", score: 8.7 },
  { name: "Cuối Kỳ", score: 9.7 },
];

const BarChart = () => {
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
    <div style={{ height: "30rem",width:"40rem" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
