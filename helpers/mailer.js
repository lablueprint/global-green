import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '../models/user';

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create a hased token
    const hashedToken = await (await bcryptjs.hash(userId.toString(), 10)).slice(7, 15);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 },
      );
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(
        userId,
        { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 },
      );
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'e8e4915c5d18b3',
        pass: 'e7870bf611ac3a',
        // TODO: add these credentials to .env file
      },
    });

    const mailOptions = {
      from: 'global@green.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Your verification token is <strong>${hashedToken}</strong></p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
