import EmailVerificationModel from "../models/EmailVerification.js";
import transporter from "../config/emailConfig.js";

const sendEmailVerificationOTP = async (req, user) => {
  // console.log(user);
  // Generate a random 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Save OTP in Database
  await new EmailVerificationModel({ userId: user._id, otp: otp }).save();

  //  OTP Verification Link
  const otpVerificationLink = `${process.env.FRONTEND_HOST}/account/verify-email`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "OTP - Verify your account",
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 20px auto;
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    color: #2c3e50;
                    font-size: 24px;
                    margin: 20px 0;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    margin: 10px 0;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #e74c3c;
                    margin: 20px 0;
                }
                .footer {
                    font-size: 14px;
                    color: #7f8c8d;
                    margin-top: 20px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <p>Dear ${user.username},</p>
                <p>Thank you for signing up with our website. To complete your registration, please verify your email address by entering the following one-time password (OTP):</p>
                <div class="otp">${otp}</div>
                <p>This OTP is valid for 15 minutes. If you didn't request this OTP, please ignore this email.</p>
                <div class="footer">If you have any questions, feel free to contact us.</div>
            </div>
        </body>
        </html>
    `,
  });

  return otp;
};

export default sendEmailVerificationOTP;
