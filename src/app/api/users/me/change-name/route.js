import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../../libs/mongodb';
import User from '../../../../../../models/user';
import { getDataFromToken } from '../../../../../../helpers/getDataFromToken';

export async function PATCH(request) {
  await connectMongoDB();
  try {
    const userId = await getDataFromToken(request);
    const reqBody = await request.json();
    const { userName } = reqBody;

    if (!userName) {
      return NextResponse.json({ error: 'New name is required' }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(userId, { userName }, { new: true }).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Name updated successfully', user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
