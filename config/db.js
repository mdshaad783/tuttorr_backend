import mongoose from "mongoose";

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 sec timeout
    });
        console.log("Database Connected Successfully....")
    }
    catch(error){
        console.log("Database connection failed: ",error.message)
    }
}

export default connectDb