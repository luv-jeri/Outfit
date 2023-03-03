const nodemailer = require('nodemailer');

const transpoter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '5620d9f2ea17f3',
    pass: '27fb63cafd20bc',
  },
});

const sendEmail = async (options) => {
  const { email, subject, message, html } = options;

  const mailOptions = {
    from: 'Outfit',
    to: email,
    subject,
    text: message,
    html: html ? html : null,
  };

  await transpoter.sendMail(mailOptions);
};

module.exports = sendEmail;
