const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : [true, "First name is required"], 
        min : 2
    },
    last_name : {
        type : String,
        required : [true, "First name is required"],
        min : 2
    },
    email : {
        type : String,
        require : [true, "valid email is required"],
        min : 4
    },
    password : {
        type : String,
        required : [true, "valid password is required"],
        min : 6
    },
    allow_promotions : {
        type : Boolean,
        required : false
    },
    date :{
        type : Date,
        default : Date.now
    }, 

    last_login : {
        type : Number,
        required : false
    }
    
})

module.exports = mongoose.model("User" , userSchema)