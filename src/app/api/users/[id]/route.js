import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';

export async function GET(_, { params: { id } }) {
  await connectMongoDB();

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found!' });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PATCH(request, { params: { id } }) {
  await connectMongoDB();

  try {
    const updates = await request.json();
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user', error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params: { id } }) {
  await connectMongoDB();

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting user', error: error.message }, { status: 500 });
  }
}
