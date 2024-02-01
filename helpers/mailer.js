import bcryptjs from 'bcryptjs';
import { Resend } from 'resend';
import User from '../models/user';
import { Email } from './email';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_TOKEN);

export const sendEmail = async ({ email, emailType, user }) => {
  try {
    const userId = user.id;
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
    console.log('sending email');
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'mariopeng@ucla.edu',
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      react: <Email
        userName={user.userName}
        firstName={user.firstName}
        lastName={user.lastName}
        verificationToken={hashedToken}
      />,
    });
    console.log('email sent');
  } catch (error) {
    throw new Error(error.message);
  }
};
