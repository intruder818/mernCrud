const mongoose=require('mongoose')

const goalSchema=mongoose.Schema({


    user:{

        type:mongoose.Schema.Types.ObjectId,
        required:(true,'user is required'),

        ref:'User'

    },
    text:{

        type:String,
        required:(true,'Please add  a text')
    }
    ,

    expense:{
        type:Number,
        required:(true,'Please add  a text')
    },

    city:{
        type:String,
        required:(true,'Please add  a text')

    }

    


},{

    timestamps:true

})

module.exports=mongoose.model('Goal',goalSchema)