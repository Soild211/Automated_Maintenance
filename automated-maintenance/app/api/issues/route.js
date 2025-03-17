import { NextResponse } from "next/server";
import dbConnect from "@/lib/db.js";
import { Issue } from "@/models/issue.model";
import { User } from "@/models/user.model.js";


//get all the issues
export async function GET(req) {
    try {

        await dbConnect();
        const issues = await Issue.find();

        return NextResponse.json({ success: true, issues}, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}

//get a single issue
export const POST = async (req) => {
    try {
      const data = await req.json();
      const {
        deviceId,
        labNo,
        deviceType,
        details,
        recurring,
        facultyLabIncharge,
      } = data;
  
      // Validate required fields
      if (!deviceId || !labNo || !deviceType || !details || !facultyLabIncharge) {
        return NextResponse.json(
          { success: false, message: "All fields are required" },
          { status: 400 }
        );
      }
  
      await dbConnect();
  
      // Create a new issue
      const newIssue = new Issue({
        deviceId,
        labNo,
        deviceType,
        details,
        recurring,
        // facultyLabIncharge,
        status: "Pending", // Default status
        date: new Date(), // Current date
      });
  
      // Save the issue to the database
      await newIssue.save();
  
      return NextResponse.json(
        { success: true, message: "Issue created successfully", issue: newIssue },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Server error", error: error.message },
        { status: 500 }
      );
    }
  };
  export async function PATCH(req) {
    try {
      const data = await req.json();
      const { deviceId, resolutionNotes } = data;
  
      if (!deviceId || !resolutionNotes) {
        return NextResponse.json(
          { success: false, message: "Device ID and resolution notes are required" },
          { status: 400 }
        );
      }
  
      await dbConnect();
  
      // Update the issue status and resolution notes
      const updatedIssue = await Issue.findOneAndUpdate(
        { deviceId },
        { status: "Resolved", resolutionNotes },
        { new: true }
      );
  
      if (!updatedIssue) {
        return NextResponse.json(
          { success: false, message: "Issue not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, message: "Issue resolved successfully", issue: updatedIssue },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Server error", error: error.message },
        { status: 500 }
      );
    }
  }
