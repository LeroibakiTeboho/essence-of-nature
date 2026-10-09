import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import authSeller from "@/lib/authSeller";
import connectDB from "@/config/db";
import Product from "@/models/Product";

import { UNAUTHORIZED, BAD_REQUEST, CREATED } from "@/lib/httpStatus";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload one image to Cloudinary
function uploadImage(file) {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          if (!result?.secure_url) {
            return reject(new Error("Cloudinary image upload failed."));
          }

          resolve(result.secure_url);
        },
      );

      stream.end(buffer);
    } catch (error) {
      reject(error);
    }
  });
}

export async function POST(request) {
  try {
    // 1. Authenticate the user
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Please sign in first." },
        { status: UNAUTHORIZED },
      );
    }

    // 2. Verify seller permissions
    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: UNAUTHORIZED },
      );
    }

    // 3. Read form data
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const rawPrice = formData.get("price");
    const rawOfferPrice = formData.get("offerPrice");

    const files = formData
      .getAll("images")
      .filter(
        (file) =>
          typeof file !== "string" &&
          file !== null &&
          typeof file.arrayBuffer === "function" &&
          file.size > 0,
      );

    // 4. Validate required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof category !== "string" ||
      !category.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, description, and category are required.",
        },
        { status: BAD_REQUEST },
      );
    }

    // 5. Validate prices
    if (
      typeof rawPrice !== "string" ||
      rawPrice.trim() === "" ||
      typeof rawOfferPrice !== "string" ||
      rawOfferPrice.trim() === ""
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Price and offer price are required.",
        },
        { status: BAD_REQUEST },
      );
    }

    const price = Number(rawPrice);
    const offerPrice = Number(rawOfferPrice);

    if (
      !Number.isFinite(price) ||
      !Number.isFinite(offerPrice) ||
      price < 0 ||
      offerPrice < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter valid prices greater than or equal to zero.",
        },
        { status: BAD_REQUEST },
      );
    }

    // 6. Validate images
    if (files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload at least one product image.",
        },
        { status: BAD_REQUEST },
      );
    }

    if (
      files.length > 4 ||
      files.some((file) => !file.type.startsWith("image/"))
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Upload between 1 and 4 image files.",
        },
        { status: BAD_REQUEST },
      );
    }

    // 7. Verify Cloudinary configuration
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new Error("Cloudinary environment variables are missing.");
    }

    // 8. Connect to MongoDB
    await connectDB();

    // 9. Upload images
    const images = await Promise.all(files.map(uploadImage));

    // 10. Create product
    const newProduct = await Product.create({
      userId,
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      price,
      offerPrice,
      images,
      date: Date.now(),
    });

    // 11. Return success
    return NextResponse.json(
      {
        success: true,
        message: "Product added successfully.",
        product: newProduct,
      },
      { status: CREATED },
    );
  } catch (error) {
    console.error("Error adding product:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add product. Check the server logs.",
      },
      { status: 500 },
    );
  }
}
