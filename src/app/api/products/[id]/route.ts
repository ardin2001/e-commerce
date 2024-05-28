import { NextRequest, NextResponse } from "next/server"
import { GetById } from "@/app/lib/firebase/products"
export async function GET(req :NextRequest,params : {params : {id : string}}) {
    const response = await GetById("products",params.params.id)
    return NextResponse.json({ 
        status : true,
        statusCode : 200,
        message : "Success get detail data product",
        data : response
     })
  }