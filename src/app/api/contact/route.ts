import axios, { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer, { Transporter } from 'nodemailer';

// Interface for contact form payload
interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

// Interface for Telegram API response
interface TelegramResponse {
  ok: boolean;
  result?: any;
}

// Interface for mail options
interface MailOptions {
  from: string;
  to: string | undefined;
  subject: string;
  text: string;
  html: string;
  replyTo: string;
}

// Create and configure Nodemailer transporter
const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY, 
  },
});

// Helper function to send a message via Telegram
async function sendTelegramMessage(token: string, chat_id: string, message: string): Promise<boolean> {
  const url: string = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res: AxiosResponse<TelegramResponse> = await axios.post(url, {
      text: message,
      chat_id,
    });
    return res.data.ok;
  } catch (error: any) {
    console.error('Error sending Telegram message:', error.response?.data || error.message);
    return false;
  }
}

// HTML email template
const generateEmailTemplate = (name: string, email: string, userMessage: string): string => `
  <div style="font-family: Arial, Helvetica, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
    
    <h2 style="color: #0056b3; margin-top: 0; margin-bottom: 20px; font-size: 22px;">📬 New Message Received</h2>
    
    <p style="margin: 0 0 10px;"><strong>Name:</strong> ${name}</p>
    <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0056b3; text-decoration: none;">${email}</a></p>
    
    <p style="margin: 20px 0 6px;"><strong>Message:</strong></p>
    <div style="border-left: 4px solid #0056b3; padding-left: 16px; background-color: #f0f8ff; margin: 0 0 20px; white-space: pre-line;">
      ${userMessage}
    </div>

    <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">
      You can reply directly to this email to respond to the sender.
    </p>

  </div>
</div>

`;

// Helper function to send an email via Nodemailer
async function sendEmail(payload: ContactPayload, message: string): Promise<boolean> {
  const { name, email, message: userMessage } = payload;
  
  const mailOptions: MailOptions = {
    from: "Portfolio", 
    to: process.env.EMAIL_ADDRESS, 
    subject: `New Message From ${name}`, 
    text: message, 
    html: generateEmailTemplate(name, email, userMessage), 
    replyTo: email, 
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error: any) {
    console.error('Error while sending email:', error.message);
    return false;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload: ContactPayload = await request.json();
    const { name, email, message: userMessage } = payload;
    const token: string | undefined = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id: string | undefined = process.env.TELEGRAM_CHAT_ID;

    // Validate environment variables
    if (!token || !chat_id) {
      return NextResponse.json({
        success: false,
        message: 'Telegram token or chat ID is missing.',
      }, { status: 400 });
    }

    const message: string = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    // Send Telegram message
    const telegramSuccess: boolean = await sendTelegramMessage(token, chat_id, message);

    // Send email
    const emailSuccess: boolean = await sendEmail(payload, message);

    if (telegramSuccess && emailSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Message and email sent successfully!',
      }, { status: 200 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to send message or email.',
    }, { status: 500 });
  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
}