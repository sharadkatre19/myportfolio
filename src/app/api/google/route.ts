import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  token: string;
}

interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

interface ApiResponse {
  message?: string;
  error?: string;
  success: boolean;
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const reqBody: RequestBody = await request.json();
    const secret_key: string | undefined = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

    if (!secret_key) {
      return NextResponse.json({
        error: "Recaptcha secret key not configured",
        success: false,
      }, { status: 500 });
    }

    if (!reqBody.token) {
      return NextResponse.json({
        error: "Captcha token is required",
        success: false,
      }, { status: 400 });
    }

    const url: string = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${reqBody.token}`;

    const res = await axios.post<RecaptchaResponse>(url);
    
    if (res.data.success) {
      return NextResponse.json({
        message: "Captcha verification success!!",
        success: true,
      });
    }

    return NextResponse.json({
      error: "Captcha verification failed!",
      success: false,
    }, { status: 500 });
    
  } catch (error) {
    console.error("Captcha verification error:", error);
    
    return NextResponse.json({
      error: "Captcha verification failed!",
      success: false,
    }, { status: 500 });
  }
}