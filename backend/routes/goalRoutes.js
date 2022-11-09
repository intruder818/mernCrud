const express=require("express")

const router=express.Router()

const protect=require("../middleware/autMidlleware")

const {getGoals,setGoals,deleteGoals,updateGoals}=require("../controllers/goalController")



router.route("/").get(protect,getGoals).post(protect,setGoals)

router.route("/:id").put(protect,updateGoals).delete(protect,deleteGoals)

// // GET GOALS
// router.get("/",getGoals)


// // CREATE GOALS
// router.post("/",createGoals)


// // UPDATE GOALS
// router.put("/:id",updateGoals)


// // DELLTE GOALS
// router.delete("/:id",deleteGoals)


















module.exports=router