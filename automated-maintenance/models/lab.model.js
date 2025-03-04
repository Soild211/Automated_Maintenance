import mongoose, {Schema, models} from 'mongoose';
import { Device } from './device.model.js';

const labSchema=new Schema({
    labNo:{
        type:Number,
        required:true,
        unique:true,
    },
    incharge:{
        type:Schema.Types.ObjectId,
        ref:'User',
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
