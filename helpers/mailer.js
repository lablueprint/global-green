import bcryptjs from 'bcryptjs';
import { Resend } from 'resend';
import User from '../models/user';
import { Email } from './email';
import { ResetEmail } from './resetemail';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_TOKEN);

export const sendEmail = async ({ email, emailType, user }) => {
  try {
    const userId = user.id;
    // create a hased token
    const vhashedToken = await (await bcryptjs.hash(userId.toString(), 10)).slice(7, 15);
    const fhashedToken = await (await bcryptjs.hash(userId.toString(), 10)).slice(5, 13);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: vhashedToken, verifyTokenExpiry: Date.now() + 3600000 },
      );
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(
        userId,
        { forgetPasswordToken: fhashedToken },
      );
    }

    console.log('sending email');

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'mariopeng@ucla.edu',
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      react: emailType === 'VERIFY' ? (
        <Email
          userName={user.userName}
          firstName={user.firstName}
          lastName={user.lastName}
          verificationToken={vhashedToken}
        />
      ) : (
        <ResetEmail
          userName={user.userName}
          firstName={user.firstName}
          lastName={user.lastName}
          verificationToken={fhashedToken}
        />
      ),
    });
    console.log('email sent');
  } catch (error) {
    throw new Error(error.message);
  }
};
