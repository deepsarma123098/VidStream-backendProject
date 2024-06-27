//Since we have to talk to database multiple times i.e. for user controller, videos controller etc. so instead of writing code of connecting to database every time we create a file and we create a generalized function and pass it to the methods where connecting to database is required.
//So we create this file.

const asyncHandler = (requestHandler)=> {

     return  (req,res,next)=> {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
       }
}

export { asyncHandler}






// const asyncHandler= (fn)=> async(req, res, next) => {

//      try {
//           await fn(req, res, next)
//      } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//      }

// }