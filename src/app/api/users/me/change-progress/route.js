/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../../libs/mongodb';
import User from '../../../../../../models/user';

export async function PATCH(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const { userId, courseKey, currStage, complete } = reqBody;

    console.log('backend course progress update req:', {
      userId,
      courseKey,
      currStage,
      complete,
    });

    // using findByIdAndUpdate with atomic operators instead of direct modification
    let updateQuery = {};

    // check if course exists
    const userCheck = await User.findById(userId);
    if (!userCheck) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const courseExists = userCheck.courses.some(
      (course) => course.key === courseKey
    );

    if (courseExists) {
      // Update the existing course using positional $ operator
      if (currStage !== undefined)
        updateQuery['courses.$[elem].currStage'] = currStage; // mongodb direct mod
      // user.courses[courseIndex].currStage = currStage;   // document sth sth
      if (complete !== undefined)
        updateQuery['courses.$[elem].complete'] = complete;
      // user.courses[courseIndex].complete = complete;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateQuery },
        {
          new: true,
          arrayFilters: [{ 'elem.key': courseKey }],
        }
      );

      console.log('user update successfully:', updatedUser);
      return NextResponse.json({
        message: 'backend progress updated successfully',
        user: updatedUser,
      });
    } else {
      // Add the new course using $push
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: { key: courseKey, currStage, complete },
          },
        },
        { new: true }
      );

      console.log('new course added successfully:', updatedUser);
      return NextResponse.json({
        message: 'backend progress updated successfully',
        user: updatedUser,
      });
    }
  } catch (error) {
    console.error('error updating course progress:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
