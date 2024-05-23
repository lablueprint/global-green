import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../../libs/mongodb';
import User from '../../../../../../models/user';

export async function PATCH(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const {
      userId,
      badge,
    } = reqBody;

    if (!badge) {
      return NextResponse.json({ error: 'Badge is required' }, { status: 400 });
    }

    // update the new badge and +20 points to the user

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { badges: badge },
        $inc: { seeds: 20 },
      },
      { new: true },
    ).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Badge added successfully', user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
