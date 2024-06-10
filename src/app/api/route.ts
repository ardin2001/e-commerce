import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  return NextResponse.json(
    {
      status: true,
      statusCode: 200,
      message: "success",
      data: {
        text: "Hello World!",
      },
    },
    {
      status: 200,
    }
  );
}
