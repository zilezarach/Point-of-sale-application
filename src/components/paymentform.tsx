import React from 'react';
import Image from 'next/image';

const paymentForm = () => {


  return (
    <div className='flex flex-col h-screen md:flex-row'>
      <div className='md:w-1/2 items-center justify-center bg-gray-200'>
        <Image src='/logo2.png' width={100} height={100} alt='company logo' />
        <form className='bg-white p-10 w-4/5 rounded shadow-md'>
          <h2 className='text-rose-500 font-bold text-center mb-4'>Select Payment Method:</h2>
          <div className='flex items-center mb-4'>
            <input type='checkbox' name='M-pesa' className='h-4 w-4 text-green-500 focus:ring-rose-600 border-gray-400 rounded' />
            <label htmlFor='M-pesa' className='text-sm font-medium text-black ml-3'>M-Pesa</label>
          </div>
        </form>
      </div>
      <div className='hidden md:block md:flex-1 bg-center bg-cover justify-center items-center' style={{ backgroundImage: 'url(/pigmoney.gif)' }}>



      </div>
    </div>
  )
}


export default paymentForm;
