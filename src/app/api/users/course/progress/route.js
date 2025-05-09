import { NextResponse } from 'next/server';
import connectMongoDB from '@libs/mongodb';
import User from '@models/user';

export async function POST(request) {
  const {
    id
  } = await request.json();
  await connectMongoDB();
  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({ message: 'User not found!' });
  }
  const courseProgress = user.courses;
  return NextResponse.json({ courseProgress });
}