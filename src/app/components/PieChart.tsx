import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { IPieChartProps } from "../types/PieChartProps";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<IPieChartProps> = (options) => {
  const generatePastelColor = () => {
    const r = Math.floor(Math.random() * 127) + 127;
    const g = Math.floor(Math.random() * 127) + 127;
    const b = Math.floor(Math.random() * 127) + 127;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const data = {
    labels: options.options.map((option) => option.value),
    datasets: [
      {
        data: options.options.map((option) => option.votes + 1),
        backgroundColor: options.options.map(() => generatePastelColor()),
        borderWidth: 1,
      },
    ],
  };

  const optionss = {
    responsive: true,
    plugins: {
      tooltip: {
        // configure tooltips if needed
      },
      legend: {
        // position: "bottom",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "200px", height: "200px" }}>
      <Pie data={data} options={optionss} />
    </div>
  );
};

export default PieChart;
