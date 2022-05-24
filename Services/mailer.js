const nodemailer = require('nodemailer')

exports.sendMail = async (mailReceiver, generatedPassword, firstName) => {

    try{
        let transporter = nodemailer.createTransport({
            service : "gmail",
            auth: {
                user: process.env.MAIL_USER, 
                pass: process.env.MAIL_APP_PASSWORD, 
            },
        });

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

//sfasfddfdadfaddsf