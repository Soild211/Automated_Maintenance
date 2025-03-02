"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ManageUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [roleFilter, setRoleFilter] = useState("All");

  const fetchApprovedUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();

      if (data.status) {
        setUsers(data.users.filter((user) => user.isApproved)); // Approved Users
      } else {
        console.error("Error fetching users:", data.msg);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUnApprovedUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();

      if (data.status) {
        setPendingUsers(data.users.filter((user) => !user.isApproved)); // Pending Users
      } else {
        console.error("Error fetching users:", data.msg);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchApprovedUsers();
    fetchUnApprovedUsers();
  }, []);
  

  // ✅ Approve User & Refresh Lists
  const handleApproveUser = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: true }),
      });
  
      const data = await response.json();
  
      if (data.status) {
        // Refresh the approved and pending users list
        console.log("User approved:", data.user);
        fetchApprovedUsers();
        fetchUnApprovedUsers();
      } else {
        console.error("Error approving user:", data.msg);
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };
  

  // ✅ Remove User
  const handleRemoveUser = (id) => {
    if (confirm("Are you sure you want to remove this user?")) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  // ✅ Sorting Function
  const sortedUsers = [...users].sort((a, b) => {
    if (sortField === "dateAdded") {
      return sortOrder === "asc"
        ? new Date(a.dateAdded) - new Date(b.dateAdded)
        : new Date(b.dateAdded) - new Date(a.dateAdded);
    } else {
      return sortOrder === "asc"
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    }
  });

  // ✅ Filtering Users
  const filteredUsers = sortedUsers.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (roleFilter === "All" || user.role === roleFilter)
  );

  return (
    <>
      <nav className="w-screen h-16 flex space-x-16 justify-between items-center px-16 bg-sky-950 fixed top-0 left-0 shadow-md">
        <ul className="flex justify-between space-x-20 font-semibold text-lg text-white">
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/manage-users">Manage Users</Link></li>
        </ul>
        <div className="flex space-x-8 items-center text-white">
          <h1>Signed in as: Admin</h1>
          <h1 className="hover:text-sky-300 cursor-pointer">Profile</h1>
        </div>
      </nav>

      <div className="min-h-screen p-8 bg-gray-100 text-black pt-20">
        {/* Pending Users Section */}
        <div className="overflow-x-auto mt-6">
          <h2 className="text-3xl font-bold mb-4">Approve Pending Users</h2>
          <table className="w-full bg-white shadow-md">
            <thead className="bg-slate-200">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Date Requested</th>
                <th className="p-3 text-left">Approve</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.length > 0 ? (
                pendingUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">{user.updatedAt.split("T")[0]}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleApproveUser(user._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-gray-500 text-center p-3">
                    No pending user approvals.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Approved Users Section */}
        <h1 className="text-3xl font-bold mt-16 mb-4">Existing Users</h1>
        <div className="flex justify-between my-8">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="ml-4 p-2 border border-gray-300 rounded-md"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="dateAdded">Sort by Date Added</option>
          </select>
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "▲" : "▼"}
          </button>
        </div>

        <div className="overflow-x-auto mt-6 rounded-lg">
          <table className="w-full shadow-md bg-white">
            <thead className="bg-slate-200">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Date Added</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.updatedAt.split("T")[0]}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleRemoveUser(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
