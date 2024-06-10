import { NextRequest, NextResponse } from "next/server";
import { PostUser } from "@/app/lib/firebase/users";
import { GetAllUser } from "@/app/lib/firebase/users";

export async function GET(req: NextRequest) {
  const { status, data, statusCode } = await GetAllUser();
  if (status) {
    return NextResponse.json({
      status,
      statusCode,
      message: "Successfully get all user data",
      data,
    });
  }
  return NextResponse.json({
    status,
    statusCode,
    message: "Error Server API",
    data: null,
  });
}

export async function POST(req: NextRequest) {
  const inputUser = await req.json();
  inputUser.role = "user";
  inputUser.verified = false;

  const { status, statusCode } = await PostUser(inputUser);
  if (status) {
    return NextResponse.json({
      status,
      statusCode,
      message: "Successfully post user data",
      data: inputUser,
    });
  } else {
    if (statusCode == 401) {
      return NextResponse.json({
        status,
        statusCode,
        message: "Already user data",
        data: null,
      });
    } else {
      return NextResponse.json({
        status,
        statusCode,
        message: "Error Server API",
        data: null,
      });
    }
  }
}
