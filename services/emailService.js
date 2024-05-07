import { User } from "../models/userModel.js";
import sgMail from '@sendgrid/mail';

async function sendEMail(email) {
    try {
        const user =  await User.findOne({ email })
        sgMail.setApiKey(process.env.API_KEY)

        const emailConfig = {
            to: 'offrichterrr@gmail.com',
            from: 'machulaandrii@gmail.com',
            subject: 'verify email',
            html: `<h1>Your verify token is localhost:3000/api/users/verify/${user.verificationToken}</h1>`
        }

        sgMail
        .send(emailConfig)
        .then(() => {
            console.log('Email sent')
        })
        .catch((err) => {
            console.log(err)
        })
        
        return true
    } catch (err) {
        console.log(err)
    }
}

export { sendEMail };