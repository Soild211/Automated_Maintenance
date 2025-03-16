'use client';
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux"; 

import AdminPage from "@/components/pages/AdminPage";
import TechnicianPage from "@/components/pages/TechnicianPage";
import FacultyDashboard from "@/components/pages/FacultyDashboard";

const Dashboard = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state) => state.auth); // Get role from Redux

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/Login'); // Redirect if not authenticated
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Prevent rendering if not logged in

  return (
    <div>
      {user.role === "hod" && <AdminPage />}
      {user.role === "technician" && <TechnicianPage />}
      {user.role === "faculty" && <FacultyDashboard />}
      {!role && <p>Loading...</p>} {/* Show loading message if role is not set */}
    </div>
  );
};

export default Dashboard;
