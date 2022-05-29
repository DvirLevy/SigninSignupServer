const { Router } = require("express")
const express = require("express")
const router = express.Router()
const User = require('../Models/User')
const userBL = require('../BL/userBL')
const { createAuth } = require("../Services/auth")




router.route("/main").get(async (req,res) =>{ // for now only for verifing the user
    try{
        res.status(200).json("movies")
    }
    catch(error){
        res.status(500).json({error})
    }
})



module.exports = router
