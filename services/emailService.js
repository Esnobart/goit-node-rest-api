import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.API_KEY);

async function sendEMail(email, token) {
    const emailConfig = {
        to: email,
        from: 'machulaandrii@gmail.com',
        subject: 'Verify email',
        html: `<h1>Your verify token is localhost:3000/api/users/verify/${token}</h1>`
    }

    await sgMail.send(emailConfig);
    return true
}

export { sendEMail };