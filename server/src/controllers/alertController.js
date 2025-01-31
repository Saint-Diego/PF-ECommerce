const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const HttpError = require("../errors/http-error");
const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, REDIRECT_URI } = process.env;

const alertController = {
  sendEmail: async (req, res, next) => {
    const { emails, subject, content } = req.body;

    try {
      const oAuthsClient = new google.auth.OAuth2(
        "863323985411-109tf7nda0qk2ft2k6jjmlltentarjh6.apps.googleusercontent.com",
        "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",
        "https://developers.google.com/oauthplayground"
      );
      oAuthsClient.setCredentials({ refresh_token: "1//04MF38_YUdCK0CgYIARAAGAQSNwF-L9Irrwj5UETXVovhkeTQEdf8fNxG_OUxqQBkr36poSnEf6cYDIeAyuzs5DEPz88aaBZZvgM" });
      const accessToken = await oAuthsClient.getAccessToken();
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: "sigl.system@gmail.com",
          clientId: "863323985411-109tf7nda0qk2ft2k6jjmlltentarjh6.apps.googleusercontent.com",
          clientSecret: "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",
          refreshToken: "1//04MF38_YUdCK0CgYIARAAGAQSNwF-L9Irrwj5UETXVovhkeTQEdf8fNxG_OUxqQBkr36poSnEf6cYDIeAyuzs5DEPz88aaBZZvgM",
          accessToken,
        },
        tls: {
          rejectUnauthorized: true,
        },
      });
      
      let htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          img {
            border-radius: 5px;
          }
          h1, h3, h4 {
            font-family: Arial, Helvetica, sans-serif;
          }
          h4 {
            color: #999;
          }
          a {
            padding: 5px 10px;
            background: #32bd5c;
            color: #2e2d2d;
            font-family: sans-serif, Arial, aouto;
            font-weight: bold;
            border: 1px solid #00000075;
            border-radius: 5px;
            text-decoration: none;
          }
          a:hover {
            background: #2e2d2d;
            color: #32bd5c;
            cursor: pointer;
            border: 2px solid #32bd5c;
          }
        </style>
        <title>Don Quijote</title>
      </head>
      <body>
        <div>
          <img src="https://res.cloudinary.com/dah19wrh1/image/upload/v1666150949/dev/assets/logo-don-quijote.png" alt="logo-don-quijote.png">
          ${content.body}
          ${content.footer ? content.footer : ""}
        </div>
      </body>
      </html>
      `;
      const mailDetails = {
        from: "'Don Quijote' <sigl.system@gmail.com>",
        to: emails,
        subject,
        html: htmlContent,
      };
      const info = await transporter.sendMail(mailDetails);
      res.status(201).send(info);
    } catch (error) {
      console.log(error);
      if (!(error instanceof HttpError)) {
        error = new HttpError("Error de credenciales o token expirado", 400);
      }
      return next(error);
    }
  },
};

module.exports = alertController;
