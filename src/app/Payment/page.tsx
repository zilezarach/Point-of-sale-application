"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the PaymentForm component with no SSR
const PaymentForm = dynamic(() => import("@/components/paymentform"), {
  ssr: false,
});

export default function Payment() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // Access URL params
    const totalPrice = parseFloat(params.get("total") || "0");
    setTotal(totalPrice);
  }, []);

  if (total === null) {
    return <div>Loading...</div>;
  }

  return <PaymentForm total={total} />;
}
