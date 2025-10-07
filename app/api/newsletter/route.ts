import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory storage for free tier (in production, you'd use a database)
const subscribers = new Set<string>();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if already subscribed (simple duplicate check)
    const emailLower = email.toLowerCase();
    if (subscribers.has(emailLower)) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    // Send notification email to you about new subscriber
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'my.subs@mac.com';
    
    await resend.emails.send({
      from: 'Seconds Newsletter <onboarding@resend.dev>', // Use Resend's default domain
      to: notificationEmail,
      subject: 'New Newsletter Subscriber!',
      html: `
        <h2>New subscriber to Seconds Newsletter!</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <hr />
        <p>Add this email to your mailing list to send updates about films and mints.</p>
      `,
    });

    // Store email (in memory for now)
    subscribers.add(emailLower);

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Newsletter signup error:', error);

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve subscribers (protect this in production!)
export async function GET() {
  return NextResponse.json({
    total: subscribers.size,
    subscribers: Array.from(subscribers),
  });
}

