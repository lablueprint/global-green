import { NextResponse } from 'next/server';
import connectMongoDB from '@libs/mongodb';
import User from '@models/user';

export async function POST(request) {
  const {
    id, garden,
  } = await request.json();
  await connectMongoDB();
  const user = await User.findByIdAndUpdate(id, { garden });
  if (!user) {
    return NextResponse.json({ message: 'User not found!' });
  }
  return NextResponse.json({ user });
}
