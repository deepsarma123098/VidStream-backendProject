import mongoose from "mongoose";

import express from "express";
const app = express()

import { DB_NAME } from "../constants.js";
import 'dotenv/config'


const connectDB = async ()=> {
    try {

        // const connectionInstance = await mongoose.connect(`mongodb+srv://sarmadeep123098:deep123@clustermern.ju6gmtq.mongodb.net/${DB_NAME}`)
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

      //connectionInstance here store all the responses after the connection was established/ or data are hold in the connectionInstance.
      console.log(`\n MongoDB connected!! DB HOST ": ${connectionInstance}`);

      app.on("error", (err)=>{
        console.log("ERROR: ", err);
        throw err;
      })

     

    } catch (error) {
        console.log("MONGODB connection FAILED: ", error);
        process.exit(1)
    }
    
}

export default connectDB;