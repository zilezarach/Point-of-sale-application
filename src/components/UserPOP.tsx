import React, { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
}

interface UserProps {
  isOpen: boolean;
  onClose: () => void;
  users: {
    current: User[];
    previous: User[];
  };
}

const UserPOP: React.FC<UserProps> = ({ isOpen, onClose, users }) => {
  if (!isOpen) return null;
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [previousUsers, setPreviousUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/users/current");
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    const fetchPreviousUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setPreviousUsers(data);
      } catch (error) {
        console.error("Failed to fetch previous users:", error);
      }
    };

    fetchCurrentUser();
    fetchPreviousUsers();
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4 text-center no-underline hover:underline text-rose-600">
          User History
        </h2>
        <div>
          <h3 className="text-rose-600 font-semibold">Current Users</h3>
          <ul>
            {users.current.map((user) => (
              <li key={user.id} className="py-2">
                {user.name}
              </li>
            ))}
          </ul>
          <h3 className=" text-rose-600 font-semibold mt-4">Previous Users</h3>
          <ul>
            {users.previous.map((user) => (
              <li key={user.id} className="py-2">
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserPOP;
