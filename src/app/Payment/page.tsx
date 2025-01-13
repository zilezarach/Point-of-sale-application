"use client";

import React, { useEffect, useState } from "react";
import PaymentForm from "@/components/paymentform";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Payment() {
  const searchParams = useSearchParams();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = parseFloat(searchParams.get("total") || "0");
    setTotal(totalPrice);
  }, [searchParams]);

  return <PaymentForm total={total} />;
}
