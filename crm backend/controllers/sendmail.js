const nodemailer = require('nodemailer');

const send_mail = async (req, res) => {
    try {
        const { emails, message } = req.body;

        if (!emails ) {
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
            subject: 'Test Email from Nodemailer',
            text: JSON.stringify(message)
        };

        // Send emails
        if (Array.isArray(emails) && emails.length>0) {

            for (const recipient of emails) {
                await transporter.sendMail({ ...mailOptions, to: recipient });
            }
        } else {
            await transporter.sendMail({ ...mailOptions, to: emails });
        }

        res.status(200).send('Emails sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email and missing email');
    }
};

module.exports = send_mail;
