import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dueDate: {
      type: Date,
      required: true,
    },
    file: {
      type: String, // store file path or cloud URL (e.g., from AWS S3, Cloudinary, or local storage)
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // if you want to track which teacher/admin created it
      required: true,
    },
}, 
{ timestamps: true })



export const Assignment = mongoose.model("Assignment", assignmentSchema)