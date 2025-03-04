import { NextResponse } from "next/server";
import dbConnect from "@/lib/db.js";
import { Issue } from "@/models/issue.model";


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
        const { issueId } = data;
        if(!issueId) return NextResponse.json({success:false, message:"Provide a Issues ID"},{status:400});

        await dbConnect();
        const issue = await Issue.findOne({ _id: issueId});
        if (!issue) return NextResponse.json({ success: false, message: "Invalid Issue Id" }, { stauts: 400 });

        return NextResponse.json({ success: true, issue}, { status: 200 });
    }
    catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );

    }

};
