"use client";

import React, { useState } from "react";

const AdminIssueCard = ({
  labNo,
  deviceId,
  deviceType,
  status,
  date,
  facultyName,
  facultyLabIncharge,
  details,
  recurring,
  count,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-md text-gray-900 p-4 shadow-lg w-full mx-auto ${
        status === "Pending"
          ? "border-4 border-yellow-500"
          : "border-4 border-green-500"
      }`}
    >
      <div
        className="cursor-pointer transition-all p-4 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-bold">Lab No: {labNo}</p>
        <p className="text-lg">Device ID: {deviceId}</p>
        <p className="text-lg">Device Type: {deviceType}</p>
        <p
          className={`text-lg font-semibold ${
            status === "Pending" ? "text-yellow-600" : "text-green-600"
          }`}
        >
          Status: {status}
        </p>
        <p className="text-sm text-gray-700">Reported: {date}</p>
      </div>

      {isOpen && (
        <div className="text-gray-900 p-4 mt-2 transition-all">
          <p className="text-lg font-bold">Faculty Name: {facultyName}</p>
          <p className="text-lg">Lab Incharge: {facultyLabIncharge}</p>
          <p className="text-lg">Details: {details}</p>
          <p className="text-lg">Recurring: {recurring ? "Yes" : "No"}</p>
          <p className="text-lg">Issue Count: {count}</p>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-sky-950 text-white p-2 rounded-md w-full mt-3 hover:bg-sky-800 transition-all"
      >
        {isOpen ? "Close Details" : "View Details"}
      </button>
    </div>
  );
};

export default AdminIssueCard;
