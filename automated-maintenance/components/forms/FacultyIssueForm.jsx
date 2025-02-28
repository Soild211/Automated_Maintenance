"use client";

import { useState } from "react";

const FacultyIssueForm = ({ availableDevices, onSubmit }) => {
  const [formData, setFormData] = useState({
    labNo: "",
    deviceId: "",
    deviceType: "",
    details: "",
    recurring: false,
    facultyLabIncharge: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDeviceSelect = (deviceId) => {
    setFormData({ ...formData, deviceId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const labs = [
    { labNo: 1 },
    { labNo: 2 },
    { labNo: 3 },
    { labNo: 4 },
    { labNo: 5 },
    { labNo: 6 },
    { labNo: 7 },
    { labNo: 8 },
    { labNo: 9 },
    { labNo: 10 },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Raise an Issue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Lab Number</label>
          <select name="labno" id="labno" className="w-full p-2 border rounded">
            {labs.map((lab) => (
              <option value={lab.labNo} key={lab.labNo}>
                {lab.labNo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Select Device ID</label>
          <div className="grid grid-cols-3 gap-2">
            {/* {availableDevices.map((device) => (
              <button
                key={device}
                type="button"
                onClick={() => handleDeviceSelect(device)}
                className={`p-2 border rounded text-center transition-all ${
                  formData.deviceId === device
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {device}
              </button>
            ))} */}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Device Type</label>
          <select
            name="devicetype"
            id="devicetype"
            className="w-full p-2 border rounded"
          >
            <option value="cpu">CPU</option>
            <option value="monitor">Monitor</option>
            <option value="keyboard">Keyboard</option>
            <option value="mouse">Mouse</option>
            <option value="printer">Printer</option>
            <option value="projector">Projector</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Issue Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="recurring"
            checked={formData.recurring}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Recurring Issue?</label>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Faculty Lab Incharge</label>
          <select
            name="labincharge"
            id="labincharge"
            className="w-full p-2 border rounded"
          >
            <option value="faculty1">Faculty 1</option>
            <option value="faculty2">Faculty 2</option>
            <option value="faculty3">Faculty 3</option>
            <option value="faculty4">Faculty 4</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default FacultyIssueForm;
