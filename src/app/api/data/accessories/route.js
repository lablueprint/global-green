import { NextResponse } from 'next/server';
import Accessory from '@models/accessory';
import connectMongoDB from '../../../../../libs/mongodb';

export async function GET() {
  await connectMongoDB();
  const accessories = await Accessory.find();
  return NextResponse.json(accessories);
}
