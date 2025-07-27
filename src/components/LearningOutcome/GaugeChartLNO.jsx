import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const GaugeChart = ({value}) => {
  const RADIAN = Math.PI / 180;
  const width = 590;
  const height = 350;

  const chartValue = value;

  const slices = [
    { value: 2.99, color: "#FF4545", name: "Kém (0-3)" },
    { value: 1.99, color: "#FF9C73", name: "Yếu (3-5)" },
    { value: 1.99, color: "#FBD288", name: "Trung bình (5-7)" },
    { value: 0.99, color: "#FCF596", name: "Khá (7-8)" },
    { value: 0.99, color: "#B4E380", name: "Giỏi (8-9)" },
    { value: 0.99, color: "#88D66C", name: "Xuất sắc (9-10)" },
  ];

  const pieProps = {
    startAngle: 180,
    endAngle: 0,
    cx: width / 2,
    cy: width / 2,
    isAnimationActive: false,
  };

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer>
        <PieChart width={width} height={height}>
          {/* Biểu đồ chính */}
          <Pie
            stroke="none"
            data={slices}
            innerRadius={(width / 2) * 0.5}
            outerRadius={(width / 2) * 0.8}
            {...pieProps}
            dataKey="value"
            nameKey="name"
          >
            {slices.map((slice, i) => (
              <Cell key={`cell-${i}`} fill={slice.color} stroke="none" />
            ))}
          </Pie>

          {/* Tooltip tuỳ biến */}
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div
                    style={{
                      background: "white",
                      border: "1px solid #ccc",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    {payload[0].name}
                  </div>
                );
              }
              return null;
            }}
          />

          {/* Tick các mốc số */}
          {[0, 3, 5, 7, 8, 9, 10].map((val, idx) => {
            const percent = val / 10;
            const angle = 180 - percent * 180;
            const radius = (width / 2) * 0.88;
            const x = width / 2 + radius * Math.cos(RADIAN * angle);
            const y = width / 2 - radius * Math.sin(RADIAN * angle);

            return (
              <g key={idx}>
                <text
                  x={x}
                  y={y + 10}
                  fontSize={20}
                  textAnchor="middle"
                  fill="#333"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Mũi tên vẽ thủ công */}
          <g>
            {(() => {
              const percent = chartValue / 10;
              const angle = 180 - percent * 180;
              const sin = Math.sin(-RADIAN * angle);
              const cos = Math.cos(-RADIAN * angle);
              const cx = width / 2;
              const cy = width / 2;
              const outerRadius = (width / 2) * 0.7;
              const mx = cx + outerRadius * cos;
              const my = cy + outerRadius * sin;

              return (
                <>
                  <path
                    d={`M${cx},${cy}L${mx},${my}`}
                    strokeWidth="6"
                    stroke="black"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx={cx} cy={cy} r={width * 0.05} fill="white" stroke="black" />
                </>
              );
            })()}
          </g>

          {/* Label có nền phía sau */}
          <g>
            <rect
              x={width / 2 - 50}
              y={width / 2 - 10}
              width={100}
              height={30}
              fill="#f0f0f0"
              rx={6}
            />
            <text
              x={width / 2}
              y={width / 2 + 10}
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
              fill="#333"
            >
              {`Điểm: ${chartValue}`}
            </text>
          </g>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GaugeChart;

