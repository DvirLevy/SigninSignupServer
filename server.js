const express = require('express')
const cors = require('cors')
const apiRoute = require('./Router/apiRoute')
const dotenv = require('dotenv')
const apiAuthRoute = require('./Router/apiAuthRoute')
const { Authorization}  = require('./Services/auth')
const cookieParser = require('cookie-parser')

const {createAuth} = require('./Services/auth')

const app = express()
app.use(cors({
    credentials : true,
    origin : "http://localhost"
}))
dotenv.config()

require('./config/database')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser(process.env.SECRET_KEY))

app.use((req, res, next) => {     
    res.setHeader("Access-Control-Allow-Credentials", true)
    res.append('Access-Control-Allow-Methods', '*');
    res.append('Access-Control-Allow-Headers', "Authorization");
    res.setHeader("Content-Type" , "application/jsonx")
    res.cookie("Authorization","123",{httpOnly: true , secure : true,sameSite: "lax", signed: true})
    next();
});
app.use('/api', apiRoute)
app.use('/api/auth', Authorization, apiAuthRoute)

// app.use((res,next)=>{
//     // try{
//         res.setHeader("Content-Type" , "application/json")
//         res.setHeader('Access-Control-Allow-Credentials', true)

//         // console.log("from midRes \n" + res)
//         // if(res.cookie == undefined){
//         //     const access_token = await createAuth(res.verified.user_id)
//         //         res.cookie("Authorization",`Bearer ${access_token}`,{   
//         //             httpOnly : true,
//         //             sameSite: "strict",
//         //             domain: "http://localhost:3000/",
    
                    
//         //             secure : true,
                    
//         //             // maxAge: 10000
//         //     })
            
//         // }  
//         // else{
//         //     console.log("some err")
//         // }
        
//     // }
//     // catch(error){
//     //     return(error.message)
//     // }
//     next()
// })

app.listen(4000 , ()=>{
    console.log('server runing on port 4000')
})