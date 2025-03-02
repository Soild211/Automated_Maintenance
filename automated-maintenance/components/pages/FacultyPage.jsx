"use client";
import { useState } from "react";
import {
  ApprovalCard,
  ResolvedIssueCard,
  PendingRequestCard,
} from "../cards/FacultyPageCards";
import Link from "next/link";

export default function FacultyPage() {
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, title: "System Crash", description: "PC not booting up" },
    {
      id: 2,
      title: "Software Installation",
      description: "Need MATLAB installed",
    },
  ]);

  const [completedIssues, setCompletedIssues] = useState([
    {
      id: 3,
      title: "Network Issue",
      description: "Resolved: Internet restored",
    },
  ]);

  const [pastIssues, setPastIssues] = useState([
    {
      id: 4,
      title: "Hardware Replacement",
      description: "RAM replaced successfully",
    },
  ]);

  return (
    <div className="w-full mx-auto p-6 bg-slate-200">
      <h1 className="text-2xl font-bold mb-4">Faculty Dashboard</h1>

      {/* Raise a Request */}
      <Link href="/raise-request">
        <button className="mb-6">Raise a Request</button>
      </Link>

      {/* Pending Requests */}
      <section className="mb-6 border-2 p-8 rounded-lg bg-white">
        <h2 className="text-xl font-bold mb-2">Pending Requests</h2>
        <div className="flex gap-4">
          {pendingRequests.map((req) => (
            <PendingRequestCard
              key={req.id}
              title={req.title}
              description={req.description}
            />
          ))}
        </div>
      </section>

      {/* Completed Issues (Approval Pending) */}
      <section className="mb-6 border-2 p-8 rounded-lg bg-white">
        <h2 className="text-xl font-bold mb-2">
          Completed Issues (Approval Pending)
        </h2>
        <div className="space-y-2 flex gap-4">
          {completedIssues.map((issue) => (
            <ApprovalCard
              key={issue.id}
              title={issue.title}
              description={issue.description}
              onApprove={() => console.log(`Approved issue ${issue.id}`)}
              onReject={() => console.log(`Rejected issue ${issue.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Past Resolved Issues */}
      <section className="mb-6 border-2 p-8 rounded-lg bg-white">
        <h2 className="text-xl font-bold mb-2">Past Resolved Issues</h2>
        <div className="space-y-2 flex gap-4">
          {pastIssues.map((issue) => (
            <ResolvedIssueCard
              key={issue.id}
              title={issue.title}
              description={issue.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
