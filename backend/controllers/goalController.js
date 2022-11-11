const { log } = require("console")

const asyncHandler=require("express-async-handler")
const Goal=require("../models/goalModel")

const mongoose=require("mongoose")

const User=require("../models/userModel")







// get goals
const getGoals= asyncHandler(async (req,res)=>{
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const user_id=req.user.id
    const goals=await Goal.find({user:req.user.id}).limit(pageSize).skip(pageSize * page).sort({ _id: 1 });
    const totalExpense= await Goal.aggregate([
        { $match: {"user":new mongoose.Types.ObjectId(user_id)} },
        {$group: {_id:{city:"$city"}, cityExpense:{$sum:"$expense"}}},

       { $project:{city:"$_id.city",cityExpense:"$cityExpense",Total:{$sum:"$cityExpense"}}}
    ])
    const cityExpense= await Goal.aggregate([{$group: {_id:"$city", Total:{$sum:"$expense"}}}])
    // const totalExpense= await Goal.aggregate([{ $match: {"user":new mongoose.Types.ObjectId(user_id)} },{$group: {_id:null, citynew:{$sum:"$expense"}}}])
    console.log("TotalEXp",totalExpense);
    console.log("Zsum",cityExpense);
    res.status(200).json({
        goals,totalExpense
    })
})





// seT goals
const setGoals= asyncHandler(async(req,res)=>{ 
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    console.log("set goal api triggered");
    // console.log("goal Data---> BE",req.body);
    // to check for empty obj {}
        const obj =req.body;
        const isEmpty = Object.keys(obj).length === 0;
    const {text,city,expense}=req.body
    if (!(text||city||expense)) {
        console.log("teted empty");
        res.status(404)
        throw new Error('Please add all fields')
        return
      }

      const goal=await Goal.create({
        text:text,
        city,
        expense,
        user:req.user.id
      })

      const goals=await Goal.find({user:req.user.id});
     
    res.status(200).json(goals)
        
        
        
        
        
       
      
})

// update goals
const updateGoals=asyncHandler( async (req,res)=>{
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    const goal= await Goal.findById(req.params.id)

    if(!goal){

        res.status(400)

        throw new Error (`No goal with the given id ${req.params.id}`) 
    }

    // to get he current logged user
    const user = await User.findById(req.user.id)
    // To check if we have a logged in user
    if(!req.user){

        res.status(401)
        throw new Error(" user not found")
    }
    //  To make user logged in user can delete/update its own goal
    if(req.user.id!==goal.user.toString()){
        res.status(401)
        throw new Error(" user not authorized")

    }

    
    const updatedGoal= await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
    const goals=await Goal.find({user:req.user.id})
    // res.status(200).json(goals)
    // const goals=await Goal.find({user:req.user.id}).limit(pageSize).skip(pageSize * page).sort({ _id: 1 });
    res.status(200).json(goals)
    
    })


// Delete goals
const deleteGoals=asyncHandler(async (req,res)=>{ 
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    console.log("---------BE Del Api -----");
    const goal= await Goal.findById(req.params.id)

    if(!goal){

        res.status(400)

        throw new Error (`No goal with the given id ${req.params.id}`)

        
    }

     // to get he current logged user
     const user = await User.findById(req.user.id)
     // To check if we have a logged in user
     if(!user){
 
         res.status(401)
         throw new Error(" user not found")
     }
     //  To make user logged in user can delete/update its own goal
     if(user.id!==goal.user.toString()){
         res.status(401)
         throw new Error(" user not authorized")
 
     }

    const deleteGoal= await Goal.findByIdAndDelete(req.params.id)

    // const goals=await Goal.find({user:req.user.id})
    // res.status(200).json(goals)
    const goals=await Goal.find({user:req.user.id}).limit(pageSize).skip(pageSize * page).sort({ _id: 1 });
    res.status(200).json(goals)
    
}
    )



// exporting controllers

module.exports={

    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}