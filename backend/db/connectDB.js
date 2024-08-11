import mongoose from "mongoose";


export const connectDb = async ()=>{
    try {
    console.log("mongo_uri: ", process.env.MONGO_URI);
       const connectionn = await mongoose.connect(process.env.MONGO_URI)
       console.log(`MongoDB connected : ${connectionn.connection.host}`);
    } catch (error) {
        console.log("error while connecting DB", error.message);
        process.exit(1)// 1 is failure, if 0 then success
    }
}