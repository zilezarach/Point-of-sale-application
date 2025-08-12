"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Customer() {
  type Customer = {
    id: string;
    name: string;
    phoneNumber: number;
  };

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [sendToAll, setSendToAll] = useState(false);

  useEffect(() => {
    fetch("api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error Fetching Customers", error));
  }, []);

  const handleSubmit = async () => {
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

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allCustomerIds = customers.map((customer) => customer.id);
      setSelectedCustomers(allCustomerIds);
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (id: string) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(
        selectedCustomers.filter((customerId) => customerId !== id)
      );
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  const handleSend = () => {
    const recipents = sendToAll ? "all" : selectedCustomers;

    fetch("/api/notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipents, message }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Notification sent:", data))
      .catch((error) => console.log("Error sending Notification:", error));
  };

  return (
    <div className="flex h-screen bg-gray-600">
      <div className="container mx-auto">
        <h1 className="font-bold text-2xl mt-3 mb-4">Register Customers</h1>
        <div className="mb-5">
          <input
            type="text"
            value={name}
            placeholder="Customer Name"
            onChange={(e) => setName(e.target.value)}
            className="rounded border border-rose-500 text-black w-1/2"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            value={phoneNumber}
            placeholder="Customer's Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="rounded border border-rose-500 text-black w-1/2"
            required
          />
        </div>
        {message && <p className="text-rose-600 font-bold">{message}</p>}
        <button
          onClick={handleSubmit}
          className="p-3 bg-rose-500 rounded hover:bg-indigo-700 mb-5"
        >
          Register
        </button>
        <h2 className="font-bold text-2xl mt-3 mb-4">Manage Customers</h2>
        <table className=" min-w-full bg-white shadow-md rounded  border border-rose-500">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-3 font-bold text-rose-500">Name</th>
              <th className="py-3 font-bold text-rose-500">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleSelectCustomer(customer.id)}
                  />
                </td>
                <td className="text-rose-600 font-bold text-center">
                  {customer.name}
                </td>
                <td className="text-black font-bold text-center">
                  {customer.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="font-bold text-2xl mt-7 mb-4">
          Send Notfications to Customers
        </h2>
        <div className="mt-5">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write the message here.."
            className="w-1/2 rounded border border-rose-500"
          />
        </div>
        <div className="mt-5 mb-5">
          <input
            type="checkbox"
            checked={sendToAll}
            onChange={() => setSendToAll(!sendToAll)}
          />
          <label>Send To All Customers</label>
        </div>
        <button
          className="p-3 rounded bg-rose-500 hover:bg-indigo-700 mb-5"
          onClick={handleSend}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
