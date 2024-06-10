import { NextRequest, NextResponse } from "next/server";
import {
  GetProductById,
  UpdateProduct,
  DeleteProduct,
} from "@/app/lib/firebase/products";
import {
  notFound,
  internalServerError,
  notImplemented,
} from "../../statusCode";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, statusCode, data } = await GetProductById(params.id);
    if (status) {
      return NextResponse.json(
        {
          status: true,
          statusCode,
          message: "Successfully get detail Product data",
          data: data,
        },
        {
          status: statusCode,
        }
      );
    } else {
      if (statusCode == notFound) {
        return NextResponse.json(
          {
            status: false,
            statusCode,
            message: "Failed get detail Product data",
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dataUpdate = await req.json();
    const { status, statusCode }: any = await GetProductById(params.id);
    if (status) {
      const { status, statusCode }: any = await UpdateProduct({
        id: params.id,
        dataUpdate,
      });

      if (status) {
        return NextResponse.json(
          {
            status,
            statusCode,
            message: "Successfully update product data",
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
            message: "Failed update product data",
            data: null,
          },
          {
            status: statusCode,
          }
        );
      }
    } else {
      if (statusCode == notFound) {
        return NextResponse.json(
          {
            status,
            statusCode,
            message: "Product not found",
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
    const { status, statusCode } = await GetProductById(params.id);
    if (status) {
      const { status, statusCode } = await DeleteProduct(params.id);
      if (status) {
        return NextResponse.json(
          {
            status,
            statusCode,
            message: "Successfully delete product data",
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
    } else {
      if (statusCode == notFound) {
        return NextResponse.json(
          {
            status,
            statusCode,
            message: "Product not found",
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
