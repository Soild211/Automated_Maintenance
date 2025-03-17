"use client";

import { useState, useEffect } from "react";

const FacultyIssueForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    labNo: "",
    deviceId: "",
    deviceType: "",
    details: "",
    recurring: false,
    facultyLabIncharge: "",
  });

  const [availableDevices, setAvailableDevices] = useState([]);

  useEffect(() => {
    console.log("Lab Number changed:", formData.labNo); // Debugging
    if (formData.labNo) {
      fetch(`/api/devices?labNo=${formData.labNo}`)
        .then((response) => response.json())
        .then((data) => setAvailableDevices(data.devices))
        .catch((error) => console.error("Error fetching devices:", error));
    } else {
      setAvailableDevices([]); // Clear devices if no lab is selected
    }
  }, [formData.labNo]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Issue submitted successfully!");
        // onSubmit(formData); // Call the onSubmit prop if needed
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("An error occurred while submitting the issue.");
    }
  };

  const labs = [
    { labNo: 514 },
    { labNo: 527 },
    // Add more labs as needed
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Raise an Issue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Lab Number</label>
          <select
            name="labNo"
            id="labNo"
            value={formData.labNo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Lab</option>
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
            {availableDevices?.map((device) => (
              <button
                key={device.id}
                type="button"
                onClick={() => handleDeviceSelect(device.id)}
                className={`p-2 border rounded text-center transition-all ${
                  formData.deviceId === device.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {device.id}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Device Type</label>
          <select
            name="deviceType"
            id="deviceType"
            value={formData.deviceType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Device Type</option>
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
            name="facultyLabIncharge"
            id="facultyLabIncharge"
            value={formData.facultyLabIncharge}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Faculty</option>
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