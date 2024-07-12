'use client'

import { useRouter } from "next/navigation";
import React from "react";


const Header = () => {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <div className="bg-gray-300 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-rose-500">Welcome to Admin dashboard</h1>
      <button onClick={handleLogout} className="bg-rose-500 text-black p-2 rounded hover:bg-blue-500">Logout</button>
    </div>
  )
}


export default Header;
