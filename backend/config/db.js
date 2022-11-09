const  mongoose=require("mongoose")
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const dotenv=require("dotenv").config()
const MONGO_URI=`mongodb+srv://mongodb:mongodb123@cluster2.83ho6ow.mongodb.net/authapp?retryWrites=true&w=majority`

const connectDB=async()=>{

    try{

        console.log(MONGO_URI);

        const conn=await mongoose.connect(process.env.MONGO_URI)

        console.log(`MONGO DB connected :${conn.connection.host}`.cyan.underline);
    }
    catch(error){

        console.log(error);
        process.exit(1)


    }

}

module.exports=connectDB