import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Add contact to Resend audience
    // You'll need to create an audience in Resend dashboard first
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!audienceId) {
      return NextResponse.json(
        { error: 'Audience not configured' },
        { status: 500 }
      );
    }

    await resend.contacts.create({
      email,
      audienceId,
    });

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Newsletter signup error:', error);
    
    // Handle duplicate email
    if (error?.message?.includes('already exists')) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

