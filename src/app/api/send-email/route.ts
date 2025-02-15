/* eslint-disable func-style */
import { NextResponse } from 'next/server';
import { sendMail } from '@/utils/mail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await sendMail(body);

    return NextResponse.json(
      { message: 'Email sent successfully', result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
