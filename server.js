const express = require('express')
const cors = require('cors')
const apiRoute = require('./Router/apiRoute')
const dotenv = require('dotenv')

const app = express()
app.use(cors())
dotenv.config()

require('./config/database')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api', apiRoute)

app.listen(4000, ()=>{
    console.log('server runing on port 4000')
})