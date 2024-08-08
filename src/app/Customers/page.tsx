"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  type Customer = {
    name: string;
    phoneNumber: number;
  };

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phoneNumber }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Customer registered successfully");
    } else {
      setMessage(data.message || "Error registering customer");
    }
  };

  return <div></div>;
}
