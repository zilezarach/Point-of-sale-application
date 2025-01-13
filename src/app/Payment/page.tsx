"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter
import dynamic from "next/dynamic";

// Dynamically import the PaymentForm component with no SSR
const PaymentForm = dynamic(() => import("@/components/paymentform"), {
  ssr: false,
});

export default function Payment() {
  const router = useRouter(); // Use useRouter instead of useSearchParams
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    // Access the query parameters via router.query
    const totalPrice = parseFloat((router.query.total as string) || "0");
    setTotal(totalPrice);
  }, [router.query]);

  if (total === null) {
    return <div>Loading...</div>;
  }

  return <PaymentForm total={total} />;
}
