/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SoftwareSkill from '@/lib/models/software-skill';

export async function GET() {
  try {
    await dbConnect();
    const softwareSkills = await SoftwareSkill.find().sort({ createdAt: -1 });
    return NextResponse.json({
      softwareSkills,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}
