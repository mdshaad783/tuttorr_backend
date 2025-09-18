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

const allowedOrigins = [
  "http://localhost:5173",       // local dev
  "https://tuttorr.vercel.app"   // deployed frontend
];

// backend/server.js
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like Postman) or from allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cookieParser());
app.use(express.json())
app.use('/api/users', userRoutes)

app.listen(port,()=>{
    console.log(`App successfully running on port: ${port}`)
})