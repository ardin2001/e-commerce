import { NextRequest, NextResponse } from "next/server";
import {
  GetAllProduct,
  PostProduct,
  GetProductById,
  GetProductBy,
} from "@/app/lib/firebase/products";
import {
  notFound,
  internalServerError,
  notImplemented,
  conflict,
} from "../statusCode";
export async function GET(req: NextRequest) {
  try {
    const { status, statusCode, data } = await GetAllProduct();
    if (status) {
      return NextResponse.json(
        {
          status,
          statusCode,
          message: "Success get all products data",
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
            message: "failed get all products data",
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
    const dataInput = await req.json();
    const { status, statusCode }: any = await GetProductBy(dataInput);
    if (status) {
      return NextResponse.json(
        {
          status: false,
          statusCode: conflict,
          message: "Product name available",
          data: null,
        },
        {
          status: conflict,
        }
      );
    } else {
      if (statusCode == notFound) {
        const { status, statusCode } = await PostProduct(dataInput);
        if (status) {
          return NextResponse.json(
            {
              status,
              statusCode,
              message: "Successfully post product data",
              data: dataInput,
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
