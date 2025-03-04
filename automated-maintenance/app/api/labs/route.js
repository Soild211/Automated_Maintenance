
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db.js";
import { Lab } from "@/models/lab.model";


//get all the labs
export async function GET(req) {
    try {

        await dbConnect();
        const labs = await Lab.find();

        return NextResponse.json({ success: true, labs }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}

//get a single lab
export const POST = async (req) => {
    try {
        const data = await req.json();
        const { labNo } = data;
        if (!labNo) return NextResponse.json({ success: false, message: "Provide a Lab Number" }, { status: 400 });

        await dbConnect();
        const lab = await Lab.findOne({ labNo }).populate("devices");
        if (!lab) return NextResponse.json({ success: false, message: "Invalid Lab Number" }, { stauts: 400 });

        return NextResponse.json({ success: true, lab }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );

    }

};
