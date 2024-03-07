import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb';
import Course from '../../../../models/course';

export async function POST(request) {
  const {
    key, label, requirements, stages,
  } = await request.json();
  await connectMongoDB();
  await Course.create({
    key, label, requirements, stages,
  });
  return NextResponse.json({ message: 'Course Created' }, { status: 201 });
}

export async function GET(request) {
  await connectMongoDB();
  const key = new URL(request.url).searchParams.get('key');
  try {
    const res = key ? await Course.findOne({ key }) : await Course.find();
    if (!res) {
      return NextResponse.json({ message: 'Course not found!' });
    }
    return NextResponse.json({ res });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
