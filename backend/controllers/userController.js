const User=require("../models/userModel")

const asyncHandler=require("express-async-handler")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")



const getallUsers=asyncHandler(
    async(req,res)=>{

        const users= await User.find()

        res.json(users)
    }
)



// @desc  Register new User
// @Route  /api/users/
// @acces   Public
const registerUser=asyncHandler( async (req,res)=>{
    

    const {name, email,password}=req.body
    // console.log("register api hits");
    // console.log(` user ${name},${email}`);
    console.log(req.body);

    // console.log(name,email,password);

    // if any field is missing
    if (!name || !email || !password){

        res.status(400)

        throw new Error ("Please add all fields")
    }

    // if user already exists

    const userExists= await User.findOne({email})

    if (userExists){

        res.status(400)

        throw new Error ("User with this email Already exists")
    }


    // creating hashpassowrd

    const salt= await bcrypt.genSalt(10)

    const hashedPassword= await bcrypt.hash(password,salt)

    // creating user

    const user=await User.create(
        {
            name,
            email,
            password:hashedPassword
        }
    )

    if (user){

        res.status(201)
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{

        res.status(400)
        throw new Error ("Invalid User data")
    }
    
})


// @desc  Authenticate new User
// @Route  /api/users/login
// @acces   Public
const loginUser=asyncHandler(async (req,res)=>{

   const {email,password}=req.body

   const user= await User.findOne({email})

   console.log('login api hits');
   console.log('formdata',req.body);
   if(user && (await bcrypt.compare(password,user.password))){

    console.log('user logged in');
    res.status(200)
    res.json(
        {
            _id: user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
            msg:"User logged in"
        }
    )
   }else{
    res.status(400)
    throw new Error ("Invalid credentials")
   }

})



// @desc  Get  current logend User data
// @Route  /api/users/me
// @acces   Public
const getMe=asyncHandler (async (req,res)=>{

    const {_id,name,email}=await User.findById(req.user.id)

    res.status(200)

    res.json(req.user)

    // res.json({msg :"user data display"})

    

})





// generattoken

const generateToken=(id)=>{

    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d",
    })

}


module.exports={

    registerUser,
    loginUser,
    getMe,
    getallUsers
}