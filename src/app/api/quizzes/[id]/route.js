import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../libs/mongodb';
import Quiz from '../../../../../models/quiz';

export async function GET(_, { params: { id } }) {
  await connectMongoDB();

  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return NextResponse.json({ message: 'Quiz not found!' });
    }
    return NextResponse.json({ quiz });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PATCH(request, { params: { id } }) {
  await connectMongoDB();

  try {
    const updates = await request.json();
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedQuiz) {
      return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({ quiz: updatedQuiz });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating quiz', error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params: { id } }) {
  await connectMongoDB();

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Quiz deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting quiz', error: error.message }, { status: 500 });
  }
}
