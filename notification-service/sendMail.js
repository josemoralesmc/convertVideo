const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
    tls: {
        rejectUnauthorized: false
    },
    host: "smtp.forwardemail.net",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_EMAIL_SENDER,
        pass: process.env.GOOGLE_PASSWORD,
    },
});

// async..await is not allowed in global scope, must use a wrapper
// send mail with defined transport object
async function sendEmail(to, link="") {
    try {
        await transporter.sendMail({
            from: `"Video to MP3 Converter" <${process.env.GOOGLE_EMAIL_SENDER}>`, // sender address
            to,
            subject: "Your video has been converted to MP3!", // Subject line
            text: "Hello world?",
            html: `
                <h2 class="lw">VIDEO TO MP3 CONVERTER</h2>
    
                <p>Your video has been converted to mp3</p>
                <a href="${link}">Download link</a>
            `,
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail;