import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import connectMongoDB from '../../../../../../libs/mongodb';
import User from '../../../../../../models/user';

export async function POST(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const {
      userName,
      newPassword,
    } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({
      $or: [{ email: userName }, { userName }],
    });

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }
    // eslint-disable-next-line no-console
    console.log('user exists');

    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
