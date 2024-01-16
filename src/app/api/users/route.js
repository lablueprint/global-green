import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb';
import User from '../../../../models/user';

export async function POST(request) {
  const {
    firstName, lastName, email, password, userName, rank, badges, courses,
  } = await request.json();
  await connectMongoDB();
  await User.create({
    firstName, lastName, email, password, userName, rank, badges, courses,
  });
  return NextResponse.json({ message: 'User Created' }, { status: 201 });
}

export async function PUT(request) {
  const {
    id, firstName, lastName, email, password, userName, rank, badges, courses,
  } = await request.json();
  await connectMongoDB();
  await User.findByIdAndUpdate(id, {
    firstName, lastName, email, password, userName, rank, badges, courses,
  });
  return NextResponse.json({ message: 'User Updated' }, { status: 200 });
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}

export async function DELETE(request) {
  const id = request.searchParams.get('id');
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: 'User deleted' }, { status: 200 });
}
