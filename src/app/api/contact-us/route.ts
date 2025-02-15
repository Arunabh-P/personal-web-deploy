/* eslint-disable func-style */
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ContactForm from '@/lib/models/contact-form';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, phone, message } = body;
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    const contact = await ContactForm.create({
      name,
      email,
      phone,
      message,
    });
    return NextResponse.json(
      { message: 'Contact saved successfully', contact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { error: 'Failed to save contact information' },
      { status: 500 }
    );
  }
}
