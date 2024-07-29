import React from "react";
import GridStats from '@/components/gridStats';

export default function Page() {
  return (
    <div className="container-none mx-auto bg-gray-300">
      <h1 className="text-center text-lg font-bold text-rose-600 no-underline hover:underline mb-5">Transactions Page</h1>
      <GridStats />
    </div>
  )

}
