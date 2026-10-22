import connectDB from "@/config/db";
import Address, { SA_PROVINCES } from "@/models/Address";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    // ── 1) Auth ────────────────────────────────────────────────
    // If your @/lib/getAuth wraps Clerk v6's auth(), make this:
    //   const { userId } = await getAuth(request);
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    // ── 2) Parse body ──────────────────────────────────────────
    // Accept BOTH shapes: { address: {...} } and { ...address }
    const body = await request.json();
    const address = body?.address ?? body;
    if (!address || typeof address !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid address payload." },
        { status: 400 },
      );
    }

    // ── 3) Normalize before validation ─────────────────────────
    const clean = {
      userId, // server-controlled
      fullName: String(address.fullName ?? "").trim(),
      phoneNumber: String(address.phoneNumber ?? "").replace(/[\s-]/g, ""),
      streetAddress: String(address.streetAddress ?? "").trim(),
      suburb: String(address.suburb ?? "").trim(),
      city: String(address.city ?? "").trim(),
      province: String(address.province ?? "").trim(),
      postalCode: String(address.postalCode ?? "").replace(/\s/g, ""),
      country: "South Africa",
      isDefault: Boolean(address.isDefault),
    };

    if (!SA_PROVINCES.includes(clean.province)) {
      return NextResponse.json(
        {
          success: false,
          message: "Province must be one of the 9 South African provinces.",
        },
        { status: 400 },
      );
    }

    await connectDB();

    // If this will become default, un-default the others first
    if (clean.isDefault) {
      await Address.updateMany({ userId }, { $set: { isDefault: false } });
    }

    const newAddress = await Address.create(clean);

    return NextResponse.json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    console.error("[addresses/add] POST error:", error);
    // Surface Mongoose ValidationErrors as 400, everything else as 500
    const isValidation = error?.name === "ValidationError";
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred while adding the address.",
      },
      { status: isValidation ? 400 : 500 },
    );
  }
}
