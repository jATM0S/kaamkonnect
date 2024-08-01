const nodemailer = require("nodemailer");

const sendEmail = async (details) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
      user: "f761f364d20e15",
      pass: "9a1aeb2f1df37e",
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
