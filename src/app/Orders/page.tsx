"use client";

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

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

  return (
    <div className=" min-h-screen container-none mx-auto bg-gray-300 px-4 ">
      <h1 className="text-center texl-2xl text-rose-600 mb-6 mt-6 font-bold no-underline hover:underline">
        Orders
      </h1>
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
