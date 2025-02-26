import mongoose, {models, Schema} from 'mongoose';
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
    },
    prn:{
        type:String ,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }
},
{
    timestamps:true,
});

userSchema.methods.genereateAccessTokens=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.genereateRefreshTokens=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User=  models.User || mongoose.model("User", userSchema);
