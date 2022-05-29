const { Router } = require("express")
const express = require("express")
const router = express.Router()
const User = require('../Models/User')
const userBL = require('../BL/userBL')
const { createAuth } = require("../Services/auth")


const app = express()

router.route("/resetPassword").post( async (req , res) =>{
    try{
        

        await userBL.resetPassword(req.body) ?
        res.status(200).json({msg : "new password sent", email : req.body.email}) :
        res.status(404).json({msg : "user not found"})
    }
    catch(error){
        res.status(500).send(error)
    }

})


router.route("/changePassword").post(async (req,res) =>{
    try{
        const updated = await userBL.changePassword(req.body)
        if (updated.result)
            res.status(200).json(updated)
        else
            res.status(400).json(updated.msg)
    }
    catch(error){
        res.status(500).json(error.message)
    }
})






router.route("/signup").post( async (req , res) =>{
    try{
        const newUser = await userBL.createUser(req.body)
        if(!newUser._id)
            res.status(500).send("something went wrong...")
        else{
            const accessToken = await createAuth(newUser)
            res.status(201).json({token : accessToken})
        }
    }
    catch(error){
        res.status(400).send(error)
    }

})

router.route("/signin").post( async (req , res) =>{
    try{
        const verified = await userBL.isUser(req.body) 
        console.log(verified)
        if(verified.result){
            verified.token = await createAuth(verified.user_id)
            res.status(200).json(verified)
        }
        else
            res.status(401).json(verified)

    }
    catch(error){
        res.status(500).json({msg : error.message})
    }

})





module.exports = router