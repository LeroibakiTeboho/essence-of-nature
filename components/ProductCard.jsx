"use client";

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  if (!product) return null;

  // ── Resolve the primary image safely ───────────────────────────
  // Supports: image: [url], image: url, images: [url],
  //           image: [{ url }], image: { url }
  const raw = product.image ?? product.images;
  const candidate = Array.isArray(raw)
    ? raw[0]
    : raw && typeof raw === "object"
      ? raw.url
      : raw;

  const imageSrc =
    typeof candidate === "string" && candidate.trim().length > 0
      ? candidate
      : null;

  const rating = Number(product.rating ?? 4.5);
  const price = Number(product.offerPrice ?? 0);

  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
        scrollTo(0, 0);
      }}
      className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
    >
      <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name || "Product"}
            className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
            width={800}
            height={800}
          />
        ) : (
          <div className="text-xs text-gray-400 select-none">No image</div>
        )}

        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
        >
          <Image className="h-3 w-3" src={assets.heart_icon} alt="heart_icon" />
        </button>
      </div>

      <p className="md:text-base font-medium pt-2 w-full truncate">
        {product.name || "Untitled product"}
      </p>

      <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
        {product.description || ""}
      </p>

      <div className="flex items-center gap-2">
        <p className="text-xs">{rating}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-3 w-3"
              src={
                index < Math.floor(rating)
                  ? assets.star_icon
                  : assets.star_dull_icon
              }
              alt="star_icon"
            />
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">
          {currency}
          {price}
        </p>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition"
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
