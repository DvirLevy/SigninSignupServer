const express = require('express')
const cors = require('cors')
const apiRoute = require('./Router/apiRoute')
const dotenv = require('dotenv')
const apiAuthRoute = require('./Router/apiAuthRoute')
const { isAuthenticated}  = require('./Services/auth')
const app = express()
app.use(cors())
dotenv.config()

require('./config/database')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use((req,res,next)=>{
    res.setHeader("Content-Type" , "application/jsonx")
    next()
})

app.use('/api', apiRoute)
app.use('/api/auth', isAuthenticated, apiAuthRoute)


app.listen(4000, ()=>{
    console.log('server runing on port 4000')
})