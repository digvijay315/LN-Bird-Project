
const nodemailer = require('nodemailer');

const send_mail=async(req,res)=>
{
    try {
        const { emails, message } = req.body;
        const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'digvijaykumar.315@gmail.com',
                    pass: 'cuay fuho ucki htpk' 
                  }
                });
                const mailOptions = {
                          from: 'digvijaykumar.315@gmail.com',
                          to: emails,
                          subject: 'Test Email from Nodemailer',
                          text: message
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                                  if (error) {
                                    return res.status(500).send(error.toString());
                                  }
                                  res.status(200).send('Email sent: ' + info.response);
                                });
                              
    } catch (error) {
        console.log(error);
        
    }
}
module.exports=send_mail;