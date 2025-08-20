import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,    
      port: process.env.SMTP_PORT,     
      secure: process.env.SMTP_PORT == 465, 
      auth: {
        user: process.env.SMTP_USER,   
        pass: process.env.SMTP_PASS,   
      },
    });

    // Send mail
    const info = await transporter.sendMail({
      from: `"Recursion Events" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
