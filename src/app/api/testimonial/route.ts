/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Testimonial from '@/lib/models/testimonial';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json({
      testimonials,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// API route to add a testimonial (same file)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate input
    if (!body.name || !body.message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    const newTestimonial = new Testimonial({
      name: body.name,
      message: body.message,
      company: body.company || '',
    });

    const savedTestimonial = await newTestimonial.save();

    return NextResponse.json(savedTestimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add testimonial' },
      { status: 500 }
    );
  }
}
