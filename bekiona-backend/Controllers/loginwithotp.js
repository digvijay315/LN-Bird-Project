const nodemailer = require('nodemailer');

const cloudinary=require('cloudinary').v2
const fs=require('fs')
const path=require('path')



let otpStore = {}; // Store OTPs temporarily

const send_mailotp = async (req, res) => {
    try {
        const { email } = req.body;
                const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
                otpStore[email] = otp;

        if (!email ) {
            return res.status(400).send('No recipients provided.');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'digvijaykumar.315@gmail.com',
                pass: 'cuay fuho ucki htpk'
            }
        });

        const mailOptions = {
            from: 'digvijaykumar.315@gmail.com',
            // to:email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        };

       
            await transporter.sendMail({ ...mailOptions, to: email });
        

        res.status(200).send('Otp sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email and missing email');
    }
};

const verifyotpandlogin=async(req,res)=>
{
    try {
        const { email, otp } = req.body;

            if (otpStore[email] && otpStore[email] == otp) {
                delete otpStore[email]; // Remove OTP after verification
                res.json({ success: true, message: "OTP verified successfully",user:email });
            } else {
                res.status(400).json({ success: false, message: "Invalid OTP" });
            }
                    
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {send_mailotp,verifyotpandlogin};
