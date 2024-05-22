/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../../libs/mongodb';
import User from '../../../../../../models/user';

export async function PATCH(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const {
      userId,
      courseKey,
      currStage,
      complete,
    } = reqBody;

    console.log('backend course progress');

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if the course exists
    const courseIndex = user.courses.findIndex((course) => course.key === courseKey);

    console.log(courseIndex);

    if (courseIndex !== -1) {
      // Update the existing course
      if (currStage !== undefined) user.courses[courseIndex].currStage = currStage;
      if (complete !== undefined) user.courses[courseIndex].complete = complete;
    } else {
      // Add the new course
      user.courses.push({ key: courseKey, currStage, complete });
    }

    // Save the user document
    await user.save();

    console.log('user', user);
    return NextResponse.json({ message: 'backend progress updated successfully', user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
