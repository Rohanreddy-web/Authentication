//const express = require('express';) not require as we changed type in packge.json to modules from ccommon

import  Express  from "express";
import { connectDb } from "./db/connectDB.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = Express();
const PORT = process.env.PORT || 5000;

app.use(Express.json());//middleware(json format): allows us to parse incomming requests from req.body

app.use("/api/auth", authRoutes)
app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
})