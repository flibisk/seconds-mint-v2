# Resend Newsletter Setup Guide

## 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## 2. Get Your API Key

1. Go to [API Keys](https://resend.com/api-keys) in your Resend dashboard
2. Click "Create API Key"
3. Give it a name (e.g., "Seconds Newsletter")
4. Copy the API key

## 3. Create an Audience

1. Go to [Audiences](https://resend.com/audiences) in your Resend dashboard
2. Click "Create Audience"
3. Name it "Seconds Newsletter" or similar
4. Copy the Audience ID (it will look like: `aud_xxxxxxxxxxxxx`)

## 4. Add Environment Variables

Add these to your `.env.local` file (or Vercel environment variables):

```env
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_AUDIENCE_ID=aud_your_audience_id_here
```

## 5. Deploy to Vercel

In your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add both variables:
   - `RESEND_API_KEY` (keep this secret!)
   - `RESEND_AUDIENCE_ID`

## 6. Test the Newsletter Signup

1. Go to your website
2. Scroll to the "Stay Updated" section
3. Enter an email and click Subscribe
4. Check your Resend dashboard to see the new contact

## Features

- ✅ Email validation
- ✅ Duplicate email detection
- ✅ Success/error messages
- ✅ Mobile responsive design
- ✅ Smooth animations
- ✅ Disabled state after successful signup

## Sending Campaigns

To send updates to your subscribers:

1. Go to [Broadcasts](https://resend.com/broadcasts) in Resend
2. Click "Create Broadcast"
3. Select your "Seconds Newsletter" audience
4. Compose your email about new films, updates, etc.
5. Send or schedule

## Free Tier Limits

Resend free tier includes:
- 3,000 emails per month
- 100 emails per day
- Perfect for building your initial audience

Need more? Upgrade to their paid plan when you grow!

