const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1f581a7ce7b3c7",
    pass: "7029a25dcd8711"
  }
});
