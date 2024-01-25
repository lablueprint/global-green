import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';

export async function POST(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const {
      firstName, lastName, userName, email, password,
    } = reqBody;
    // eslint-disable-next-line no-console
    console.log(reqBody);

    // check if user already exists
    const user = await User.findOne({
      $and: [{ email: userName }, { userName }],
    });

    if (user) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    // eslint-disable-next-line no-console
    console.log(savedUser);

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
