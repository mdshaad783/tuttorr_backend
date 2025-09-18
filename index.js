import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv"
import userRoutes from './routes/userRoutes.js'
import cors from "cors";
import cookieParser from "cookie-parser"; 

dotenv.config()

const port = process.env.PORT || 5000
connectDb()

const app = express()
// backend/server.js
app.use(cors({
  origin: "http://localhost:5173", // or your frontend URL
  credentials: true
}));

app.use(cookieParser());
app.use(express.json())
app.use('/api/users', userRoutes)

app.listen(port,()=>{
    console.log(`App successfully running on port: ${port}`)
})