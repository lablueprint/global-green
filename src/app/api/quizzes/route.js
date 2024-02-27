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

export async function GET() {
  await connectMongoDB();
  try {
    const quizzes = await Quiz.find();
    if (!quizzes) {
      return NextResponse.json({ message: 'Quizzes not found!' });
    }
    return NextResponse.json({ quizzes });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
