import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SaleOverview from "@/components/SaleOverview";

export default function Page() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className=" flex flex-col flex-grow">
        <Header />
        <div className="flex flex-col flex-grow p-4 bg-gray-200">
          <SaleOverview />
        </div>
      </div>
    </div>
  );
}
