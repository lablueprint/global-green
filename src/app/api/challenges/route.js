import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb';
import Challenge from '../../../../models/challenges';

export async function POST(request) {
  const {
    firstName, lastName, email, password, ChallengeName, rank, badges, courses,
  } = await request.json();
  await connectMongoDB();
  await Challenge.create({
    firstName, lastName, email, password, ChallengeName, rank, badges, courses,
  });
  return NextResponse.json({ message: 'Challenge Created' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  try {
    const Challenges = await Challenge.find();
    if (!Challenges) {
      return NextResponse.json({ message: 'Challenge not found!' });
    }
    return NextResponse.json({ Challenges });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
