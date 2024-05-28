import { NextRequest, NextResponse } from "next/server"
import { GetAll } from "@/app/lib/firebase/products"
export async function GET(req :NextRequest) {   
    const response = await GetAll("products")
    return NextResponse.json({ 
        status : true,
        statusCode : 200,
        message : "Success get all data products",
        data : response
     })
  }