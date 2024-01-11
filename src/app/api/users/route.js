import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb';
import User from '../../../../models/user';

export async function POST(req) {
  await connectMongoDB();
  const {
    firstName, lastName, email, password,
  } = await req.json();
  await User.create({
    firstName, lastName, email, password,
  });
  return NextResponse.json({ message: 'User Created' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}

export async function DELETE(req, res) {
  try {
    await connectMongoDB();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) { return res.status(400).json({ message: 'Missing user ID' }); }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) { return res.status(404).json({ message: 'User not found' }); }

    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting user', error: error.message }, { status: 500 });
  }
}
