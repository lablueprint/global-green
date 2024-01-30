import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';

export async function POST(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({ verifyToken: token });

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }
    console.log(user);

    user.verified = true;
    user.verifyToken = undefined;
    await user.save();

    return NextResponse.json({
      message: 'Email verified successfully',
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
