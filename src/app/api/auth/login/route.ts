import { NextRequest, NextResponse } from "next/server";
import { GetUserBy } from "@/app/lib/firebase/users";
import {
  notFound,
  internalServerError,
  notImplemented,
} from "../../statusCode";
export async function POST(req: NextRequest) {
  try {
    const inputUser = await req.json();
    const { status, statusCode, data } = await GetUserBy(inputUser);
    if (status) {
      if (data.password == inputUser.password) {
        return NextResponse.json(
          {
            status,
            statusCode,
            message: "Login Successful",
            data,
          },
          {
            status: statusCode,
          }
        );
      }
      return NextResponse.json(
        {
          status: false,
          statusCode: notFound,
          message: "Invalid password",
          data: null,
        },
        {
          status: notFound,
        }
      );
    }
    if (statusCode == notFound) {
      return NextResponse.json(
        {
          status,
          statusCode,
          message: "Invalid email",
          data,
        },
        {
          status: statusCode,
        }
      );
    }
    if (statusCode == notImplemented) {
      return NextResponse.json(
        {
          status,
          statusCode,
          message: "Error Server API",
          data,
        },
        {
          status: statusCode,
        }
      );
    }
  } catch {
    return NextResponse.json(
      {
        status: false,
        statusCode: internalServerError,
        message: "Internal Server Error",
        data: null,
      },
      {
        status: internalServerError,
      }
    );
  }
}
