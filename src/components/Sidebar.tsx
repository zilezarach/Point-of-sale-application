import React from "react";

import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-full bg-gray-300 text-white p-4 w-64">
      <h2 className=" text-2xl font-bold text-rose-500 mb-4 no-underline hover:underline">Admin Dashboard</h2>
      <ul>
        <li className="mb-2">
          <Link href="admin/products" className="border-2 border-rose-600 hover:bg-blue-500 p-2 block rounded text-black font-bold">
            Product Management
          </Link>
        </li>
        <li className="mb-2">
          <Link href="admin/Employee" className="border-2 border-rose-600 hover:bg-blue-500 p-2 block rounded text-black font-bold">Employee Management</Link>
        </li>
        <li>
          <Link href="admin/orders" className="border-2 border-rose-600 hover:bg-blue-500 p-2 block rounded text-black font-bold">Order Management</Link>
        </li>
      </ul>
    </div>

  )

}

export default Sidebar;
