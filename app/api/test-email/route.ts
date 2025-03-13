import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { headers } from 'next/headers';

// Only allow this route in development environment
const isProduction = process.env.NODE_ENV === 'production';

export async function GET() {
  // Block access in production
  if (isProduction) {
    return NextResponse.json(
      { error: 'This endpoint is only available in development environment' },
      { status: 403 }
    );
  }

  const headersList = headers();
  const apiKey = headersList.get('x-api-key') || '';
  
  // Verify API key
  if (apiKey !== process.env.TEST_EMAIL_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Rate limiting check
  const rateLimitKey = 'test_email_last_sent';
  const lastSentStr = process.env[rateLimitKey];
  const now = Date.now();
  const minInterval = 60000; // 1 minute in milliseconds

  if (lastSentStr) {
    const lastSent = parseInt(lastSentStr);
    if (now - lastSent < minInterval) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait 1 minute between test emails.' },
        { status: 429 }
      );
    }
  }

  try {
    const testResult = await sendEmail({
      to: process.env.EMAIL_USER!, // Only send to the configured email
      subject: 'Email API Test - ThinkBigg',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            🎉 Email API Test Successful!
          </h1>
          
          <div style="padding: 20px 0;">
            <p>This email confirms that your ThinkBigg application's email system is working correctly.</p>
            
            <h2 style="color: #666;">Test Details:</h2>
            <ul style="color: #555;">
              <li>Environment: ${process.env.NODE_ENV}</li>
              <li>Timestamp: ${new Date().toLocaleString()}</li>
              <li>Request ID: ${crypto.randomUUID()}</li>
            </ul>
          </div>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #666;">
              If you received this email, your email configuration is working perfectly! 🚀
            </p>
          </div>
        </div>
      `,
    });

    if (!testResult.success) {
      return NextResponse.json(
        { error: 'Failed to send test email', details: testResult.error },
        { status: 500 }
      );
    }

    // Update last sent timestamp
    process.env[rateLimitKey] = now.toString();

    return NextResponse.json({
      message: 'Test email sent successfully',
      messageId: testResult.messageId,
    });
  } catch (error) {
    console.error('Error in test-email route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}