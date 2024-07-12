import React from "react";
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar";

export default function Page() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className=" flex flex-col flex-grow">
        <Header />
      </div>
    </div>
  )
}
