import React from "react";
import FacultyIssueForm from "@/components/forms/FacultyIssueForm";

const getAvailableDevices = () => {
  try {
  } catch (error) {
    console.error(error);
  }
};

const RaiseRequest = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Raise a Request</h1>
      <FacultyIssueForm />
    </div>
  );
};

export default RaiseRequest;
