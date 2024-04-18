import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../../libs/mongodb';
import User from '../../../../../../models/user';

export async function PATCH(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const {
      userId,
      profilePic,
    } = reqBody;

    if (!profilePic) {
      return NextResponse.json({ error: 'New picture URL is required' }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(userId, { profilePic }, { new: true }).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Picture updated successfully', user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
