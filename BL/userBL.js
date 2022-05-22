const User = require('../Models/User')
exports.createUser = async (userDetails) =>{
    try{
        const user = new User({
            first_name : userDetails.firstName,
            last_name : userDetails.lastName,
            email : userDetails.email,
            password : userDetails.password,
            allow_promotions : userDetails.allowPromotions
        })
        const savedUser = await user.save()
        
        if(!savedUser instanceof User)
            return "create user faild"
        else
            return savedUser._id
    }
    catch(error){
        return error
    }
    
}

exports.isUser = async (userDetails) => {

    
    try{
        // let result = {
        //     res,
        //     msg
        // }
        console.log(userDetails)
        const findUserEmail = await User.findOne({
            email : userDetails.email
        })
        if(!findUserEmail){
            // result.msg = findUserEmail
            // result.res = false
            // console.log(result)
            return false
        }
    
        const verifyPass = await User.findOne({password: req.body.password})
        if(!verifyPass)
            return false
        
        return true
    }
    catch(error){
        return error
    }
}

exports.userExist = async (userDetails) =>{
    try{
        emailExist = await User.findOne({email : userDetails.email})
        if(emailExist)
            return emailExist
        else
            return false

    }
    catch(error){
        return error
    }
    

}

exports.changePassword = async (userDetails) =>{
    
    try{
        const updateResult = await User.findOneAndUpdate({email : userDetails.email},{password : userDetails.newPassword},
            {new : true})
        if(updateResult != null)
            return {msg : "success", _id : updateResult._id, resut: true}
        else
            return {msg : "not found", result : false}
    }
    catch(error){
        return error
    }
    

}
