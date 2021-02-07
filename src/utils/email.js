const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465, // Port
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })
);

exports.confirmEmail = async (user, url) => {
  try {
    let info = await transporter.sendMail({
      from: process.env.GMAIL_USER, // sender address
      to: user.email, // list of receivers
      subject: "Confirm Password", // Subject line
      text: url, // plain text body
      html: `<a href=${url}>Confirm your account</a>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
};

exports.sendResetPasswordEmail = async (user, url) => {
  try {
    let info = await transporter.sendMail({
      from: process.env.GMAIL_USER, // sender address
      to: user.email, // list of receivers
      subject: "Reset your password", // Subject line
      text: url, // plain text body
      html: `<a href=${url}>Restore your password</a>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
};
