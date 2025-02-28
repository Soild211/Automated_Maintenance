"use client";

import React, { useState } from "react";

const TechnicianIssueCard = ({
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
  onResolve,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState("");

  return (
    <div
      className={`rounded-md text-gray-900 p-4 shadow-lg w-full mx-auto ${
        status === "Pending"
          ? "border-4 border-red-500"
          : status === "Completed" ? "border-4 border-blue-500" : "border-4 border-green-500"
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
            status === "Pending"
          ? " text-red-500"
          : status === "Completed" ? " text-blue-500" : " text-green-500"
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

          {status === "Pending" && (
            <div className="mt-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter resolution notes"
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
              ></textarea>
              <button
                onClick={() => onResolve(deviceId, resolutionNotes)}
                className="bg-green-600 text-white p-2 rounded-md w-full mt-3 hover:bg-green-700 transition-all"
              >
                Mark as Resolved
              </button>
            </div>
          )}
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

export default TechnicianIssueCard;
