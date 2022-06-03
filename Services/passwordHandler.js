const bcrypt = require('bcryptjs')

const SALT = 10

exports.hashPassword = (pass) =>{
    return new Promise( (resovle , reject ) =>{
        bcrypt.hash(pass, SALT, (err , hash) =>{
            if(err)
                reject(err)
            else{
                
                resovle(hash)
            }
        })
    })
}

exports.verifyHashedPassword = (pass, hashedPass) =>{
    return new Promise( (resovle , reject ) =>{
        bcrypt.compare(pass, hashedPass , (err , result) =>{
            if(err)
                reject(err)
            else
                resovle(result)
        })
    })
}