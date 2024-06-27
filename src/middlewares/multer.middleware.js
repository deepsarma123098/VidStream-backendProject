// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.  Remove it after reading docker

import multer from "multer";

const storage = multer.diskStorage({    // //here we will get the file path of the file i.e. in storgae
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    
    //   cb(null, file.fieldname + '-' + uniqueSuffix)

          cb(null, file.originalname) 

    //using originalname is not a good practice as same file name may repeat multiple times then the file is overridden. But the file styas in the server for a very an samll amount of time and then is uploaded to the cloud and then gets deleted. So the above syntax is written where an unique name is generated.
    }
  })
  
 export const upload = multer(
    { 
        storage 

    }
)