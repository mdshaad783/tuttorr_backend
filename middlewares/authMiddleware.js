import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";


const authenticate = asyncHandler(async(req,res,next)=>{
    let token;
    if (req.headers.authorization?.startsWith('Bearer')){
        const token = req.headers.authorization.split(" ")[1];
    }

    else if(req.cookies.jwt){
        token = req.cookies.jwt;
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorised, no token")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        res.status(401)
        throw new Error('Not authorised, token failed...')
    }
})
const authorizeRoles = (...allowedRoles)=>{
    return (req,res,next)=>{
        if (!req.user){
            return res.status(401).json({message:"Not an authenticated user...."})
        }
        if (!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message:"Current user not authorised for this action...."})
        }
        next();
    }
}


export {authenticate, authorizeRoles}