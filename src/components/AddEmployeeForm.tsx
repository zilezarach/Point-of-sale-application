"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Employee {
  _id: string;
  email: string;
  role: string;
  username: string;
  name: string;
}

const AddEmployeeForm = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [role, setRole] = useState<string>("Employee");
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>("/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      await axios.post("/api/employees", { username, password, role });
      setUsername("");
      setPassword("");
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error)
      setError("Cannot add Employee");
    }
  };

  const handleRemoveEmployee = async (id: string) => {
    try {
      await axios.delete(`/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error removing employee:", error);
      setError("Unable to remove employee")
    }
  };

  return (
    <div className="container mx-auto ml-20">
      <h1 className="font-bold text-2xl mb-5 text-rose-600">
        Manage Employees
      </h1>
      <h1 className="font-bold underline mb-5 text-white">Add employees</h1>
      {error && <p className=" mb-5 text-rose-600 font-bold">{error}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border border-rose-600 w-1/2 text-black"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
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
      <div className="mb-4">
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded border border-rose-600 w-1/2 text-black"
        />
      </div>
      <button
        onClick={handleAddEmployee}
        className="p-3 bg-rose-600 rounded font-black hover:bg-indigo-700 mb-6"
      >
        Register
      </button>
      <h2 className="text-rose-600 font-bold mb-6 text-2xl">Employee Roster</h2>
      <ul>
        {employees.map((employee) => (
          <li
            key={employee._id}
            className="flex justify-items-center mb-2 bg-rose-600"
          >
            <span className="border rounded border-rose-600">
              {employee.name} ({employee.email}) - {employee.role}
              {employee.username}
            </span>
            <button
              onClick={() => handleRemoveEmployee(employee._id)}
              className="rounded bg-blue-500 text-white mb-4 p-3"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddEmployeeForm;
