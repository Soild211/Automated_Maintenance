//code to connect db
import mongoose from "mongoose";


const MONGO_URI = process.env.MONGODB_URI;

if(!MONGO_URI){
    throw new Error("Cannot find MONGO_URI");
}

let cached = global.mongoose || {
    conn:null,
    promise:null
};

const dbConnect = async() =>{
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const options = {
            bufferCommands : false,
        };
        cached.promise = mongoose.connect(MONGO_URI,options).then((mongoose) =>{
            console.log("Connected to db");
            return mongoose;
            
        })
    }
    cached.conn= await cached.promise;
    return cached.conn;
}

global.mongoose = cached;

export default dbConnect;
