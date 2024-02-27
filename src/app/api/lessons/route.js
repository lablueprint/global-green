import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb';
import Lesson from '../../../../models/lesson';

export async function POST(request) {
  const {
    key, label, parts,
  } = await request.json();
  await connectMongoDB();
  await Lesson.create({
    key, label, parts,
  });
  return NextResponse.json({ message: 'Lesson Created' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  try {
    const lessons = await Lesson.find();
    if (!lessons) {
      return NextResponse.json({ message: 'Lesson not found!' });
    }
    return NextResponse.json({ lessons });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
