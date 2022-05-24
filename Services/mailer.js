const nodemailer = require('nodemailer')

exports.sendMail = async (mailReceiver, generatedPassword, firstName) => {

    try{
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service : "gmail",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
            user: process.env.MAIL_USER, // generated ethereal user
            pass: process.env.MAIL_APP_PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        const option = await transporter.sendMail({
            from: "Cinema Website",
            to: `${mailReceiver}`, 
            subject: "New Password from Cinema Websit",
            text: `Hi ${firstName} that is your new password >> ${generatedPassword}`, 
        });

        transporter.sendMail(option, (err,info) =>{
            if(err)
                return err
            else
                return info
        })
    }
    catch(error){
        return error.message 
    }
}
