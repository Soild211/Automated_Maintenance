import mongoose, {Schema} from 'mongoose';
import { Device } from './device.model.js';

const labSchema=new Schema({
    labNo:{
        type:Number,
        required:true,
        unique:true,
    },
    incharge:{
        type:String,
    },
    column:{    
        type:Number
    },
    row:{
        type:Number
    },
    devices:{
        type:[
            {
                type:Schema.Types.ObjectId,
                ref:'Device',
            }
        ]
    }
    
})

export const Lab =   models.Lab|| mongoose.model("Lab", labSchema);