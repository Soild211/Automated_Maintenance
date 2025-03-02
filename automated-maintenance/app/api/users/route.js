import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import { User } from "@/models/user.model.js";
import bcrypt from "bcrypt";

export const GET = async () => {
    try {
        console.log("🔄 Connecting to DB...");
        await dbConnect();
        console.log("✅ Connected to DB");

        const users = await User.find({}, "-password -refreshToken");
        console.log("📜 Users fetched:", users);

        return NextResponse.json({
            status: true,
            msg: "Users fetched successfully",
            users
        }, { status: 200 });

    } catch (error) {
        console.error("❌ Error fetching users:", error);
        return NextResponse.json({
            status: false,
            msg: "Internal Server Error"
        }, { status: 500 });
    }
};
