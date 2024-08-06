"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function Page() {
  type Order = {
    _id: string;
    date: string;
    customerName: string;
    items: { productName: string; quantity: number }[];
    status: "pending" | "completed";
    totalAmount: string;
  };

  useEffect(() => {
    fetch("api/orders")
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((error) => console.error("Error fetching orders", error));
  }, []);

  const [order, setOrder] = useState<Order[]>([]);
  const [weeklyData, setWeeklyData] = useState<number[]>([]);

  const processWeeklyData = (order: any[]) => {
    const weeklyTransactions = Array(7).fill(0);
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    order.forEach((order) => {
      const OrderDate = new Date(order.date);
      const diffDays = Math.floor(
        (OrderDate.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (diffDays >= 0 && diffDays < 7) {
        weeklyTransactions[diffDays]++;
      }
    });

    setWeeklyData(weeklyTransactions);
  };

  const chartData = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Orders",
        data: weeklyData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className=" min-h-screen container-none mx-auto bg-gray-300 px-4 ">
      <h1 className="text-center texl-2xl text-rose-600 mb-6 mt-6 font-bold no-underline hover:underline">
        Orders
      </h1>
      <div className="mb-8 shadow-md rounded  bg-white style={{ height: '400px' }}">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="flex items-center justify-center">
        <table className=" table-auto min-w-full bg-white shadow-md rounded ml-4 mr-4">
          <thead>
            <tr>
              <th className="py-2 text-rose-600 rounded">Customer Name</th>
              <th className="py-2 text-rose-600 rounded">Items</th>
              <th className="py-2 text-rose-600 rounded">Total Amount</th>
              <th className="py-2 text-rose-600 rounded">Status</th>
              <th className="py-2 text-rose-600 rounded">Date</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order.customerName}</td>
                <td className="border px-4 py-2">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.productName} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td className="border px-4 py-2">{order.totalAmount}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">
                  {new Date(order.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
