"use client";
import React, { useState } from "react";

const AddEmployeeForm = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <form className="bg-white shadow-md rounded mb-4 p-6">
      <div className="mb-4">
        <h2 className="font-bold text-rose-500 text-2xl mb-4">Add Employee</h2>
      </div>
      <div className="mb-4">
        <label className="block text-rose-500 font-bold">Name</label>
        <input
          type="text"
          value={name}
          className="rounded border border-rose-500 w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-rose-500 font-bold">New Password</label>
        <input
          type="text"
          value={password}
          className="rounded border border-rose-500 w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-rose-500 font-bold">Email</label>
        <input
          type="text"
          value={email}
          className="rounded border border-rose-500 w-full p-2"
        />
      </div>
    </form>
  );
};

export default AddEmployeeForm;
