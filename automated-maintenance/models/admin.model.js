import mongoose, {models, Schema} from 'mongoose';
import jwt from "jsonwebtoken";

const adminSchema = new Schema({
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
    refreshToken:{
        type:String,
    }
},
{
    timestamps:true,
});

adminSchema.methods.genereateAccessTokens=function(){
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
adminSchema.methods.genereateRefreshTokens=function(){
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
export const Admin=  models.Admin || mongoose.model("Admin", adminSchema);