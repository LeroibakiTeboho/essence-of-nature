import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { FORBIDDEN, INTERNAL_SERVER_ERROR } from "@/lib/httpStatus";
import connectDB from "@/config/db";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const isSeller = authSeller(userId);

    if (!isSeller) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to access this resource.",
        },
        { status: FORBIDDEN },
      );
    }

    await connectDB();

    const products = await Product.find({});
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred while fetching products.",
      },
      { status: INTERNAL_SERVER_ERROR },
    );
  }
}
