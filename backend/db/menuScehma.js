import mongoose from 'mongoose'
const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    path:{
        type:String,
        required:true
    }
})
export default mongoose.model("menu",menuSchema)