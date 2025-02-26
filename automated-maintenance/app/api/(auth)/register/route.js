import { dbConnect } from "@/lib/db"
import { NextResponse } from "next/server";
import {User} from "@/models/user.model.js";
import bcrypt from "bcrypt";
import {generateAccessAndRefreshTokens} from "@/lib/token.js";


// const options={
//     httpOnly:true,
//     secure:true,
// } 
export const POST = async (req) =>{
    try {
       
        await dbConnect();
        const data = await req.json();
        // console.log(data);
        const {name,prn,email,password,role} = data;
        
        
        if(!name || !prn || !email || !password || !role){
            return NextResponse.json({msg:"Fill all fields"},{status:400});
        }
        const findUser = await User.findOne({prn});
        if(findUser){   
        
            return NextResponse.json({msg:"User already exists"},{status:400});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const createUser= await User.create({
            name,
            prn,
            email,
            password : hashPassword,
            role
        });
        if(!createUser){
            return res.json({
                status:false,
                msg:"Error creating new user please try again."
            })
        }   
        const findId= await User.findOne({prn});
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(findId._id);
        const sendUser = { 
            name,
            prn,
            email,
        };
        const response = NextResponse.json({
            status: true,
            msg: "User registered successfully",
            user: { name, prn, email },
        });

        response.headers.set("Set-Cookie", [
            `accessToken=${accessToken}; HttpOnly; Secure; Path=/; SameSite=Strict`,
            `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; SameSite=Strict`,
        ]);

        return response;


        
    } catch (error) {
        console.log("Error in register route api",error);
        return NextResponse.json({msg:"Internal Server Error"},{status:500});
    }
    

}