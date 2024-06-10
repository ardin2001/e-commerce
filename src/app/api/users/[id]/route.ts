import { NextRequest, NextResponse } from "next/server";
import { GetUserById, DeleteUser, UpdateUser } from "@/app/lib/firebase/users";
import {
  notImplemented,
  notFound,
  internalServerError,
} from "../../statusCode";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, statusCode, data } = await GetUserById(params.id);
    if (status) {
      return NextResponse.json(
        {
          status,
          statusCode,
          message: "Successfully get detail user data",
          data: data,
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
        message: "Failed get detail user data",
        data,
      },
      {
        status: statusCode,
      }
    );
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, statusCode } = await GetUserById(params.id);
    if (status) {
      try {
        const inputUser = await req.json();
        const { status, statusCode }: any = await UpdateUser({
          id: params.id,
          dataUpdate: inputUser,
        });
        if (status) {
          return NextResponse.json(
            {
              status,
              statusCode,
              message: "Successfully put user data",
              data: null,
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
              message: "Failed update user data",
              data: null,
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
    } else {
      if (statusCode == notFound) {
        return NextResponse.json(
          {
            status,
            statusCode,
            message: "User not found",
            data: null,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, statusCode } = await GetUserById(params.id);
    if (status) {
      try {
        const { status, statusCode } = await DeleteUser(params.id);
        if (status) {
          return NextResponse.json(
            {
              status,
              statusCode,
              message: "Successfully delete user data",
              data: null,
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
    } else {
      if (statusCode == notFound) {
        return NextResponse.json(
          {
            status,
            statusCode,
            message: "User not found",
            data: null,
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
