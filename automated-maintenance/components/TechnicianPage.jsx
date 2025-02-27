"use client";

import React, { useState } from "react";
import TechnicianIssueCard from "@/components/TechnicianIssueCard";
import Link from "next/link";

const Issues = [
  {
    deviceId: "123",
    labNo: "1",
    deviceType: "Computer",
    status: "Resolved",
    date: "12/12/2021",
    facultyName: "John Doe",
    facultyLabIncharge: "Jane Doe",
    details: "Broken Screen",
    recurring: "No",
    count: 1,
  },
  {
    deviceId: "123",
    labNo: "1",
    deviceType: "Computer",
    status: "Pending",
    date: "12/12/2021",
    facultyName: "John Doe",
    facultyLabIncharge: "Jane Doe",
    details: "Broken Screen",
    recurring: "No",
    count: 1,
  },
  {
    deviceId: "123",
    labNo: "1",
    deviceType: "Computer",
    status: "Pending",
    date: "12/12/2021",
    facultyName: "John Doe",
    facultyLabIncharge: "Jane Doe",
    details: "Broken Screen",
    recurring: "No",
    count: 1,
  },
  {
    deviceId: "123",
    labNo: "1",
    deviceType: "Computer",
    status: "Pending",
    date: "12/12/2021",
    facultyName: "John Doe",
    facultyLabIncharge: "Jane Doe",
    details:
      "This is a list of all the long details needed for get a detailed view of the issue. This is a list of all the long details needed for get a detailed view of the issue. This is a list of all the long details needed for get a detailed view of the issue. This is a list of all the long details needed for get a detailed view of the issue.",
    recurring: "No",
    count: 1,
  },
  {
    deviceId: "123",
    labNo: "1",
    deviceType: "Computer",
    status: "Completed",
    date: "12/12/2021",
    facultyName: "John Doe",
    facultyLabIncharge: "Jane Doe",
    details: "Broken Screen",
    recurring: "No",
    count: 1,
  },
];

const TechnicianDashboard = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIssues = Issues.filter(
    (issue) =>
      (filterStatus === "All" || issue.status === filterStatus) &&
      (issue.labNo.includes(searchQuery) ||
        issue.deviceId.includes(searchQuery))
  );

  const handleResolve = (deviceId, resolutionNotes) => {
    console.log(
      `Issue with Device ID: ${deviceId} resolved with notes: ${resolutionNotes}`
    );
  };

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
              <option value="Resolved">Resolved</option>
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
