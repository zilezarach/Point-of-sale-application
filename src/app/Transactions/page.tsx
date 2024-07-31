"use client"

import React, { useState } from "react";
import GridStats from '@/components/gridStats';
import axios from "axios"



export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [setWeekly, setWeeklyData] = useState([]);



  return (
    <div className=" min-h-screen container-none mx-auto bg-gray-300">
      <h1 className="text-center text-lg font-bold text-rose-600 no-underline hover:underline mb-5">Transactions Page</h1>
      <GridStats />
      <div>
      </div>
    </div>
  )

}
