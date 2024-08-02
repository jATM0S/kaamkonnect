const nodemailer = require("nodemailer");

const sendEmail = async (details) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: '"Bikesh Maharjan"<bks.mhryadayada@gmail.com',
    to: details.email,
    subject: details.subject,
    text: details.message,
  });
};
module.exports = sendEmail;
