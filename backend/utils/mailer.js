import nodejsmailer from "nodemailer";

var transporter = nodejsmailer.createTransport({
  service: "gmail",
  auth: {
    user: "fggdgu20@gmail.com",
    pass: "phvx qbln mcdw xbxx",
  },
});

const sendMail = (userMail, message, subject = "sending mail to user") => {
  const mailOptions = {
    from: "fggdgu20@gmail.com",
    to: userMail,
    subject: subject,
    text: message,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Email sent successfully!" + info.response);
    }
  });
};

export default sendMail;
