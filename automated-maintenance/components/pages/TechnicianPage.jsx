"use client";

import React, { useState, useEffect } from "react";
import TechnicianIssueCard from "@/components/cards/TechnicianIssueCard";
import Link from "next/link";

const TechnicianDashboard = () => {
  const [issues, setIssues] = useState([]); // State to store fetched issues
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter issues based on status and search query
  const filteredIssues = issues.filter(
    (issue) =>
      (filterStatus === "All" || issue.status === filterStatus) &&
      (issue.labNo.toString().includes(searchQuery) ||
        issue.deviceId.includes(searchQuery))
  );

  // Handle resolving an issue
  const handleResolve = async (deviceId, resolutionNotes) => {
    try {
      const response = await fetch(`/api/issues`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deviceId, resolutionNotes }),
      });

      if (!response.ok) {
        throw new Error("Failed to resolve issue");
      }

      // Update the local state to reflect the resolved issue
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.deviceId === deviceId
            ? { ...issue, status: "Resolved" }
            : issue
        )
      );
    } catch (error) {
      console.error("Error resolving issue:", error);
    }
  };

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
            <Link href="/technician-dashboard">Technician Dashboard</Link>
          </li>
        </ul>
        <div className="flex space-x-8 items-center text-white">
          <h1>Signed in as: Technician</h1>
          <h1 className="hover:text-sky-300 cursor-pointer">Profile</h1>
        </div>
      </nav>

      <div className="flex flex-col text-black w-screen min-h-screen justify-start items-center pt-20 px-8 bg-gray-100">
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl font-bold mb-8 text-black">Manage Issues</h1>

          <div className="flex justify-between mb-6">
            <input
              type="text"
              placeholder="Search by Lab No or Device ID..."
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="ml-4 p-2 border border-gray-300 rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Issues</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Resolved</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {filteredIssues.map((issue, index) => (
              <div
                key={index}
                className="bg-white col-span-1 rounded-lg shadow-md"
              >
                <TechnicianIssueCard {...issue} onResolve={handleResolve} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TechnicianDashboard;