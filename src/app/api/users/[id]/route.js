import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';

export async function PUT(req, { params }) {
  await connectMongoDB();
  const { id } = params;
  const {
    firstName, lastName, email, password,
  } = await req.json();
  await User.findByIdAndUpdate(id, {
    firstName, lastName, email, password,
  });
  return NextResponse.json({ message: 'User updated' }, { status: 200 });
}

export async function GET(req, { params }) {
  await connectMongoDB();
  const { id } = params;
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
}
