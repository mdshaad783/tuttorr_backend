import express from "express"
import { createUser, loginUser, logoutUser, getAllUsers, deleteUserById } from "../controllers/userController.js"
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware.js"



const router = express.Router()

router.route('/').post(createUser)
        .get(authenticate, authorizeRoles("admin","teacher"), getAllUsers)

router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.route('/:id')
        .delete(authenticate, authorizeRoles("admin"), deleteUserById)

export default router