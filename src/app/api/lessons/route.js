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

export async function GET(request) {
  await connectMongoDB();
  const key = new URL(request.url).searchParams.get('key');
  try {
    const res = key ? await Lesson.findOne({ key }) : await Lesson.find();
    if (!res) {
      return NextResponse.json({ message: 'Lesson not found!' });
    }
    return NextResponse.json({ res });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
