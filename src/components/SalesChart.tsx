"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ✅ Define props type
interface SalesChartProps {
  salesData: number[];
  customerData: number[];
  orderData: number[];
}

const SalesChart: React.FC<SalesChartProps> = ({
  salesData,
  customerData,
  orderData,
}) => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Sales (Ksh)",
        backgroundColor: "rgba(244, 63, 94, 0.6)", // rose-500
        borderColor: "rgba(244, 63, 94, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(244, 63, 94, 0.8)",
        hoverBorderColor: "rgba(244, 63, 94, 1)",
        data: salesData,
      },
      {
        label: "Customers",
        backgroundColor: "rgba(16, 185, 129, 0.6)", // emerald-500
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(16, 185, 129, 0.8)",
        hoverBorderColor: "rgba(16, 185, 129, 1)",
        data: customerData,
      },
      {
        label: "Orders",
        backgroundColor: "rgba(59, 130, 246, 0.6)", // blue-500
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(59, 130, 246, 0.8)",
        hoverBorderColor: "rgba(59, 130, 246, 1)",
        data: orderData,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SalesChart;
