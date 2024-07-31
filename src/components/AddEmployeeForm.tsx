"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
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
      console.error("Error adding employee:", error);
      setError("Cannot add Employee");
    }
  };

  const handleRemoveEmployee = async (id: string) => {
    try {
      await axios.delete(`/api/employees/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      setError("Failed to delete employee");
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
      <div className="container mx-auto p-3">
        <div className="max-w-2xl mx-auto">
          <table className="min-w-full bg-white rounded">
            <thead>
              <tr>
                <th className="py-3 font-bold text-rose-600">Name</th>
                <th className="py-3 font-bold text-rose-600">Role</th>
                <th className="py-3 font-bold text-rose-600">Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td className="border px-4 py-2 font-bold text-rose-600">
                    {employee.name}
                  </td>
                  <td className="border px-4 py-2 font-bold text-black text-center">
                    {employee.role}
                  </td>

                  <td className="border px-4 py-2 text-black font-bold">
                    {employee.email}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleRemoveEmployee(employee._id)}
                      className="bg-rose-600 text-white hover:bg-indigo-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
