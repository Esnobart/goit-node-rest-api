import sgMail from '@sendgrid/mail';

async function sendEMail(user) {
    sgMail.setApiKey(process.env.API_KEY);

    const emailConfig = {
        to: user.email,
        from: 'machulaandrii@gmail.com',
        subject: 'Verify email',
        html: `<h1>Your verify token is localhost:3000/api/users/verify/${user.verificationToken}</h1>`
    }

    (async () => {
        try {
          await sgMail.send(emailConfig);
        } catch (error) {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        }
      })();
    return true
}

export { sendEMail };