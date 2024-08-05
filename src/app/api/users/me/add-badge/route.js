import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../../libs/mongodb';
import User from '../../../../../../models/user';

export async function PATCH(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const { userId, badge } = reqBody;

    if (!badge) {
      return NextResponse.json({ error: 'Badge is required' }, { status: 400 });
    }

    // if user alr has badge
    const user = await User.findOne({ _id: userId, 'badges.key': badge }).select('-password');
    if (user) {
      // If user already has the badge, return a success response without adding the badge again
      return NextResponse.json({ message: 'Badge already exists', user });
    }

    // Create the new badge object with the badge name and the date
    const badgeObj = {
      date: new Date(),
      key: badge,
    };

    // Update the user with the new badge and increment the points only if the badge is not already present
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'badges.key': { $ne: badge } },
      {
        $addToSet: { badges: badgeObj },
        $inc: { seeds: 20 },
      },
      { new: true },
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Badge added successfully', user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
