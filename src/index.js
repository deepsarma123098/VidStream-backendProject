

// require('dotenv').config( {path: './env'})

//require('dotenv').config() takes an object as an argument and there we pass the path

//We are using the import statement for dotenv as this matches the flow of the code. But using dotenv package we have to also configure.


import dotenv from 'dotenv'

import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
    path: './.env'
})


connectDB()
.then(()=> {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=> { 
    console.log("MongoDB connection failed !!! ", err);
})



























/*
//1st approach

// function connectDB() { // }
// connectDB()

//But a more better approach is connecting by using IIFE.


(async ()=> {
     try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //After thecoonection string we need to add the DB name and we add it usig /DbName
       app.on("error", ( error)=> {
        console.log("ERRR: ", error)
        throw error
       })

       app.listen(process.env.PORT , ()=> {
        console.log(`Appis listening on port ${process.env.PORT}`);
       })

     } catch (error) {
        console.error("ERROR: ", error)
        throw error //throwing error exits the process if error in encountered
        
     }
})()

*/