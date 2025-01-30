/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Skill from '@/lib/models/skill';

export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find().sort({ createdAt: -1 });
    return NextResponse.json({
      skills,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}
