import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../libs/mongodb';
import Lesson from '../../../../../models/lesson';

export async function GET(_, { params: { id } }) {
  await connectMongoDB();

  try {
    const lessons = await Lesson.findById(id);
    if (!lessons) {
      return NextResponse.json({ message: 'Lesson not found!' });
    }
    return NextResponse.json({ lessons });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PATCH(request, { params: { id } }) {
  await connectMongoDB();

  try {
    const updates = await request.json();
    const updatedLesson = await Lesson.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedLesson) {
      return NextResponse.json({ message: 'Lesson not found' }, { status: 404 });
    }

    return NextResponse.json({ lesson: updatedLesson });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating lesson', error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params: { id } }) {
  await connectMongoDB();

  try {
    const deletedLesson = await Lesson.findByIdAndDelete(id);

    if (!deletedLesson) {
      return NextResponse.json({ message: 'Lesson not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Lesson deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting lesson', error: error.message }, { status: 500 });
  }
}
