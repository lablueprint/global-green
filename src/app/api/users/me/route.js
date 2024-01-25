import { NextResponse } from 'next/server';
import { getDataFromToken } from '../../../../../helpers/getDataFromToken';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';

export async function GET(request) {
  await connectMongoDB();
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select('-password');
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
