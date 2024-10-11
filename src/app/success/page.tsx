'use client'
import React from 'react';
import { useRouter } from 'next/navigation';


export default function Page() {
  const router = useRouter();

  const handleReturnShop = () => {
    router.push("/Shop");
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
      <h1 className='text-3xl font-bold text-rose-500 mb-4'> Transaction Successful!!</h1>
      <img
        src='/success pig.gif'
        alt="success"
        className='w-46 h-46 mb-6'
      />
      <p className='text-lg font-semibold text-rose-500 mb-4'>Thank you for your purchase! Your transaction has been completed successfully</p>
      <button onClick={handleReturnShop} className='bg-rose-500 text-white px-3 py-3 hover:bg-blue-700 rounded-md'>Return to Shop</button>
    </div>
  )
}
