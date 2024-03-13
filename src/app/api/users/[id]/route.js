import { NextResponse } from 'next/server';
import User from '@models/user';
import connectMongoDB from '../../../../../libs/mongodb';

export async function POST(request) {
  const {
    id,
  } = await request.json();
  await connectMongoDB();
  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({ message: 'User not found!' });
  }
  return NextResponse.json({ user });
}
