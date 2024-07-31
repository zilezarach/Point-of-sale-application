import React from 'react'

import Sidebar from "@/components/Sidebar"

import AddProduct from "@/components/AddProductForm"

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-500">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className='w-3/4 p-4'>
        <AddProduct />
      </div>
    </div>
  )
}
