require("dotenv").config();
var nodemailer = require("nodemailer");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const userEmail = process.env.USER_EMAIL;
var accessToken = "";

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: "OAuth2",
    clientId: clientId,
    clientSecret: clientSecret
  }
});

// By using the refreshToken the accessToken will expire sooner or later so when it gets updated this event will trigger
transporter.on("token", token => {
  console.log("A new access token was generated");
  //   console.log("User: %s", token.user);
  //   console.log("Access Token: %s", token.accessToken);
  accessToken = token.accessToken;
  console.log("Expires: %s", new Date(token.expires));
});

// setup e-mail data with unicode symbols
let mailOptions = {
  from: userEmail, // sender address
  to: "", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world ?", // plaintext body
  html: "<b>Hello world ?</b>", // html body

  auth: {
    user: userEmail,
    refreshToken: refreshToken,
    accessToken: accessToken,
    expires: 1494388182480
  }
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    return console.log(error);
  }
  console.log("Message sent: " + info.response);
});
