import mongoose from 'mongoose'

const appoinmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    docId: { type: mongoose.Schema.Types.ObjectId, ref: "doctor" },
    slotDate : {type:String,required:true},
    slotTime : {type:String,required:true},
    userdata : {type:Object,required:true},
    docData : {type:Object,required:true},
    amount : {type:Number,required:true},
    date : {type:Number,required:true},
    cancelled : {type:Boolean,default:false},
    payment : {type:Boolean,default:false},
    isComplete : {type:Boolean,default:false},

})

const appoinmentModel = mongoose.models.appoinment || mongoose.model('appoinment',appoinmentSchema)


export default appoinmentModel
