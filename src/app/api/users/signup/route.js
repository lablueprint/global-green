import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import fetch from 'node-fetch';
import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/user';
import { sendEmail } from '../../../../../helpers/mailer';

// Function to verify the captcha
async function verifyCaptcha(token) {
  // Ensure you have this in your environment variables
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
    method: 'POST',
  });
  const data = await response.json();
  return data.success; // true if verification is successful, false otherwise
}

export async function POST(request) {
  await connectMongoDB();
  try {
    const reqBody = await request.json();
    const {
      firstName, lastName, userName, email, password, captchaToken,
    } = reqBody;
    // eslint-disable-next-line no-console
    console.log(reqBody);

    // Verify CAPTCHA
    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      return NextResponse.json({ error: 'CAPTCHA validation failed. Please try again.' }, { status: 400 });
    }

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
      verified: false,
      verifyExpires: new Date(Date.now() + 3600000),
    });
    const savedUser = await newUser.save();

    // Generate a verification token
    const hashedToken = (await bcryptjs.hash(savedUser.id.toString(), 10)).slice(9, 15);
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
