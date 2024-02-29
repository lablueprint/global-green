import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb';
import Quiz from '../../../../models/quiz';

export async function POST(request) {
  const {
    key, label, questions,
  } = await request.json();
  await connectMongoDB();
  await Quiz.create({
    key, label, questions,
  });
  return NextResponse.json({ message: 'Quiz Created' }, { status: 201 });
}

export async function GET(request) {
  await connectMongoDB();
  const key = new URL(request.url).searchParams.get('key');
  try {
    const res = key ? await Quiz.findOne({ key }) : await Quiz.find();
    if (!res) {
      return NextResponse.json({ message: 'Quiz not found!' });
    }
    return NextResponse.json({ res });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
