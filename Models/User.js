const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true,
        min : 2
    },
    last_name : {
        type : String,
        required : true,
        min : 2
    },
    email : {
        type : String,
        require : true,
        min : 4
    },
    password : {
        type : String,
        required : true,
        min : 6
    },
    allow_promotions : {
        type : Boolean,
        required : false
    },
    date :{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("User" , userSchema)