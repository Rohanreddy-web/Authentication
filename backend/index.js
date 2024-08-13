//const express = require('express';) not require as we changed type in packge.json to modules from ccommon

import  express  from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());//middleware(json format): allows us to parse incomming requests from req.body
app.use(cookieParser());// allows us to parse incoming cookies

app.use("/api/auth", authRoutes)
app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port: ${PORT}`);
})