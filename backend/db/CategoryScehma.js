import  mongoose  from "mongoose";

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
      
    },
    address:{
        type:String,
        required:true,
    }    
})
export default mongoose.model("category",user)