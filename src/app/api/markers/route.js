import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb';
import Marker from '../../../../models/marker';

export async function GET() {
  await connectMongoDB();
  const markers = await Marker.find({});
  return NextResponse.json(markers);
}
export async function POST(request) {
  const {
    name, longlat, description, tag, link,
  } = await request.json();
  await connectMongoDB();
  await Marker.create({
    name, longlat, description, tag, link,
  });
  return NextResponse.json({ message: 'Marker Created' }, { status: 201 });
}
