
import React from "react";

import { Bar } from "react-chartjs-2";


const SalesChart: React.FC<{ salesData: number[] }> = ({ salesData }) => {
  const data = {
    labels: ['January', 'febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54,162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: salesData,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return
  <Bar data={data} options={options} />


};

export default SalesChart
