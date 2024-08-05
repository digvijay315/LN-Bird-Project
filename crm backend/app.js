
const express=require('express')
const cors=require('cors');
const path = require('path');
const connect = require('./connectdb');
const bodyParser = require('body-parser');
require('dotenv').config();
const nodemailer = require('nodemailer');
const app=express();

app.use(bodyParser.json())
app.use(express.json())
app.use('/images', express.static('images'));
app.use(cors())
connect();

app.use('/',require('./routes/admin'));

// app.post('/send-email', (req, res) => {
//     const { emails, message } = req.body; // Expecting `emails` to be an array
  
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'digvijaykumar.315@gmail.com',
//         pass: 'cuay fuho ucki htpk'
//       }
//     });
  
//     const mailOptions = {
//       from: 'digvijaykumar.315@gmail.com',
//       to: emails.join(', '), // Convert the array to a comma-separated string
//       subject: 'Test Email from Nodemailer',
//       text: message
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).send(error.toString());
//       }
//       res.send('Email sent: ' + info.response);
//     });
//   });


app.listen(process.env.PORT,()=>
{
    console.log(`server is running on port:${process.env.PORT}`);
})