import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const emailadd = async (req, res) => {
  const { email, companyMail } = req.body;
  if (!email || !companyMail) {
    return res.status(400).send({ success: false, message: "Email and companyMail are required." });
  }

  const token = jwt.sign({ email, companyMail }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const inviteLink = `http://localhost:5173/employeedata?companyMail=${encodeURIComponent(companyMail)}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "dhanushk.22cse@kongu.edu",
      pass: "nmrevqnijjahzewj",
    },
  });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "You're Invited!",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <h2 style="color: #333;">Welcome to Our Company!</h2>
              <p>We're excited to have you join our team. Please click the button below to provide your details and complete your registration process.</p>
              <a href="${inviteLink}" style="display: inline-block; padding: 12px 24px; margin: 20px auto; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Join Our Company</a>
              <p style="color: #666;">If you have any questions, feel free to reply to this email.</p>
              <p>Best Regards,<br>Your Company Team</p>
            </div>
          </body>
        </html>
      `,
    };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).send({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ success: false, error: error.message });
  }
};
