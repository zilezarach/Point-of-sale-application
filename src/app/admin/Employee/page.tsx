import React from "react";
import Sidebar from "@/components/Sidebar"
import AddEmployeeForm from "@/components/AddEmployeeForm"

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-500">
      <div className="w-1/4">
          <Sidebar/>
      </div>
      <div className="w-3/4 p-6">
        <h2 className="font-bold text-2xl mb-6">Employee Management</h2>
        <AddEmployeeForm/>
      </div>
    </div>
  )
}
