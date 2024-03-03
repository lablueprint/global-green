import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';

// the POST method is used to login a user
export async function POST(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const { sessionUser } = reqBody;
    console.log('reqBody', reqBody);
    const user = await User.findOne({
      $or: [{ email: sessionUser.email }, { userName: sessionUser.userName }],
    });

    // eslint-disable-next-line no-console
    console.log('user exists');

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
      .setExpirationTime('1d')
      .sign(encoder.encode(process.env.JWT_SECRET));

    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    });
    console.log('token', token);
    response.cookies.set('token', token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
