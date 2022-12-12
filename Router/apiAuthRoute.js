const { Router } = require("express")
const express = require("express")
const router = express.Router()
const User = require('../Models/User')
const userBL = require('../BL/userBL')
const { createAuth } = require("../Services/auth")




router.route("/").get(async (req,res) =>{ 
    try{
        res.status(200).json({msg : "success",
        result: true})
    }
    catch(error){
        res.status(500).json({msg: error.message, result : false})
    }
})

router.route("/main").get(async (req,res) =>{ 
    try{
        res.status(200).json("movies")
    }
    catch(error){
        res.status(500).json({error})
    }
})

router.route("/test").get(async (req,res) =>{ 
    try{
        
        res.status(200).json(req.headers)
    }
    catch(error){
        res.status(500).json({error})
    }
})





module.exports = router
