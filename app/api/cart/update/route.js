import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1) Auth — and bail out clearly if it failed
    const { userId } = getAuth(request);
    console.log("[cart/update] userId:", userId); // keep for now, delete later

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized — no valid Clerk session." },
        { status: 401 },
      );
    }

    // 2) Parse body defensively
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body." },
        { status: 400 },
      );
    }

    const { cartData } = body;
    if (!cartData || typeof cartData !== "object" || Array.isArray(cartData)) {
      return NextResponse.json(
        { success: false, message: "cartData must be a plain object." },
        { status: 400 },
      );
    }

    // 3) Sanitize — only positive integer quantities survive
    const sanitized = {};
    for (const [productId, qty] of Object.entries(cartData)) {
      const n = Number(qty);
      if (Number.isFinite(n) && n > 0) sanitized[productId] = Math.floor(n);
    }

    await connectDB();

    // 4) Upsert so the first cart update creates the user if needed
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { cartItems: sanitized } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    // 5) RETURN the response
    return NextResponse.json({
      success: true,
      message: "Cart updated successfully",
      cartItems: user?.cartItems ?? {},
    });
  } catch (error) {
    console.error("[cart/update] POST error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred while updating the cart.",
      },
      { status: 500 },
    );
  }
}
