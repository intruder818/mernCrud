const express=require("express")
const router=express.Router()
const { registerUser,loginUser,getMe,getallUsers } = require("../controllers/userController")




const protect=require("../middleware/autMidlleware")




router.post("/",registerUser)
router.get("/me",protect,getMe)
router.post("/login",loginUser)

router.get("/",getallUsers)






module.exports=router