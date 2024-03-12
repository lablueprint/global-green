import { SignJWT } from 'jose';
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

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }

    if (user.verified) {
      return NextResponse.json({ error: 'User already verified' }, { status: 400 });
    }
    console.log(user);

    const tokenData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      verifyExpires: new Date(Date.now() + 300000),
    };
    const encoder = new TextEncoder();
    const token = await new SignJWT(tokenData)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime('5m') // Sets an expiration time
      .sign(encoder.encode(process.env.JWT_SECRET));

    user.verifyToken = token;
    user.verifyExpires = tokenData.verifyExpires;
    await user.save();

    await sendEmail({ email, emailType: 'VERIFY', user });

    return NextResponse.json({ message: 'Verification email sent to user' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
