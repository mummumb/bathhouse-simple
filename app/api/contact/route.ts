import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Bathhouse Studio <noreply@bathhousestudio.com.au>',
      to: 'amanda@bathhousestudio.com.au',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      reply_to: email
    })

    // Option 2: Use SendGrid
    // First install: npm install @sendgrid/mail
    // Then uncomment and configure:
    /*
    import sgMail from '@sendgrid/mail'
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
    
    const msg = {
      to: 'amanda@bathhousestudio.com.au',
      from: 'noreply@bathhousestudio.com.au',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email
    }
    
    await sgMail.send(msg)
    */

    // Option 3: Use Nodemailer with SMTP
    // First install: npm install nodemailer
    // Then uncomment and configure:
    /*
    import nodemailer from 'nodemailer'
    
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
    
    await transporter.sendMail({
      from: `"Bathhouse Studio" <${process.env.SMTP_USER}>`,
      to: 'amanda@bathhousestudio.com.au',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    })
    */

    console.log('Email sent successfully:', data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}