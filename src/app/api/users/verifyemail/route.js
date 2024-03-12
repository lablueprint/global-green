import { NextResponse } from 'next/server';
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
    const response = NextResponse.json({
      message: 'User verified',
      success: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
