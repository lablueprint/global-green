import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../libs/mongodb';
import Course from '../../../../../models/course';

export async function GET(_, { params: { id } }) {
  await connectMongoDB();

  try {
    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json({ message: 'Course not found!' });
    }
    return NextResponse.json({ course });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PATCH(request, { params: { id } }) {
  await connectMongoDB();

  try {
    const updates = await request.json();
    const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedCourse) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ course: updatedCourse });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating course', error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params: { id } }) {
  await connectMongoDB();

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Course deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting course', error: error.message }, { status: 500 });
  }
}
