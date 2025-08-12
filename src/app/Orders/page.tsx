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
  Legend
);

export default function Order() {
  type Order = {
    _id: string;
    date: string;
    customerName: string;
    items: { productName: string; quantity: number }[];
    status: "pending" | "completed";
    totalPrice: number;
  };

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .then((data: any) => processWeeklyData(data))
      .catch((error) => console.error("Error fetching orders", error));
  }, []);

  const [orders, setOrders] = useState<Order[]>([]);
  const [weeklyData, setWeeklyData] = useState<number[]>([]);

  const processWeeklyData = (order: any[]) => {
    const weeklyTransactions = Array(7).fill(0);
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    order.forEach((order) => {
      const OrderDate = new Date(order.date);
      const diffDays = Math.floor(
        (OrderDate.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24)
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
              <th className="border px-4 py-2 text-rose-600">Order ID</th>
              <th className="border px-4 py-2 text-rose-600">Customer Name</th>
              <th className="border px-4 py-2 text-rose-600">Order Date</th>
              <th className="border px-4 py-2 text-rose-600">Total Amount</th>
              <th className="border px-4 py-2 text-rose-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2 text-black font-bold">
                  {order._id}
                </td>
                <td className="border px-4 py-2 text-black font-bold">
                  {order.customerName}
                </td>
                <td className="border px-4 py-2 text-black font-bold">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 text-black font-bold">
                  $
                  {order.totalPrice !== undefined
                    ? order.totalPrice.toFixed(2)
                    : "N/A"}
                </td>
                <td className="border px-4 py-2 text-rose-600 font-bold">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
