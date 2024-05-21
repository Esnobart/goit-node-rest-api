import { User } from "../models/userModel.js";
import sgMail from '@sendgrid/mail';

async function sendEMail(email) {
    const user =  await User.findOne({ email });
    if (!user) return false
    sgMail.setApiKey(process.env.API_KEY)

    const emailConfig = {
        to: user.email,
        from: 'machulaandrii@gmail.com',
        subject: 'Verify email',
        html: `<h1>Your verify token is localhost:3000/api/users/verify/${user.verificationToken}</h1>`
    }

    sgMail.send(emailConfig);
    console.log('Email sent');
    return true
}

export { sendEMail };