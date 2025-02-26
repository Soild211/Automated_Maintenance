import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export const verifyJwt=async(req, res)=>{
    try {
        const token = req.cookies?.accessToken || 
        req.header("Authorizaton")?.replace("Bearer ", "");
        if(!token){
            return NextResponse
            .json({msg:"Unauthorised Request", status:false},{status:401});
        }
        const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user ){
            return res
            .status(401)
            .json({msg:"Invalid Access Token", status:false});
        }
        if(user){
            req.user=user;
        }
        
  return NextResponse.next();

    } catch (error) {
        NextResponse.json({msg:"Invalid Token"},{status:401});
    }
}

