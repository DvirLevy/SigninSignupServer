const res = require('express/lib/response')
const { verify } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')

exports.createAuth = async (user_id)=>{
    console.log(user_id) // create auth with JWT
    return new Promise((resolve, reject)=>{
        jwt.sign({id : user_id}, process.env.RSA_PRIVATE_KEY, {expiresIn: 60*60},
            (err,token) =>{
                if(err)
                    reject(err)
                else{
                    resolve(token)
                }
            }
        )
    }) 
       
}


exports.isAuthenticated = async (req,res,next)=>{ // verify if auth
    const token = req.header("x-access-token")
        console.log("1")
        switch (req.param) {
            case 'api/signin':
            case 'api/signup':
                next()
            break;
            default:
                if(!token)
                    res.status(401).json({msg: "Access Denied", result : false})
                else{
                    try{
                        //needs to see if I realy check the result of the verifiedToken
                        const verifiedToken = jwt.verify(token, process.env.RSA_PRIVATE_KEY)
                        console.log(verifiedToken)
                        next()
                    }
                    catch(error){
                        res.status(400).json({msg : "Invalid token", result : false})
                    }
                }
            break;
    }
        
}