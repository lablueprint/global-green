import { NextResponse } from 'next/server';

import Background from '@models/background';
import connectMongoDB from '../../../../../libs/mongodb';

export async function GET() {
  await connectMongoDB();
  const backgrounds = await Background.find();
  return NextResponse.json(backgrounds);
}
