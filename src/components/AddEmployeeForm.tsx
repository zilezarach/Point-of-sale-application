"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
const AddEmployeeForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [employees, setEmployees] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get("http://localhost:5000/api/employees");
    setEmployees(response.data);
  };

  const handleAddEmployee = async () => {
    if (!email || !role || !username || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/employees", {
        email,
        role,
        username,
        password,
      });
      fetchEmployees();
      setUsername("");
      setEmail("");
      setRole("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="container mx-auto mb-5">
      <h1 className="font-bold text-2xl mb-5 text-rose-600">
        Manage Employees
      </h1>
      <h1 className="font-bold underline mb-5 text-white">Add employees</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded border border-rose-600 w-1/2 text-black"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border border-rose-600 w-1/2 text-black"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border border-rose-600 w-1/2 text-black"
        />
      </div>
      <button
        onSubmit={handleAddEmployee}
        className="p-3 bg-rose-600 rounded font-black hover:bg-indigo-700"
      >
        Register
      </button>
    </div>
  );
};

export default AddEmployeeForm;
