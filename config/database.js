const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser : true }, (err) => {
    if(err)
        console.log(err)
    else
        console.log("connected to DB")
})