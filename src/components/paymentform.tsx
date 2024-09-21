import React, { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { TbCashBanknoteFilled } from 'react-icons/tb';

interface PaymentFormProps {
  total: number;
}

const paymentForm: React.FC<PaymentFormProps> = ({ total }) => {
  const searchParams = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState('mpesa')
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('KES');
  const totalPrice = parseFloat(searchParams.get('total') || '0');
  const deliveryFee = parseFloat(searchParams.get('deliveryFee') || '0');
  const deliveryOption = searchParams.get('deliveryOption' || 'standard');

  const finalAmount = totalPrice + deliveryFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/intasend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency,
          phone_number: phone,
          payment_method: paymentMethod,
        })
      })
    } catch (error) {
      console.error('Error processing payment ', error);
      alert('Error processing Payment');
    }
  }


  return (
    <div className='flex flex-col h-screen md:flex-row'>
      <div className='md:w-1/2 items-center justify-center bg-gray-200'>
        <Image src='/logo2.png' width={100} height={100} alt='company logo' />
        <h2 className="text-center text-rose-500 text-lg mb-4 mt-2 underline font-bold">Your Payment Information:</h2>
        <p className='text-center font-bold text-black'>Total Price: <strong>{totalPrice.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</strong></p>
        <p className='font-bold text-fuchsia-500 text-center mt-2'>Delivery Fee: <strong>{deliveryFee.toLocaleString('en-KE', {
          style: 'currency', currency: 'KES'
        })}</strong></p>
        <p className='font-bold text-lime-400 text-center mt-2 mb-4'>Final Amount: <strong>{finalAmount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</strong></p>
        <div className='flex items-center justify-center'>
          <form onSubmit={handleSubmit} className='  bg-white p-10 w-4/5 rounded shadow-md'>
            <h2 className='text-rose-500 font-bold text-center mb-4'>Make Payment:</h2>
            <label className='text-rose-500 font-bold ml-2'>Email:</label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='mb-4 border-2 p-2 rounded w-full' />
            <label className='text-rose-500 font-bold ml-2'>Phone number (For Mpesa):</label>
            <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} required={paymentMethod === 'mpesa'} className='mb-4 p-2 border-2 rounded w-full' />
            <label className='block mb-2'>Select Payment method: </label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className='mb-4 p-2 border w-full bg-rose-600 text-white rounded text-center hover:bg-blue-600'>
              <option value='mpesa'>M-Pesa</option>
              <option value='card'>Card</option>
            </select>
            <button type='submit' className='bg-rose-600 p-2 text-white rounded w-full text-center hover:bg-blue-600'>Pay</button>
          </form>
        </div>
      </div>
      <div className='hidden md:block md:flex-1 bg-center bg-cover justify-center items-center' style={{ backgroundImage: 'url(/pigmoney.gif)' }}>



      </div>
    </div >
  )
}


export default paymentForm;
