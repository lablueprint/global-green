import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';
import { sendEmail } from '../../../../../helpers/mailer';

export async function POST(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User
      .findOne(
        { email },
      );

    console.log(user);
    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }

    const hashedToken = (await bcryptjs.hash(user.id.toString(), 10)).slice(5, 13);
    user.set({
      forgetPasswordToken: hashedToken,
      forgetPasswordExpires: new Date(Date.now() + 300000),
    });
    console.log(hashedToken);
    console.log('checking that the user is not null', user);
    await user.save();

    console.log(user);

    await sendEmail({
      email, emailType: 'RESET', user,
    });

    return NextResponse.json({
      message: 'Forget Password email sent to user',
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
