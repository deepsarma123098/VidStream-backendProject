import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });


    //Upload
    const uploadOnCloudinary = async(localFilePath)=> {
        try {
            if(!localFilePath) return "Couldn't find file path"

            //upload the file in cloudinary
           const response =  await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            
            console.log(response.url);
            //filehas been uploaded successfully
            // console.log("File is uploaded on cludinary ", response.url);
            fs.unlinkSync(localFilePath) //remove the localfile syncronously after uploading

            return response 
           
        } catch (error) {
            fs.unlinkSync(localFilePath) //Remove the locally saved temporary file as the upload operation got failed
            return null;
            
        }
    }

export { uploadOnCloudinary }
    
   
/*
   
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();

*/