import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

// Input validation schema
const contactSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(100).trim().toLowerCase(),
  message: z.string().min(10).max(1000).trim(),
});

export async function POST(request: Request) {
  try {
    // Validate request method
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      );
    }

    // Parse and validate input
    const body = await request.json();
    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Sanitize inputs
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedMessage = DOMPurify.sanitize(message);

    // Configure nodemailer transporter with strict security
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'TLS_AES_128_GCM_SHA256',
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      }
    });

    // Email content with sanitized inputs
    const mailOptions = {
      from: process.env.DEFAULT_FROM,
      to: process.env.EMAIL_USER, // Send to the configured email user
      subject: `New Contact Form Submission from ${sanitizedName}`,
      text: `
        Name: ${sanitizedName}
        Email: ${email}
        
        Message:
        ${sanitizedMessage}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Form submission received successfully'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, // Don't expose detailed error messages
      { status: 500 }
    );
  }
} 