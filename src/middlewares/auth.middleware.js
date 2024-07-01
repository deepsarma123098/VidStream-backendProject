
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
     
     throw new ApiError(401, "Invalid Access Token")
    }
 
 
    req.user = user;
    next();
   } catch (error) {
      throw new ApiError(401, error?.message || "Invalid Access Token")
      
      /* My code,i.e. there are scenarios where the token may be expired, JsonWebTokenError: This is a generic error for JWT-related issues, such as an invalid token, NotBeforeError: This error occurs when the token is not yet active. JWTs can have a "not before" (nbf) field that indicates the time before which the token should not be accepted for processing, so to avoid such secnrios we use a try catch block inside asyncHandler in JWT where we pass a custom message or check thecondtions and then send the message retaled to that error.

      if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, "Token has expired");
    } else if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, "Invalid token");
    } else if (error.name === 'NotBeforeError') {
      throw new ApiError(401, "Token not active");
    } else {
      throw new ApiError(401, error.message || "Invalid Access Token");
    }*/

   }



})

