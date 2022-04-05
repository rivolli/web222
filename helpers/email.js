const nodemailer = require("nodemailer");

let getTestTransporter = async function() {
    let testAccount = await nodemailer.createTestAccount()
    return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    })
}

module.exports = {
    send: async function (from, to, subject, msg) {
        let transporter = await getTestTransporter()

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