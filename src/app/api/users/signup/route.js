import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';
import { sendEmail } from '../../../../../helpers/mailer';

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
      $or: [{ email }, { userName }],
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
      badges: [],
      courses: [],
      rank: 0,
      verified: false,
    });

    const savedUser = await newUser.save();

    const hashedToken = (await bcryptjs.hash(savedUser.id.toString(), 10)).slice(7, 15);
    savedUser.verifyToken = hashedToken;

    await savedUser.save();

    // send email to user to verify email
    await sendEmail({ email, emailType: 'VERIFY', user: savedUser });

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
