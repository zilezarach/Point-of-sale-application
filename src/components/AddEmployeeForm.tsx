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
  const [role, setRole] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      router.push("/admin/employeeMan");
    } else {
      setToken(savedToken);
      fetchEmployees(savedToken);
    }
  }, []);

  const fetchEmployees = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/employee", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error(error.response.data.message);
      setError("No Employees in roster");
    }
  };

  const handleAddEmployee = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/employee",
        { username, password, email, role, name },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchEmployees(token);
      setUsername("");
      setPassword("");
      setEmail("");
      setName("");
      setRole("");
    } catch (error) {
      console.error(error.response.data.message);
      setError("Error adding Employee");
    }
  };

  const handleRemoveEmployee = async (id: String) => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees(token);
    } catch (error) {
      console.error(error.response.data.message);
      setError("Error removing employee");
    }
  };

  return (
    <div className="container mx-auto mb-5">
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
            <span className="border border-rose-600">
              {employee.name} ({employee.email}) - {employee.role} -{" "}
              {employee.username}
            </span>
            <button
              onClick={() => handleRemoveEmployee(employee._id)}
              className="rounded bg-rose-600 text-white mb-4 p-3"
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
