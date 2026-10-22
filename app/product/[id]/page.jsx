"use client";

import React, { useMemo, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

// Normalize any of the common image shapes into a string[]
// Supports: [url], url, [{url}], {url}, undefined
const normalizeImages = (product) => {
  if (!product) return [];
  const raw = product.image ?? product.images;
  if (Array.isArray(raw)) {
    return raw
      .map((x) => (typeof x === "string" ? x : x?.url))
      .filter((x) => typeof x === "string" && x.trim().length > 0);
  }
  if (typeof raw === "string" && raw.trim().length > 0) return [raw];
  if (raw && typeof raw === "object" && typeof raw.url === "string") {
    return [raw.url];
  }
  return [];
};

const Product = () => {
  const { id } = useParams();

  const { products, router, addToCart } = useAppContext();

  const [selectedImage, setSelectedImage] = useState(null);

  // Derive productData from products + id during render — no effect,
  // no setState-in-effect warning, no stale value.
  const productData = useMemo(
    () => products.find((p) => p?._id === id) ?? null,
    [products, id],
  );

  if (!productData) return <Loading />;

  const images = normalizeImages(productData);
  const heroImage =
    (selectedImage?.productId === id ? selectedImage.image : null) ||
    images[0] ||
    null;
  const rating = Number(productData.rating ?? 4.5);
  const offerPrice = Number(productData.offerPrice ?? 0);
  const price = Number(productData.price ?? 0);

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4 aspect-video flex items-center justify-center">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={productData.name || "Product image"}
                  className="w-full h-auto object-cover mix-blend-multiply"
                  width={1280}
                  height={720}
                />
              ) : (
                <span className="text-sm text-gray-400">No image</span>
              )}
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImage({ productId: id, image })}
                    className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                  >
                    <Image
                      src={image}
                      alt={`${productData.name || "Product"} thumbnail ${index + 1}`}
                      className="w-full h-auto object-cover mix-blend-multiply"
                      width={1280}
                      height={720}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name || "Untitled product"}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image
                    key={index}
                    className="h-4 w-4"
                    src={
                      index < Math.floor(rating)
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    alt="star_icon"
                  />
                ))}
              </div>
              <p>({rating})</p>
            </div>

            <p className="text-gray-600 mt-3">
              {productData.description || ""}
            </p>

            <p className="text-3xl font-medium mt-6">
              ${offerPrice}
              {price > 0 && (
                <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                  ${price}
                </span>
              )}
            </p>

            <hr className="bg-gray-600 my-6" />

            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Brand</td>
                    <td className="text-gray-800/50">Generic</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Color</td>
                    <td className="text-gray-800/50">Multi</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/50">
                      {productData.category || "—"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(productData._id);
                  router.push("/cart");
                }}
                className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured{" "}
              <span className="font-medium text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products
              .filter((p) => p?._id)
              .slice(0, 5)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            See more
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
