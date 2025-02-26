import mongoose, {models, Schema} from 'mongoose';
import { User } from './user.model.js';
import { Lab } from './lab.model.js';

const issueSchema = new Schema({
    deviceId:{
        type:String,
    },
    labNo:{
        type:Number,
    },
    deviceType:{
        type:String,
        required:true,
    },
    status:{
        type:String,
    },
    date:{
        type:Date,
        required:true,
    },
    facultyName:{
        type: Schema.Types.ObjectId,
        ref:'User',   
    },
    facultyLabIncharge:{
        type:String,
        required:true,
    },
    details:{
        type:String,
    },
    recurring:{
        type:Boolean
    },
    count:{
        type:Number
    }
});

export const Issue = models.Issue || mongoose.model("Issue", issueSchema);