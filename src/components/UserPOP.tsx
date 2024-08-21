import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  role: string;
  loginTime: string;
}

const UserPopUp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/auth/user");
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setUsers(data);
        } else {
          setError("Unexpected response format");
          console.error("Received non-JSON response:", await response.text());
        }
      } catch (err) {
        setError("Failed to fetch user data");
        console.error("Fetch error:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-rose-600">
          User Logins
        </h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="max-h-64 overflow-y-auto">
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user._id} className="mb-2">
                  <p className="text-rose-600">
                    <strong className="font-bold text-black">Name:</strong>{" "}
                    {user.name}
                  </p>
                  <p className="text-rose-600">
                    <strong className="font-bold text-black">Role:</strong>{" "}
                    {user.role}
                  </p>
                  <p className="text-rose-600">
                    <strong className="font-bold text-black">
                      Login Time:
                    </strong>{" "}
                    {new Date(user.loginTime).toLocaleString()}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-rose-600 font-bold">No login records found.</p>
            )}
          </ul>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserPopUp;
