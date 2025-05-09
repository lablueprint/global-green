import { NextResponse } from 'next/server';
import connectMongoDB from '@libs/mongodb';
import User from '@models/user';

export async function PATCH(request) {
  const {
    id, courseKey
  } = await request.json();
  await connectMongoDB();
  console.log(courseKey);

  const courseInfo = {
    key: courseKey,
    currStage: 0,
    complete: false
  };

  const user = await User.findByIdAndUpdate(
    id,
    {
        $push: { courses: courseInfo }
    }
  )

  if (!user) {
    return NextResponse.json({ message: 'User not found!' });
  }
  return NextResponse.json({ message: 'Course started!' });
}