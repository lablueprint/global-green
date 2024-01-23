import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';

const getDataFromToken = (request) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

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
