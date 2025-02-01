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

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, company, quote, image, createdAt, isApproved, position } =
      body;

    if (!name || !quote || !image || !company) {
      return NextResponse.json(
        { message: 'Name, quote, company and image are required' },
        { status: 400 }
      );
    }

    const newTestimonial = await Testimonial.create({
      name,
      company,
      quote,
      image,
      isApproved,
      createdAt,
      position,
    });

    return NextResponse.json(
      { success: true, data: newTestimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in testimonial submission:', error);
    return NextResponse.json(
      { message: 'Error submitting testimonial' },
      { status: 500 }
    );
  }
}
