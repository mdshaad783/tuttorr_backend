import express from "express"
import { createUser, loginUser, logoutUser } from "../controllers/userController.js"
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware.js"



const router = express.Router()

router.route('/').post(createUser)
        // .get(authenticate, authorizeRoles(admin))

router.post('/login',loginUser)
router.post('/logout',logoutUser)


export default router