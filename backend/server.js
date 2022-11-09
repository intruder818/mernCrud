

const exp = require("constants")
const { urlencoded } = require("express")
const express=require("express")
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const dotenv=require("dotenv").config()
const bodyParser=require("body-parser")
const colors=require("colors")
const  Goal=require('./models/goalModel')
const cors = require('cors')


// importign db

const connectDB=require("./config/db")
connectDB()

const { errorHandler } = require('./middleware/errorMiddleware');
const { log } = require("console")

// initialising express app
const app =express()
app.use(cors())




const PORT= process.env.PORT || 5000

app.listen(PORT,console.log(` server running on http://localhost:${PORT}`))







// // Middlewware for parsing  raw body data
// app.use(express.json())
// // to handle form data
// app.use(urlencoded({extended:true}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




// Goal Apis
app.use('/api/goals', require("./routes/goalRoutes"))


// user Apis
app.use('/api/users', require("./routes/userRoutes"))


// At the End
app.use(errorHandler)

const now=new Date()
console.log(now.toLocaleTimeString());
console.log(now.toDateString());

