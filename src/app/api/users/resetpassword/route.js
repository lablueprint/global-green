import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';

export async function POST(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const {
      token,
      newPassword,
    } = reqBody;

    const user = await User.findOne({ forgetPasswordToken: token });

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.forgetPasswordToken = undefined;

    await user.save();

    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
