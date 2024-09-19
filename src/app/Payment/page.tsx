'use client'

import React from "react";
import PaymentForm from '@/components/paymentform';
import { useSearchParams } from "next/navigation";


export default function Payment() {
  const searchParams = useSearchParams();
  const totalPrice = parseFloat(searchParams.get('total') || '0');

  const deliveryFee = parseFloat(searchParams.get("deliveryfee") || '0');
  const deliveryOption = searchParams.get('deliveryOption') || 'standard';
  return (
    <div>
      <p className="text-rose-500 font-bold"> Delivery Option: {deliveryOption}</p>
      <p>Delivery Fee:{deliveryFee}</p>
      <PaymentForm total={totalPrice} />
    </div>
  )
}
