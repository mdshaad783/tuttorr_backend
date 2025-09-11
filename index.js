import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv"
import userRoutes from './routes/userRoutes.js'
import cors from "cors";

dotenv.config()

const port = process.env.PORT
connectDb()

const app = express()
app.use(cors());

app.use(express.json())
app.use('/api/users', userRoutes)

app.listen(port,()=>{
    console.log(`App successfully running on port: ${port}`)
})