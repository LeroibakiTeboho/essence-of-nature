import connectDB from "@/config/db"; // ⚠️ was `connectDb`
import Address from "@/models/Address";
import { NextResponse } from "next/server";
import {getAuth} from "@clerk/nextjs/server"; 

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    await connectDB();
    const addresses = await Address.find({ userId }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    return NextResponse.json({ success: true, addresses });
  } catch (error) {
    console.error("[addresses] GET error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "An error occurred while fetching the addresses.",
      },
      { status: 500 },
    );
  }
}
