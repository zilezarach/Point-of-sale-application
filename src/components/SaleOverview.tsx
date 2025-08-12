"use client";
import React, { useEffect, useState } from "react";
import SalesChart from "@/components/SalesChart";

const SaleOverview = () => {
  const [salesData, setSalesData] = useState(Array(12).fill(0));
  const [customerData, setCustomerData] = useState(Array(12).fill(0));
  const [orderData, setOrderData] = useState(Array(12).fill(0));

  useEffect(() => {
    fetchSales();
    fetchOrders();
    fetchCustomers();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await fetch("/api/transactions");
      const transactions = await res.json();

      const monthlySales = Array(12).fill(0);
      transactions.forEach((t: any) => {
        const month = new Date(t.date).getMonth();
        monthlySales[month] += t.amount || 0;
      });

      setSalesData(monthlySales);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const orders = await res.json();

      const monthlyOrders = Array(12).fill(0);
      orders.forEach((o: any) => {
        const month = new Date(o.date).getMonth();
        monthlyOrders[month] += 1;
      });

      setOrderData(monthlyOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/customers");
      const customers = await res.json();

      const monthlyCustomers = Array(12).fill(0);
      customers.forEach((c: any) => {
        const month = new Date(c.createdAt || c.date).getMonth();
        monthlyCustomers[month] += 1;
      });

      setCustomerData(monthlyCustomers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md h-screen">
      <h2 className="text-2xl font-bold mb-4 text-rose-500 no-underline hover:underline">
        Sales Overview
      </h2>
      <SalesChart
        salesData={salesData}
        customerData={customerData}
        orderData={orderData}
      />
    </div>
  );
};

export default SaleOverview;
