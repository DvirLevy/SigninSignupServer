// const { Router } = require("express")
const express = require("express")
const router = express.Router()
// const User = require('../Models/User')
const userBL = require('../BL/userBL')
const { createAuth } = require("../Services/auth")
// const { verifyHashedPassword } = require("../Services/passwordHandler")


const app = express()

router.route("/resetPassword").post( async (req,res) =>{
    try{
        
        const resp = await userBL.resetPassword(req.body) 
        resp !== null  ?
        res.status(200).json({msg : "new password sent", email : req.body.email}) :
        res.status(404).json({msg : resp.msg ,result: resp.result})
        

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
        // if(typeof(newUser) != 'object')
            // res.status(400).send({msg : newUser})
        // else{
            const accessToken = await createAuth(newUser)
            console.log("from signup >>>"+accessToken)
            // res.cookie("Authorization",`Bearer ${accessToken}`,{   
            //     httpOnly : false,
                
                
            // })
            res.status(201).json({token : accessToken, result : true, user_id: newUser})
        // }
    }
    catch(error){
        res.status(400).json(error.message)
    }

})

router.route("/signin").post( async (req , res,next) =>{
    try{
        const verified = await userBL.isUser(req.body) 
        console.log(verified)
        if(verified.result){
            verified.token = await createAuth(verified.user_id)
            console.log("from midRes \n" + res)
                // res.cookie("Authorization",`Bearer ${verified.token}`,{   
                //     httpOnly : true, // try send it with false val
                //     sameSite: "lax",
                //     secure : false
    
                    
                //     // secure : true, used only for HTTPS
                    
                //     // maxAge: 10000
                // })
                
            res.status(200).json(verified)
            
            
        }
        else
            res.status(401).json(verified)

    }
    catch(error){
        res.status(500).json({msg : error.message})
    }

})

router.route("/checkEmail").post( async (req , res) =>{
    try{
        const mailExist = await userBL.userExist(req.body)
        console.log('from emailCheck '+mailExist);
        mailExist ? res.status(409).json({msg : "user already exist", result: true}) :
        res.status(200).json({msg: "success", result : false}) 
        
    }
    catch(error){
        res.status(500).json({msg : error.message})
    }

})




module.exports = router