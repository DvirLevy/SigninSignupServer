const User = require('../Models/User')
const { use } = require('../Router/apiRoute')
const passwordGenerator = require('../Services/passwordGenerator')
const mailer = require('../Services/mailer')
const { hashPassword, verifyHashedPassword } = require('../Services/passwordHandler')
exports.createUser = async (userDetails) =>{
    try{

        const hashedPassword =  await hashPassword(userDetails.password)

        const user = new User({
            first_name : userDetails.firstName,
            last_name : userDetails.lastName,
            email : userDetails.email,
            password : hashedPassword,
            allow_promotions : userDetails.allowPromotions,
            last_login : +Date.now()
        })
        const savedUser = await user.save()
        
        if(!savedUser instanceof User)
            return "create user faild"
        else
            return savedUser._id
    }
    catch(error){
        return error._message
    }
    
}

exports.isUser = async (userDetails) => {
    
    
    try{
        const findUserEmail = await User.findOne({
            email : userDetails.email
        })
    
        if(findUserEmail){
            const verifyPassword = await verifyHashedPassword(userDetails.password, findUserEmail.password)
            if(verifyPassword){
                const timestamp = await Date.now()
                await User.findByIdAndUpdate({_id : findUserEmail._id} , {last_login : timestamp}, {new : true} )
                return {msg: "success", result : true, user_id : findUserEmail._id }
            }
                
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
        console.log(emailExist)
        if(emailExist == null)
            return false
        else
            return true

    }
    catch(error){
        return error.message
    }
    

}

exports.changePassword = async (userDetails) =>{
    
    try{
        //1. check if he is a user with isUser again
        const verifiedUser = await this.userExist(userDetails)

        //2. update the pass
        if(verifiedUser){
            const newPwd = await hashPassword(userDetails.newPassword)
            console.log("pwd changed " + userDetails.newPassword)
            const updateResult = await User.findOneAndUpdate({email : userDetails.email},{password : newPwd},
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

exports.resetPassword = async (userDetails) =>{
    
    try{
        const dbResponse = await this.userExist(userDetails)
        if (dbResponse != null){
            const newGeneratedPassword = passwordGenerator.passwordGenerator()
            const hashedGenNewPwd = await hashPassword(newGeneratedPassword)
            console.log("resetPwd" + ` ${newGeneratedPassword}`)
            const updateResult = await User.findOneAndUpdate({email : userDetails.email},
                {password : hashedGenNewPwd},
                {new : true})
            await mailer.sendMail(updateResult.email, newGeneratedPassword, updateResult.first_name)
            return updateResult
        }
        else{
            return {msg : "user not found", result : false}
            
            
        }
    }
    catch(error){
        return {msg : error.message , result : false}
    }
    

}
