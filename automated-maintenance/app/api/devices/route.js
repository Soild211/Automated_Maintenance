import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Device } from "@/models/device.model";

export async function GET(req) {
  try {
    // Parse the lab number from query params
    const { searchParams } = new URL(req.url);
    const labNo = searchParams.get("labNo");

    if (!labNo) {
      return NextResponse.json(
        { success: false, message: "Lab number is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const devices = await Device.find({ labNo });

    return NextResponse.json({ success: true, devices }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
