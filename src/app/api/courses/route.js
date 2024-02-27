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

export async function GET() {
  await connectMongoDB();
  try {
    const courses = await Course.find();
    if (!courses) {
      return NextResponse.json({ message: 'Courses not found!' });
    }
    return NextResponse.json({ courses });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
