const jwt =require("jsonwebtoken")
const asyncHandler=require("express-async-handler")
const User=require("../models/userModel")


const protect=asyncHandler( async(req,res,next)=>{

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

        try{

            console.log(req.headers);

           
            // get token from header  
            // in header Bearer space token so wi wil get token by split(" ")
            token=req.headers.authorization.split(" ")[1]
           


            // verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET)

            console.log(decoded);
           

            // get user from the token and decoded.id 
            req.user= await User.findById(decoded.id).select("-password")
            next()

            // this re.user can be used to acces values of that user

        }

        catch(err){

            console.log(err);
            res.status(401)
            throw new Error ("Not authorized")

        }
    }
    if(!token){
        res.status(401)
        throw new Error ("Not authorized,No token")

    }
})


module.exports=protect