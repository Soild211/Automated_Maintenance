import { NextResponse } from "next/server";
import dbConnect from "@/lib/db.js";
import { Device } from "@/models/device.model";


//get all the devices
// export async function GET(req) {
//     try {

//         await dbConnect();
//         const devices = await Device.find();

//         return NextResponse.json({ success: true, devices }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json(
//             { success: false, message: "Server error", error: error.message },
//             { status: 500 }
//         );
//     }
// }
export async function GET(req) {
    try {
        await dbConnect();

        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const labNo = searchParams.get("labNo");

        if (!labNo) {
            return NextResponse.json(
                { success: false, message: "Lab number is required" },
                { status: 400 }
            );
        }

        // Fetch devices for the specified lab number
        const devices = await Device.find({ labNo, deviceType: "Computer" }).populate("issues");

        return NextResponse.json({ success: true, devices }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}

//get a single device
export const POST = async (req) => {
    try {
        const data = await req.json();
        const { deviceId } = data;
        if(!deviceId) return NextResponse.json({success:false, message:"Provide a device ID"},{status:400});

        await dbConnect();
        const device = await Device.findOne({ id:deviceId }).populate("issues");
        if (!device) return NextResponse.json({ success: false, message: "Invalid Device ID" }, { stauts: 400 });
        return NextResponse.json({ success: true, device }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );

    }

};
