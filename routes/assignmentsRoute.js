import express from "express";
import { createAssignments,getAssignments } from "../controllers/assignmentsController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.route('/').post(authenticate, createAssignments).get(authenticate,getAssignments)


export default router