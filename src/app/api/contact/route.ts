import axios, { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer, { Transporter } from 'nodemailer';

// Type definitions
interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

interface TelegramApiResponse {
  ok: boolean;
  result?: {
    message_id: number;
    date: number;
    chat: {
      id: number;
      type: string;
    };
    text: string;
  };
  error_code?: number;
  description?: string;
}

interface TelegramMessageRequest {
  text: string;
  chat_id: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

interface MailOptions {
  from: string;
  to: string;
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
async function sendTelegramMessage(
  token: string, 
  chat_id: string, 
  message: string
): Promise<boolean> {
  const url: string = `https://api.telegram.org/bot${token}/sendMessage`;
  
  try {
    const requestData: TelegramMessageRequest = {
      text: message,
      chat_id,
    };
    
    const response: AxiosResponse<TelegramApiResponse> = await axios.post(url, requestData);
    return response.data.ok;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error sending Telegram message:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
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
    to: process.env.EMAIL_ADDRESS || '', 
    subject: `New Message From ${name}`, 
    text: message, 
    html: generateEmailTemplate(name, email, userMessage), 
    replyTo: email, 
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error while sending email:', error.message);
    } else {
      console.error('Unexpected error while sending email:', error);
    }
    return false;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const payload: ContactPayload = await request.json();
    const { name, email, message: userMessage } = payload;
    const token: string | undefined = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id: string | undefined = process.env.TELEGRAM_CHAT_ID;

    // Validate environment variables
    if (!token || !chat_id) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Telegram token or chat ID is missing.',
      }, { status: 400 });
    }

    // Validate payload
    if (!name || !email || !userMessage) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Missing required fields: name, email, or message.',
      }, { status: 400 });
    }

    const message: string = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    // Send Telegram message
    const telegramSuccess: boolean = await sendTelegramMessage(token, chat_id, message);

    // Send email
    const emailSuccess: boolean = await sendEmail(payload, message);

    if (telegramSuccess && emailSuccess) {
      return NextResponse.json<ApiResponse>({
        success: true,
        message: 'Message and email sent successfully!',
      }, { status: 200 });
    }

    return NextResponse.json<ApiResponse>({
      success: false,
      message: 'Failed to send message or email.',
    }, { status: 500 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error:', error.message);
    } else {
      console.error('Unexpected API Error:', error);
    }
    
    return NextResponse.json<ApiResponse>({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
}