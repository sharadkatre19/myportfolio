import { NextResponse } from "next/server";

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
  };
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
  const response: ApiResponse = {
    success: true,
    message: 'hle!',
    data: {
      message: 'Message and email sent successfully!',
    }
  };

  return NextResponse.json(response, { status: 200 });
}