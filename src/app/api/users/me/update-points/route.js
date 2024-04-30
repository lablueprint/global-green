import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../../libs/mongodb';
import User from '../../../../../../models/user';

export async function PATCH(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const { userId, points } = reqBody;
    console.log('reqbody', reqBody);

    if (!points) {
      return NextResponse.json({ error: 'Points must be a number and is required' }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(userId, { points }, { new: true }).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Points updated successfully', user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
