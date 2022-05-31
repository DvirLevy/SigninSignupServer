const bcrypt = require('bcryptjs')
const res = require('express/lib/response')

const SALT = 10

exports.hashPassword = (pass) =>{
    return new Promise( (resovle , reject ) =>{
        bcrypt.hash(pass, SALT, (err , hash) =>{
            if(err)
                reject(err)
            else{
                console.log(hash)
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