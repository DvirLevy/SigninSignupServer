const res = require('express/lib/response')
const { verify } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')

exports.createAuth = async (user_id)=>{
    console.log(user_id) // create auth with JWT
   return jwt.sign({id : user_id},
        process.env.RSA_PRIVATE_KEY,
        {expiresIn: 10}
    )
}


exports.isAuthenticated = async (req,res,next)=>{ // verify if auth
    const token = req.header("x-access-key")
    if(!token)
        res.status(401).json({msg: "Access Denied"})
    else{
        try{
            const verifiedToken = jwt.verify(token, process.env.RSA_PRIVATE_KEY)
            console.log(verifiedToken)
            next()
        }
        catch(error){
            res.status(400).json({msg : "Invalid token"})
        }
    }
}