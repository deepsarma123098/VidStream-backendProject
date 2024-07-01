
import { User } from "../models/User.model.js";
import { ApiError } from "../utlis/ApiError.js";
import { asyncHandler } from "../utlis/asyncHandler.js";
import jwt from  "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req,res, next)=> {

   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") //43:00
 
     ///Since we only need tha value of token and no the Bearer so we replace it.
     //Authorization: Bearer <token>, in this format custom headers are sent
 
     if(!token){
         throw new ApiError(401, "Unathorized request")
     }
 
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) //token can be decoded only it is passed with the secret key and in verify method the second parameter is the secret key
 
    //In situations we may need to use await keyword in jwt.So check the o/p, if error use await.
 
    const user = await User.findById(decodedToken?._id).select(
     "-password -refreshToken"
    )
 
    if(!user) {
     //TODO discussion about frontend
     throw new ApiError(401, "Invalid Access Token")
    }
 
 
    req.user = user;
    next();
   } catch (error) {
      throw new ApiError(401, error?.message || "Invalid Access Token")
   }



})

