import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
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
      badges: user.badges,
      courses: user.courses,
      points: user.points,
    };
    // create token, this is the payload and the secret key. The token is valid for 1 day
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

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
