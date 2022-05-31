const User = require('../Models/User')
const { use } = require('../Router/apiRoute')
const passwordGenerator = require('../Services/passwordGenerator')
const mailer = require('../Services/mailer')
const { hashPassword, verifyHashedPassword } = require('../Services/passwordHandler')
exports.createUser = async (userDetails) =>{
    try{

        const hashedPassword =  await hashPassword(userDetails.password)
        console.log("hashPassword >>>  "+hashedPassword)

        const user = new User({
            first_name : userDetails.firstName,
            last_name : userDetails.lastName,
            email : userDetails.email,
            password : hashedPassword,
            allow_promotions : userDetails.allowPromotions
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
        console.log(findUserEmail)
        
        if(findUserEmail){
            const verifyPassword = await verifyHashedPassword(userDetails.password, findUserEmail.password)
            if(verifyPassword)
                return {msg: "success", result : true, user_id : findUserEmail._id }
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
        if(emailExist != null)
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

exports.resetPassword = async (userDetails) =>{
    
    try{
        const r = await await this.userExist(userDetails)
        if (r != null){
            const newGeneratedPassword = passwordGenerator.passwordGenerator()
            const updateResult = await User.findOneAndUpdate({email : userDetails.email},
                {password : await hashPassword(newGeneratedPassword)},
                {new : true})
            console.log(updateResult)
            const result = await mailer.sendMail(updateResult.email, newGeneratedPassword, updateResult.first_name)
            console.log(result)
            return updateResult
        }
        else{
            const resp = {msg : "user not found", result : false}
            return resp
        }
    }
    catch(error){
        return {msg : error.message , result : false}
    }
    

}
