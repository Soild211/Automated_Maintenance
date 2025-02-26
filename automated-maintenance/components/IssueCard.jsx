import React from "react";

const IssueCard = ({ deviceId, labNo, deviceType, status, date, facultyName, facultyLabIncharge, details, recurring, count }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Device ID: {deviceId}</h2>
      <p><strong>Lab No:</strong> {labNo}</p>
      <p><strong>Device Type:</strong> {deviceType}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Faculty Name:</strong> {facultyName}</p>
      <p><strong>Faculty Lab Incharge:</strong> {facultyLabIncharge}</p>
      <p><strong>Details:</strong> {details}</p>
      <p><strong>Recurring:</strong> {recurring}</p>
      <p><strong>Count:</strong> {count}</p>
    </div>
  );
};

export default IssueCard;