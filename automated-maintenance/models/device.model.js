import mongoose, {models, Schema} from 'mongoose';
import { Lab } from './lab.model.js';
import { Issue } from './issue.model.js';

const deviceSchema=new Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    labNo:{
        type:Number,
        required:true,

    },
    deviceType:{
        type:String,
        enum:["PC","Printer","Projector"],
        required:true,
    },
    status:{
        type:Boolean,
    },
    issues:{
        type:[
            {
                type: Schema.Types.ObjectId,
                ref:'Issue'
            }
        ]
    }
    
})

export const Device =  models.Device || mongoose.model("Device", deviceSchema);
