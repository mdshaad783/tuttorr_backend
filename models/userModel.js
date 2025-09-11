import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is a required field']
    },
    email:{
        type:String,
        unqiue:true,
        required:[true,'Email is a required field']
    },
    password:{
        type:String,
        minLength:6,
        required:[true,'Password is a required field']
    },
    role:{
        type:String,
        enum:["admin", "student", "teacher"],
    }
},{
    timestamps:true
})

export const User = mongoose.model("User", userSchema)