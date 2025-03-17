import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminIssueCard from "../cards/AdminIssueCard";

const AdminPage = () => {
  const [issues, setIssues] = useState([]); // State to store fetched issues
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch issues from the backend
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch("/api/issues");
        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }
        const data = await response.json();
        setIssues(data.issues); // Set the fetched issues
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <>
      <nav className="w-screen h-16 flex space-x-16 justify-between items-center px-16 bg-sky-950 fixed top-0 left-0 shadow-md">
        <ul className="flex justify-between space-x-20 font-semibold text-lg text-white">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link href="/manage-users">Manage Users</Link>
          </li>
        </ul>

        <div className="flex space-x-8 items-center text-white">
          <h1>Signed in as: HOD</h1>

          <h1 className="hover:text-sky-300 cursor-pointer">Profile</h1>
        </div>
      </nav>

      <div className="flex flex-col w-screen min-h-screen justify-start items-center pt-20 px-8 bg-gray-100">
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl font-bold mb-8 text-black">Current Issues</h1>

          <div className="grid grid-cols-2 gap-4">
            {issues.map((issue, index) => (
              <div
                key={index}
                className="bg-white col-span-1 rounded-lg shadow-md"
              >
                <AdminIssueCard {...issue} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;