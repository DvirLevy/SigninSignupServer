const User = require('../Models/User')
const { use } = require('../Router/apiRoute')
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
        const findUserEmail = await User.findOne({
            email : userDetails.email
        })
        
        if(findUserEmail){
            const verifyPass = await User.findOne({password: userDetails.password})
            
            if(verifyPass)
                return {msg: "success", result : true, user_id : verifyPass._id }
            else
                return {msg : "wrong email or password", result : false}
        }
        else{
            return {msg : "wrong email or password", result : false}
        }
    }
    catch(error){
        return error
    }
}

exports.userExist = async (userDetails) =>{
    try{
        emailExist = await User.findOne({email : userDetails.email})
        if(emailExist)
            return true
        else
            return false

    }
    catch(error){
        return error
    }
    

}

exports.changePassword = async (userDetails) =>{
    
    try{
        //1. check if he is a user with isUser again
        const verifiedUser = await this.isUser(userDetails)

        //2. update the pass
        if(verifiedUser.result){
            const updateResult = await User.findOneAndUpdate({email : userDetails.email},{password : userDetails.newPassword},
                {new : true})
            if(updateResult != null)
                return {msg : "success", _id : updateResult._id, result: true}
            else
                return {msg : "not found", result : false}
        }
        else{
            return {msg : "something went wrong", result : false}
        }
    }
    catch(error){
        return error
    }
    

}
