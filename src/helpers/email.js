const nodemailer = require("nodemailer")
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PW_EMAIL, // generated ethereal password
  },
});
exports.sendEmail = (email, title, text) => {
  return new Promise((resolve, reject) => {
    // send mail with defined transport object
    const message = {
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: "Welcome To My Message", // Subject line
      // text: "Hello world?", // plain text body
      html: `<!DOCTYPE html>
            <html>
            <head>
            <style>
            * {
              box-sizing: border-box;
            }
            
            body {
              font-family: Arial;
              padding: 10px;
              background: #f1f1f1;
            }
            .header {
              padding: 30px;
              text-align: center;
              background: white;
            }
            
            .header h1 {
              font-size: 50px;
            }
            .topnav {
              overflow: hidden;
              background-color: #333;
            }
            .topnav a {
              float: left;
              display: block;
              color: #f2f2f2;
              text-align: center;
              padding: 14px 16px;
              text-decoration: none;
            }
            .leftcolumn {   
              float: left;
              width: 100%;
            }
            .fakeimg {
              background-color: #aaa;
              width: 100%;
              padding: 20px;
            }
            .card {
              background-color: white;
              padding: 20px;
              margin-top: 20px;
            }
            .row:after {
              content: "";
              display: table;
              clear: both;
            }
            .footer {
              padding: 20px;
              text-align: center;
              background: #ddd;
              margin-top: 20px;
            }
            </style>
            </head>
            <body>
            
            <div class="header">
              <h1>My Website</h1>
              <p>Resize the browser window to see the effect.</p>
            </div>
            
            <div class="topnav">
              <a href="#">Link</a>
              <a href="#">Link</a>
              <a href="#">Link</a>
              <a href="#" style="float:right">Link</a>
            </div>
            
            <div class="row">
              <div class="leftcolumn">
                <div class="card">
                  <h2>${title}</h2>
                  <h5>Title description, Dec 7, 2017</h5>
                  <div class="fakeimg" style="height:200px;">Image</div>
                  <p>Some text..</p>
                  <p>${text}.</p>
                </div>
              </div>
            </div>
            
            <div class="footer">
              <h2>Footer</h2>
            </div>
            
            </body>
            </html>
            `, // html body
    }
    transporter.sendMail(message, (error, info) => {
      if (error) {
        // console.log('Error occurred');
        // console.log(error.message);
        // return process.exit(1);
        reject(error)
      } else {
        resolve(info)
      }
    });
  })
}