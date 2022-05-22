const { Router } = require("express")
const express = require("express")
const router = express.Router()
const User = require('../Models/User')
const userBL = require('../BL/userBL')



router.route("/signup").post( async (req , res) =>{
    try{
        const newUser = await userBL.createUser(req.body)
        if(!newUser._id)
            res.status(500).send("something went wrong...")
        else
            res.status(201).json(newUser)
    }
    catch(error){
        res.status(400).send(error)
    }

})

router.route("/signin").post( async (req , res) =>{
    try{
        const emailExist = userBL.isUser(req.body) 
        if(emailExist)
            res.status(200).json(verifyPass._id)
        else
            res.status(401).send("wrong email or password")

    }
    catch(error){
        res.status(500).json({msg : error.message})
    }

})

router.route("/ResetPassword").post( async (req , res) =>{
    try{
        await userBL.userExist(req.body) ?
        res.status(200).json({msg : "user exist", email : req.body.email}) :
        res.status(404).json({msg : "user not found"})
    }
    catch(error){
        res.status(500).send(error)
    }

})


router.route("/ChangePassword").post(async (req,res) =>{
    try{
        const updated = await userBL.changePassword(req.body)
        if (updated.result)
            res.status(200).json({msg : updated.msg})
        else
            res.status(400).json({msg : updated.msg})
    }
    catch(error){
        res.status(500).json({msg : error})
    }
})

module.exports = router
