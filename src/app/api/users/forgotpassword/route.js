import { NextResponse } from 'next/server';
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

    // const tokenData = {
    //   id: user.id,
    //   email: user.email,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   forgetPasswordExpires: new Date(Date.now() + 300000),
    // };
    // const encoder = new TextEncoder();
    // const token = await new SignJWT(tokenData)
    //   .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    //   .setExpirationTime('10m') // Sets an expiration time
    //   .sign(encoder.encode(process.env.JWT_SECRET));

    // user.forgetPasswordToken = token;
    // user.forgetPasswordExpires = tokenData.forgetPasswordExpires;
    // await user.save();

    // console.log(user);

    await sendEmail({ email, emailType: 'RESET', user });
    return NextResponse.json({ message: 'Forgot Password email sent to user' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
