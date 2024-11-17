import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); 

export const leavemailsend = async (req, res) => {
  const { email, firstName, leaveType, startDate, endDate, status } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
      user: process.env.EMAIL_USER,  
      pass: process.env.EMAIL_PASS,  
    },
  });

  
  const subject = status === 'accept' ? `Leave Approved: ${leaveType}` : `Leave Rejected: ${leaveType}`;
  const htmlContent = status === 'accept'
    ? `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #28a745;">Leave Approved</h2>
          <p>Dear ${firstName},</p>
          <p>Your leave request for <strong>${leaveType}</strong> from <strong>${startDate}</strong> to <strong>${endDate}</strong> has been approved.</p>
          <p>Thank you for your hard work!</p>
        </body>
      </html>`
    : `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #dc3545;">Leave Rejected</h2>
          <p>Dear ${firstName},</p>
          <p>We regret to inform you that your leave request for <strong>${leaveType}</strong> from <strong>${startDate}</strong> to <strong>${endDate}</strong> has been rejected.</p>
          <p>For further inquiries, please contact HR.</p>
          <p>Regards,<br>Ajay Info Tech Company Name</p>
        </body>
      </html>`;


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: htmlContent,  
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).send('Leave status updated and email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
};
