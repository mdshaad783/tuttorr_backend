import asyncHandler from "../middlewares/asyncHandler.js";
import { Assignment } from "../models/assignmentModel.js";


const createAssignments = asyncHandler(async(req,res)=>{
    const {subject, description, dueDate} = req.body
    const newAssignment = new Assignment({subject,description,dueDate,createdBy:req.user._id})
    // const assignment = await Assignment({...req.fields})
    try {
        await newAssignment.save()
        res.json(newAssignment)
    } catch (error) {
        console.log(error);
        res.status(400);
        throw new Error("Error Occurred");
    }
})


const getAssignments = asyncHandler(async(req,res)=>{
    const assignments = await Assignment.find({})
    res.json(assignments)
})

export {createAssignments,getAssignments}