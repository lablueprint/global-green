import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../../libs/mongodb';
import User from '../../../../../../models/user';

export async function PATCH(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const {
      userId,
      userAccessories,
      userBackgrounds,
      seeds,
    } = reqBody;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        accessories: userAccessories,
        backgrounds: userBackgrounds,
        seeds,
      },
      { new: true },
    ).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
