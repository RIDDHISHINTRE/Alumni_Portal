

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const UnverifiedUsers = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnverifiedUsers();
  }, []);

  const fetchUnverifiedUsers = async () => {
    try {
      const response = await axiosInstance.get("/unverified-users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const combined = [
        ...response.data.students,
        ...response.data.alumni,
      ];
  
      setUnverifiedUsers(combined);
      
    } catch (error) {
      console.error("Error fetching unverified users:", error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 text-gray-900 flex flex-col">
      <nav className="w-full p-4 bg-white shadow-md flex justify-between items-center border-b">
        <h1 className="text-3xl font-bold text-gray-800">Unverified Users</h1>
        <Link
          to="/admin-dashboard"
          className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
        >
          Back to Dashboard
        </Link>
      </nav>

      <div className="flex flex-col items-center justify-center flex-grow px-6 py-8">
        <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">List of Unverified Users</h2>

          {unverifiedUsers.length > 0 ? (
            <>
              <h2 className="text-xl font-bold mb-2">Unverified Students</h2>
              <ul className="mb-6">
                {unverifiedUsers
                  .filter((user) => user.userType === 'student')
                  .map((user, index) => (
                    <li key={`student-${user.id}-${index}`} className="border-b py-3 flex justify-between">
                      <span>{user.name} (student)</span>
                      <button
                        onClick={() =>
                          navigate(`/unverified-user/${user.id}`, {
                            state: { userType: user.userType },
                          })
                        }
                        className="text-blue-500 hover:underline"
                      >
                        View Details
                      </button>
                    </li>
                  ))}
              </ul>

              <h2 className="text-xl font-bold mb-2">Unverified Alumni</h2>
              <ul>
                {unverifiedUsers
                  .filter((user) => user.userType === 'alumni')
                  .map((user, index) => (
                    <li key={`alumni-${user.id}-${index}`} className="border-b py-3 flex justify-between">
                      <span>{user.name} (alumni)</span>
                      <button
                        onClick={() =>
                          navigate(`/unverified-user/${user.id}`, {
                            state: { userType: user.userType },
                          })
                        }
                        className="text-blue-500 hover:underline"
                      >
                        View Details
                      </button>
                    </li>
                  ))}
              </ul>
            </>
          ) : (
            <p>No unverified users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnverifiedUsers;



