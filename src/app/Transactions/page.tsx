"use client";

import React, { useState, useEffect } from "react";
import GridStats from "@/components/gridStats";
import axios from "axios";
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

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  productInfo: string;
  paymentMethod: "Cash" | "MobileMoney";
}

export default function Page() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [weeklyData, setWeeklyData] = useState<number[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/transactions");
        const fetchedTransactions = response.data;

        setTransactions(fetchedTransactions);
        processWeeklyData(fetchedTransactions);
        calculateTotalAmount(fetchedTransactions); // Calculate total amount for the week
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  const processWeeklyData = (transactions: any[]) => {
    const weeklyTransactions = Array(7).fill(0);
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const diffDays = Math.floor(
        (transactionDate.getTime() - startOfWeek.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      if (diffDays >= 0 && diffDays < 7) {
        weeklyTransactions[diffDays]++;
      }
    });

    setWeeklyData(weeklyTransactions);
  };

  const calculateTotalAmount = (transactions: Transaction[]) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const total = transactions.reduce((sum, transaction) => {
      const transactionDate = new Date(transaction.date);
      if (transactionDate >= startOfWeek) {
        return sum + transaction.amount;
      }
      return sum;
    }, 0);
    setTotalAmount(total);
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
        label: "Transactions",
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
    <div className="min-h-screen container-none mx-auto bg-gray-300">
      <h1 className="text-center text-lg font-bold text-rose-600 no-underline hover:underline mb-5">
        Transactions Page
      </h1>
      <GridStats totalAmount={totalAmount} /> {/* Pass the total amount to GridStats */}
      <div className="mb-8 shadow-md rounded bg-white" style={{ height: '400px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
      <h1 className="mb-4 font-bold text-2xl text-rose-600 no-underline hover:underline">
        Recent Transactions
      </h1>
      <table className="min-w-full border border-gray-500 bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-rose-600">Date</th>
            <th className="py-2 px-4 border-b text-rose-600">Product</th>
            <th className="py-2 px-4 border-b text-rose-600">Amount</th>
            <th className="py-2 px-4 border-b text-rose-600">Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(transactions) ? (
            transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td className="py-2 px-4 border-b text-black">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b text-black">
                  {transaction.productInfo}
                </td>
                <td className="py-2 px-4 border-b text-black font-bold">
                  ${transaction.amount ? transaction.amount.toFixed(2) : "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-black font-bold">
                  {transaction.paymentMethod}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-2 px-4 border-b text-black">
                No transactions available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

