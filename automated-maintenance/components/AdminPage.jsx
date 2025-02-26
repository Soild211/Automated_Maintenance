import React from "react";
import Link from "next/link";
import AdminIssueCard from "./AdminIssueCard";

const Issues = [
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

const AdminPage = () => {
  return (
    <>
      <nav className="w-screen h-16 flex space-x-16 justify-between items-center px-16 bg-sky-950 fixed top-0 left-0 shadow-md">
        <ul className="flex justify-between space-x-20 font-semibold text-lg text-white">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link href="/manage-users">Manage Users</Link>
          </li>
        </ul>

        <div className="flex space-x-8 items-center text-white">
          <h1>Signed in as: Admin</h1>

          <h1 className="hover:text-sky-300 cursor-pointer">Profile</h1>
        </div>
      </nav>

      <div className="flex flex-col w-screen min-h-screen justify-start items-center pt-20 px-8 bg-gray-100">
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl font-bold mb-8 text-black">Current Issues</h1>

          <div className="grid grid-cols-2 gap-4">
            {Issues.map((issue, index) => (
              <div
                key={index}
                className="bg-white col-span-1 rounded-lg shadow-md"
              >
                <AdminIssueCard {...issue} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
