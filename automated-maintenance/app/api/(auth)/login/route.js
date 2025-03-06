import  dbConnect from "@/lib/db.js";
import { NextResponse } from "next/server";
import {User } from "@/models/user.model.js";
import bcrypt from "bcrypt";
import {generateAccessAndRefreshTokens} from "@/lib/token.js";

//api/login
export async function POST (req ,res) {
    try {
        await dbConnect();
        const data = await req.json(); 
        const {prn , password , role} = data;
        if(!prn || !password || !role){
            return res.json({
                status:false,
                msg:"Fill all fields",
            })
        } 
        const findUser = await User.findOne({prn});
        const isPasswordValid = await bcrypt.compare(password, findUser.password);
        if(!findUser){
            return res.json({
                status:false,
                msg:"Invalid  prn",
            });
        }
        if(!isPasswordValid){
            return res.json({
                status:false,
                msg:"Incorrect password",
            });
        }
        
        const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(findUser._id);
        const response = NextResponse.json({
            status: true,
            msg: "User Logged in  successfully",
            user: {  prn  },
        });

        response.headers.set("Set-Cookie", [
            `accessToken=${accessToken}; HttpOnly; Secure; Path=/; SameSite=Strict`,
            `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; SameSite=Strict`,
        ]);

        return response;
        
    } catch (error) {
        console.log("Error in login",error);
        
        return NextResponse.json({msg:"Invalid Token"},{status:401});
    }

}
