import { NextRequest, NextResponse } from "next/server";
import {
  GetUserById,
  DeleteUser,
  UpdateUser,
} from "@/app/lib/firebase/users";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { status, data } = await GetUserById(params.id);
  if (status) {
    return NextResponse.json({
      status: true,
      statusCode: 200,
      message: "Successfully get detail user data",
      data: data,
    });
  }
  return NextResponse.json({
    status: false,
    statusCode: 401,
    message: "Failed get detail user data",
    data,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const inputUser = await req.json();
  const { status, statusCode }: any = await UpdateUser({
    id: params.id,
    dataUpdate: inputUser,
  });
  if (status) {
    return NextResponse.json({
      status,
      statusCode,
      message: "Successfully put user data",
      data: null,
    });
  }

  if (statusCode == 401) {
    return NextResponse.json({
      status,
      statusCode,
      message: "User not found",
      data: null,
    });
  }

  return NextResponse.json({
    status,
    statusCode,
    message: "Failed update user data",
    data: null,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { status, statusCode } = await DeleteUser(params.id);
  if (status) {
    return NextResponse.json({
      status,
      statusCode,
      message: "Successfully delete user data",
      data: null,
    });
  }
  if (statusCode == 401) {
    return NextResponse.json({
      status,
      statusCode,
      message: "User not found",
      data: null,
    });
  }
  return NextResponse.json({
    status,
    statusCode,
    message: "Error Server API",
    data: null,
  });
}
