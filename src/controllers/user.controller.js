import { asyncHandler } from "../utlis/asyncHandler.js";
import { ApiError} from '../utlis/ApiError.js'
import { User } from "../models/User.model.js"
import { uploadOnCloudinary } from '../utlis/cloudinary.js'
import { ApiResponse } from '..//utlis/ApiResponse.js'

const registerUser = asyncHandler (async(req, res)=> {
 
    //get user details from frontend (we can do that using postman also)
    //validation = not empty
    //check if user already exist (compare username and also email)
    //check for images, check for avatar (i.e. file handling)
    //upload them to cloudinary, avatar

    //create user object- create entry in db
    //remove password and refresh token filed from response
    //check for user creation
    //return response+



    //ret user details from frontend, req.body , req.query, req.params etc.

    const {fullName, email, username, password} = req.body
    console.log("email ", email);

     if ( [fullName, email, username, password].some((filed)=> filed?.trim === ""))  {
        throw new ApiError(400, "All fields are required")
     } 

     if(!email.includes('@')){
        throw new ApiError(400, "@ is required in mail field")
     }
 
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
     })

     if(existedUser){
        throw new ApiError(409, "User with email or username already existed")
     }


     //     if(fullName=== ""){
//         throw ApiError(400, "fullname is required")


//     }

    const avatarLocalPath =  req.files?.avatar[0]?.path 
    // This gives us the path uploaded by multer. Multer uploads the file in the server and so after that we are able to access the path.

    const coverImageLocalPath = req.files?.coverImage[0]?.path; 

    //These path may or may not be there but avatar path path must be there. Multer has uploaded the path but we need to checkif it has reached our local server or not.

    if(!avatarLocalPath){
      throw new ApiError(400, "Avatar file is required")
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
   
    if(!avatar){
      throw new ApiError(400, "Avatar file is required")
    }

    //Since avatar is required filed so we check for it in every step i.e. while it is uploaded in the local server and also uploading it in the cloud


    const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
    })

  const createdUser = await User.findById(user._id).select(
   "-password -refreshToken"
  )

 if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
 }

 return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered successfully")
 )

})


export {registerUser}