import React from "react";
import Sidebar from "@/components/Sidebar";
import AddEmployeeForm from "@/components/AddEmployeeForm";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-500">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 p-4">
        <AddEmployeeForm />
      </div>
    </div>
  );
}
