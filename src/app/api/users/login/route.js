import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { SignJWT } from 'jose';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';

// the POST method is used to login a user
export async function POST(request) {
  await connectMongoDB();

  try {
    const reqBody = await request.json();
    const { userName, password } = reqBody;
    // eslint-disable-next-line no-console
    console.log(reqBody);
    const user = await User.findOne({
      $or: [{ email: userName }, { userName }],
    });

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }
    // eslint-disable-next-line no-console
    console.log('user exists');
    const validPassword = await bcryptjs.compare(password, user.password);
    // const validPassword = password === user.password;
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }
    // eslint-disable-next-line no-console
    console.log(user);
    const tokenData = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      rank: user.rank,
      badges: user.badges,
      courses: user.courses,
      verified: user.verified,
      verifyExpires: user.verifyExpires,
    };
    // create token with jose
    const encoder = new TextEncoder();
    // dynamically set expiration time based on whether the user has verified their email
    const token = await new SignJWT(tokenData)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(user.verified ? '1d' : '5m')
      .sign(encoder.encode(process.env.JWT_SECRET));

    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    });
    response.cookies.set('token', token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
