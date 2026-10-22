import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

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
    const user = await User.findById(userId);
    if (!user) {
      // Not an error — just means the user hasn't synced yet
      return NextResponse.json({ success: true, cartItems: {} });
    }

    return NextResponse.json({
      success: true,
      cartItems: user.cartItems ?? {},
    });
  } catch (error) {
    console.error("[cart] GET error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch cart." },
      { status: 500 },
    );
  }
}
