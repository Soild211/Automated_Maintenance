import { NextResponse } from "next/server";
import {auth} from "./middleware/auth.js";
export function middleware(req){
    // const authResponse = auth(req);
    // if(authResponse){
    //     return authResponse;
    // }
    return NextResponse.next();
}