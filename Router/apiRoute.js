const { Router } = require("express")
const express = require("express")
const router = express.Router()
const User = require('../Models/User')
const userBL = require('../BL/userBL')
const { createAuth } = require("../Services/auth")
const { verifyHashedPassword } = require("../Services/passwordHandler")


const app = express()

router.route("/resetPassword").post( async (req , res) =>{
    try{
        
        const resp = await userBL.resetPassword(req.body) 
        resp !== null  ?
        res.status(200).json({msg : "new password sent", email : req.body.email}) :
        res.status(404).json({msg : r.msg ,result: r.result})
    }
    catch(error){
        res.status(500).send({msg : error.message})
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
        // console.log(typeof(newUser)) 
        if(typeof(newUser) != 'object')
            res.status(400).send({msg : newUser})
        else{
            const accessToken = await createAuth(newUser)
            console.log("from signup >>>"+accessToken)
            res.status(201).json({token : accessToken, result : true})
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
            // const h = await verifyHashedPassword(req.body.password, verified.password)
            // console.log(h) 
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