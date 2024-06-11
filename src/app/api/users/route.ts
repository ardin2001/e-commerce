import { NextRequest, NextResponse } from "next/server";
import { GetAllUser, GetUserBy, PostUser } from "@/app/lib/firebase/users";
import {
  notFound,
  internalServerError,
  notImplemented,
  conflict,
} from "../statusCode";
import validator from "./validator";

export async function GET(req: NextRequest) {
  try {
    const { status, data, statusCode } = await GetAllUser();
    if (status) {
      return NextResponse.json(
        {
          status,
          statusCode,
          message: "Successfully get all user data",
          data,
        },
        {
          status: statusCode,
        }
      );
    } else {
      if (statusCode == notFound) {
        return NextResponse.json(
          {
            status,
            statusCode,
            message: "failed get all users data",
            data,
          },
          {
            status: statusCode,
          }
        );
      } else if (statusCode == notImplemented) {
        return NextResponse.json(
          {
            status,
            statusCode,
            message: "Error Server API",
            data: null,
          },
          {
            status: statusCode,
          }
        );
      }
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

export async function POST(req: NextRequest) {
  try {
    const inputUser = await req.json();
    inputUser.role = "user";
    inputUser.verified = false;

    const result = validator(inputUser);
    if(!result.status){
      return NextResponse.json(
        {
          status: false,
          statusCode: notFound,
          message: result.message,
          data: null,
        },
        {
          status: notFound,
        }
      );
    }

    const { status, statusCode }: any = await GetUserBy(inputUser);
    if (status) {
      return NextResponse.json(
        {
          status: false,
          statusCode: conflict,
          message: "User available",
          data: null,
        },
        {
          status: conflict,
        }
      );
    } else {
      if (statusCode == notFound) {
        const { status, statusCode } = await PostUser(inputUser);
        if (status) {
          return NextResponse.json(
            {
              status,
              statusCode,
              message: "Successfully post user data",
              data: inputUser,
            },
            {
              status: statusCode,
            }
          );
        } else {
          return NextResponse.json(
            {
              status,
              statusCode,
              message: "Error Server API",
              data: null,
            },
            {
              status: statusCode,
            }
          );
        }
      } else if (statusCode == notImplemented) {
        return NextResponse.json(
          {
            status,
            statusCode,
            message: "Error Server API",
            data: null,
          },
          {
            status: statusCode,
          }
        );
      }
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
