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
  const [role, setRole] = useState<string>("employee");
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    if (!name || !username || !password || !email || !role) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post("/api/employees", {
        name,
        username,
        password,
        role,
        email,
      });

      setSuccess("✅ Employee added successfully!");
      setName("");
      setUsername("");
      setPassword("");
      setRole("employee");
      setEmail("");
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
      setError("❌ Cannot add employee. Please try again.");
    } finally {
      setLoading(false);
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
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-2xl mb-5 text-rose-600">
        Manage Employees
      </h1>
      <h1 className="font-bold underline mb-5 text-white">Add employees</h1>
      {error && <p className="mb-5 text-rose-600 font-bold">{error}</p>}
      {success && <p className="mb-5 text-green-600 font-bold">{success}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border border-rose-600 p-2 text-black"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded border border-rose-600 p-2 text-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border border-rose-600 p-2 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border border-rose-600 p-2 text-black"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded border border-rose-600 p-2 text-black"
        />
      </div>
      <button
        onClick={handleAddEmployee}
        disabled={loading}
        className={`p-3 bg-rose-600 rounded font-black text-white hover:bg-indigo-700 w-full sm:w-auto mb-6 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Adding..." : "Register"}
      </button>

      <h2 className="text-rose-600 font-bold mb-6 text-2xl">Employee Roster</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded table-auto text-sm">
          <thead>
            <tr>
              <th className="py-3 px-4 font-bold text-rose-600">Name</th>
              <th className="py-3 px-4 font-bold text-rose-600">Role</th>
              <th className="py-3 px-4 font-bold text-rose-600">Email</th>
              <th className="py-3 px-4 font-bold text-rose-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className="border px-4 py-2 text-black">{employee.name}</td>
                <td className="border px-4 py-2 text-black">
                  {employee.username}
                </td>
                <td className="border px-4 py-2 text-black">{employee.role}</td>
                <td className="border px-4 py-2 text-black">
                  {employee.email}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleRemoveEmployee(employee._id)}
                    className="bg-rose-600 text-white p-2 rounded hover:bg-indigo-700"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
