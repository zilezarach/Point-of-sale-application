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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
import { Bar } from "react-chartjs-2";

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
      "febuary",
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
        label: "Sales",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54,162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: salesData,
      },
      {
        label: "Customers",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: customerData,
      },
      {
        label: "Orders",
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(153, 102, 255, 0.8)",
        hoverBorderColor: "rgba(153, 102, 255, 1)",
        data: orderData,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SalesChart;
