/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../libs/mongodb';
import Challenge from '../../../../../models/challenges';

export async function GET(request, { params: { id } }) {
  await connectMongoDB();

  try {
    const challenges = await Challenge.findById(id);
    if (!challenges) {
      return NextResponse.json({ message: 'Challenge not found!' });
    }
    return NextResponse.json({ challenges });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PATCH(request, { params: { id } }) {
  await connectMongoDB();

  try {
    const updates = await request.json();
    const updatedChallenge = await Challenge.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedChallenge) {
      return NextResponse.json({ message: 'Challenge not found' }, { status: 404 });
    }

    return NextResponse.json({ challenge: updatedChallenge });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating challenge', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params: { id } }) {
  await connectMongoDB();

  try {
    const deletedChallenge = await Challenge.findByIdAndDelete(id);

    if (!deletedChallenge) {
      return NextResponse.json({ message: 'Challenge not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Challenge deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting challenge', error: error.message }, { status: 500 });
  }
}
