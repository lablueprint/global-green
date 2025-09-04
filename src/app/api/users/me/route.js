import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';

export async function POST(request) {
  const { id } = await request.json();
  await connectMongoDB();
  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({ message: 'User not found!' });
  }
  return NextResponse.json({ user });
}

// for temporary email bypass
export async function PATCH(request) {
  try {
    const { userId, update } = await request.json();
    await connectMongoDB();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          verified: true,
          verifyExpires: null,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'User verified successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('MongoDB update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
