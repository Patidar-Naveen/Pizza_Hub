import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({
    details:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})
export default mongoose.model("order",orderSchema)