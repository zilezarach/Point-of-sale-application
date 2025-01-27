import React from "react";

import SalesChart from "@/components/SalesChart";

const SaleOverview: React.FC = () => {
  const salesData = [49, 49, 58, 30, 29, 39, 93, 30, 38, 30, 20, 30];
  const customerData = [39, 30, 23, 22, 12, 12, 11, 21, 12, 13, 16, 19];
  const orderData = [21, 22, 12, 11, 15, 12, 16, 12, 12, 12, 13, 21];
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
