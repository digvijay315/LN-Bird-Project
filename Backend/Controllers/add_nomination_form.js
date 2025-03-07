const nodemailer = require('nodemailer');
const Employee = require('../Modal/employee_register');
const Nomination = require('../Modal/add_nomination');
const { validationResult } = require('express-validator');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
});

const generateEmailTemplate = require('../utils/emailTemplate');

const nominationController = {
    sendNominationEmails: async (req, res) => {
      try {
        console.log('Received request:', {
          body: req.body,
          headers: req.headers
        });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const { employeeIds, trainingDetails } = req.body;
        const employees = await Employee.find({ employee_id: { $in: employeeIds } });
  
        if (!employees.length) {
          return res.status(404).json({ message: 'No employees found' });
        }
  
        const emailResults = await Promise.allSettled(
          employees.map(async (employee) => {
            const emailContent = generateEmailTemplate(employee, trainingDetails);
            
            await transporter.sendMail({
              from: process.env.SMTP_FROM,
              to: employee.employee_email,
              subject: `Training Nomination: ${trainingDetails.training_name}`,
              html: emailContent
            });
  
            await Nomination.findOneAndUpdate(
              { 
                employee_id: employee.employee_id,
                training_id: trainingDetails._id 
              },
              { 
                $set: { 
                  email_sent: true,
                  email_sent_date: new Date()
                }
              },
              { upsert: true }
            );
  
            return {
              employee_id: employee.employee_id,
              status: 'sent'
            };
          })
        );
  
        const results = {
          success: emailResults.filter(r => r.status === 'fulfilled').map(r => r.value),
          failed: emailResults.filter(r => r.status === 'rejected').map(r => ({
            employee_id: r.reason.employee_id,
            error: r.reason.message
          }))
        };

        console.log('Email results:', emailResults);
  
        res.json({
          message: 'Email sending completed',
          results
        });
  
      } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
          message: 'Failed to send emails',
          error: error.message
        });
      }
    },
  
    confirmAttendance: async (req, res) => {
      try {
        const { trainingId, employeeId } = req.params;
  
        await Nomination.findOneAndUpdate(
          { 
            employee_id: employeeId,
            training_id: trainingId 
          },
          { 
            $set: { 
              attendance_confirmed: true,
              confirmation_date: new Date()
            }
          }
        );
  
        res.json({ message: 'Training attendance confirmed' });
      } catch (error) {
        res.status(500).json({
          message: 'Failed to confirm attendance',
          error: error.message
        });
      }
    }
  };
  
  module.exports = nominationController;