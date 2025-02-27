import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import { User } from "@/models/user.model.js";

export const PATCH = async (req, context) => {
    try {
        console.log("🔄 Connecting to DB...");
        await dbConnect();
        console.log("✅ Connected to DB");

        // Extract params correctly
        const { params } = context;
        const { id } = params;

        if (!id) {
            console.error("❌ Missing User ID in request");
            return NextResponse.json({ status: false, msg: "User ID is required" }, { status: 400 });
        }

        console.log("🆔 User ID received:", id);

        // Extract request body
        const body = await req.json();
        console.log("📦 Request Body:", body);

        // Update isApproved field
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { isApproved: true },
            { new: true, select: "-password -refreshToken" }
        );

        if (!updatedUser) {
            console.error("❌ User not found in DB");
            return NextResponse.json({ status: false, msg: "User not found" }, { status: 404 });
        }

        console.log("✅ User updated successfully:", updatedUser);

        return NextResponse.json({
            status: true,
            msg: "User approval updated successfully",
            user: updatedUser
        }, { status: 200 });

    } catch (error) {
        console.error("❌ Error updating user:", error);
        return NextResponse.json({ status: false, msg: "Internal Server Error" }, { status: 500 });
    }
};
