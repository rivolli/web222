const nodemailer = require("nodemailer");

let getTransporter = async function() {
    
}

module.exports = {
    send: async function (from, to, subject, msg) {
        if (process.env.EMAIL_USER=='test' && process.env.EMAIL_PASSWORD=='test') {
            let testAccount = await nodemailer.createTestAccount()
            process.env.EMAIL_USER = testAccount.user
            process.env.EMAIL_PASSWORD = testAccount.pass    
            console.log("Passando por aqui...")
        }
        
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
        })

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"${from.name}" <${from.email}>`, // sender address
            to: `"${to.name}" <${to.email}>`, // list of receivers
            subject: subject, // Subject line
            text: msg, // plain text body
            html: msg, // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        //return info
        return true
    }
}