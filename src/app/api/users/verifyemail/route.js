import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';

export async function POST(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({ verifyToken: token });

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    user.verified = true;
    user.verifyToken = undefined;
    user.verifyExpires = undefined;
    await user.save();

    // Assuming user verification means they are logged in, generate a new JWT token
    const tokenData = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      rank: user.rank,
      badges: user.badges,
      courses: user.courses,
      verified: user.verified, // Now true
    };
    const encoder = new TextEncoder();
    const newToken = await new SignJWT(tokenData)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime('1d') // Sets an expiration time
      .sign(encoder.encode(process.env.JWT_SECRET));

    const response = NextResponse.json({
      message: 'User verified',
      success: true,
    });
    response.cookies.set('token', newToken, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
