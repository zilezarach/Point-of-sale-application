'use client'

import React from "react";
import PaymentForm from '@/components/paymentform';
import { useSearchParams } from "next/navigation";

export default function Payment() {
  const searchParams = useSearchParams();
  const total = parseFloat(searchParams.get('total') || '0');

  return (
    <PaymentForm total={total} />
  )
}
