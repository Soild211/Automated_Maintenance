"use client";
import React, { useState } from "react";

const ApprovalCard = ({
  title,
  description,
  date,
  deviceType,
  facultyName,
  onApprove,
  onReject,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-md text-gray-900 p-4 shadow-lg basis-1/2 border-4 border-blue-500">
      <div className="cursor-pointer p-4" onClick={() => setIsOpen(!isOpen)}>
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm text-gray-700">Device: {deviceType}</p>
        <p className="text-sm text-gray-700">Reported by: {facultyName}</p>
        <p className="text-sm text-gray-700">Resolved: {date}</p>
      </div>
      {isOpen && <p className="text-gray-900 p-4">{description}</p>}
      <div className="flex justify-between mt-3">
        <button
          onClick={onApprove}
          className="bg-green-600 text-white w-1/2 mr-2"
        >
          Approve
        </button>
        <button onClick={onReject} className="bg-red-600 text-white w-1/2">
          Reject
        </button>
      </div>
    </div>
  );
};

const ResolvedIssueCard = ({
  title,
  description,
  date,
  deviceType,
  facultyName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-md text-gray-900 p-4 shadow-lg basis-1/2 border-4 border-green-500">
      <div className="cursor-pointer p-4" onClick={() => setIsOpen(!isOpen)}>
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm text-gray-700">Device: {deviceType}</p>
        <p className="text-sm text-gray-700">Reported by: {facultyName}</p>
        <p className="text-sm text-gray-700">Resolved: {date}</p>
      </div>
      {isOpen && <p className="text-gray-900 p-4">{description}</p>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-600 text-white w-full mt-3"
      >
        {isOpen ? "Close Details" : "View Details"}
      </button>
    </div>
  );
};

const PendingRequestCard = ({
  title,
  description,
  date,
  deviceType,
  facultyName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-md text-gray-900 p-4 basis-1/2 shadow-lg border-4 border-yellow-500">
      <div className="cursor-pointer p-4" onClick={() => setIsOpen(!isOpen)}>
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm text-gray-700">Device: {deviceType}</p>
        <p className="text-sm text-gray-700">Reported by: {facultyName}</p>
        <p className="text-sm text-gray-700">Reported: {date}</p>
      </div>
      {isOpen && <p className="text-gray-900 p-4">{description}</p>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white w-full mt-3"
      >
        {isOpen ? "Close Details" : "View Details"}
      </button>
    </div>
  );
};

export { ApprovalCard, ResolvedIssueCard, PendingRequestCard };
