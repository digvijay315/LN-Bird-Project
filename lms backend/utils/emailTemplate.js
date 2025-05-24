const generateEmailTemplate = (employeeData, trainingDetails) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #7A1CAC;">Training Nomination</h2>
    <p>Dear ${employeeData.employee_name},</p>
    
    <p>You have been nominated for the following training:</p>
    
    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p><strong>Training Name:</strong> ${trainingDetails.training_name}</p>
      <p><strong>Date:</strong> ${new Date(trainingDetails.from_date).toLocaleDateString()} - ${new Date(trainingDetails.to_date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${trainingDetails.from_time} - ${trainingDetails.to_time}</p>
    </div>

    <p>Please confirm your attendance by clicking the link below:</p>
    <a href="${process.env.FRONTEND_URL}/confirm-training/${trainingDetails._id}/${employeeData.employee_id}" 
       style="background: #7A1CAC; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
      Confirm Attendance
    </a>

    <p> Please confirm your attendance by clicking the link below:</p>
    <a href="${process.env.FRONTEND_URL}/confirm-attendance/${trainingDetails._id}/${employeeData.employee_id}">
      Confirm Attendance
    </a>
    
    <p style="margin-top: 20px;">Best regards,<br>Training Team</p>
  </div>
`;

module.exports = {generateEmailTemplate};