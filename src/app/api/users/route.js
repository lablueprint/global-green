import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb';
import User from '../../../../models/user';

export async function POST(request) {
  const {
    firstName,
    lastName,
    email,
    password,
    userName,
    points,
    badges,
    courses,
  } = await request.json();
  await connectMongoDB();
  await User.create({
    firstName,
    lastName,
    email,
    password,
    userName,
    points,
    badges,
    courses,
  });
  return NextResponse.json({ message: 'User Created' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  try {
    const users = await User.find();
    if (!users) {
      return NextResponse.json({ message: 'Users not found!' });
    }
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
