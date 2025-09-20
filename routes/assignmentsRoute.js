import express from "express";
import { createAssignments } from "../controllers/assignmentsController.js";

const router = express.Router()

router.route('/').post(createAssignments)


export default router