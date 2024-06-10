import { NextRequest, NextResponse } from "next/server";
import { GetUserBy } from "@/app/lib/firebase/users";
export async function POST(req: NextRequest) {
  const inputUser = await req.json();
  const { status, statusCode, data } = await GetUserBy(inputUser);
  if (status) {
    if(data.password == inputUser.password){
      return NextResponse.json({
        status,
        statusCode,
        message: "Login Successful",
        data,
      });
    }
    return NextResponse.json({
      status : false,
      statusCode : 401,
      message: "Invalid password",
      data :null,
    });
  }
  if (statusCode == 401) {
    return NextResponse.json({
      status,
      statusCode,
      message: "Invalid email",
      data,
    });
  }
  if (statusCode == 501) {
    return NextResponse.json({
      status,
      statusCode,
      message: "Error Server API",
      data,
    });
  }
}
