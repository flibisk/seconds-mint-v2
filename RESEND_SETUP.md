# Resend Newsletter Setup Guide (Free Tier)

## 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## 2. Get Your API Key

1. Go to [API Keys](https://resend.com/api-keys) in your Resend dashboard
2. Click "Create API Key"
3. Give it a name (e.g., "Seconds Newsletter")
4. Copy the API key

## 3. Add Environment Variables

Add these to your Vercel environment variables:

```env
RESEND_API_KEY=re_your_actual_api_key_here
NOTIFICATION_EMAIL=your.email@example.com
```

## 4. Deploy to Vercel

In your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add both variables:
   - `RESEND_API_KEY` (keep this secret!)
   - `NOTIFICATION_EMAIL` (optional - defaults to my.subs@mac.com)

## 5. Test the Newsletter Signup

1. Go to your website
2. Scroll to the "Stay Updated" section
3. Enter an email and click Subscribe
4. **You'll receive an email notification** with the subscriber's email address

## How It Works (Free Tier)

Since you're on Resend's free tier without Audiences:
- When someone subscribes, you receive an **instant email notification** with their email address
- Emails are stored temporarily (in-memory while the server is running)
- You can view all subscribers by visiting: `https://your-site.com/api/newsletter`

## Features

- ✅ Email validation
- ✅ Duplicate email detection
- ✅ Instant email notifications to you
- ✅ Success/error messages
- ✅ Mobile responsive design
- ✅ Smooth animations
- ✅ Disabled state after successful signup

## Viewing Subscribers

Visit `https://mint.secondsfilm.com/api/newsletter` in your browser to see:
- Total number of subscribers
- List of all email addresses

**Note:** This is temporary storage. For permanent storage, consider adding a database later.

## Sending Updates to Subscribers

To email your subscribers about new films/mints:

1. Collect emails from the API endpoint or your notification emails
2. Use Resend dashboard to send emails:
   - Go to [Emails](https://resend.com/emails)
   - Click "Send Email"
   - Add your subscriber emails to BCC
   - Compose your update
   - Send!

## Free Tier Limits

Resend free tier includes:
- 3,000 emails per month
- 100 emails per day
- Perfect for building your initial audience

Need more? Upgrade to their paid plan when you grow!

