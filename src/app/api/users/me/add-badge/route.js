import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../../libs/mongodb';
import User from '../../../../../../models/user';

export async function PATCH(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const { userId, badge, seeds } = reqBody;

    if (!badge) {
      return NextResponse.json({ error: 'Badge is required' }, { status: 400 });
    }

    // Create the new badge object with the badge name and the date
    const badgeObj = {
      date: new Date(),
      key: badge,
    };

    // Update the user with the new badge and increment the points only if the badge is not already present
    const user = await User.findOneAndUpdate(
      { _id: userId, 'badges.key': { $ne: badge } },
      {
        $addToSet: { badges: badgeObj },
        $inc: { seeds },
      },
      { new: true },
    ).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found or badge already exists' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Badge added successfully', user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
