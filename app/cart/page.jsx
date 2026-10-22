"use client";

import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
  } = useAppContext();

  // Build a lookup once instead of .find() per row
  const productMap = React.useMemo(() => {
    const map = new Map();
    for (const p of products ?? []) {
      if (p?._id) map.set(p._id, p);
    }
    return map;
  }, [products]);

  // Precompute rows so we can render an empty state when nothing matches
  const rows = Object.entries(cartItems ?? {})
    .filter(([, qty]) => Number(qty) > 0)
    .map(([itemId, qty]) => {
      const product = productMap.get(itemId);
      return product ? { product, itemId, qty: Number(qty) } : null;
    })
    .filter(Boolean);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
            <p className="text-2xl md:text-3xl text-gray-500">
              Your <span className="font-medium text-orange-600">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-500/80">
              {getCartCount()} Items
            </p>
          </div>

          {rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <p className="text-lg">Your cart is empty.</p>
              <button
                onClick={() => router.push("/all-products")}
                className="mt-4 text-orange-600 hover:underline"
              >
                Browse products
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="text-left">
                  <tr>
                    <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-600 font-medium">
                      Product Details
                    </th>
                    <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                      Price
                    </th>
                    <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                      Quantity
                    </th>
                    <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ product, itemId, qty }) => {
                    const imageSrc = product.image?.[0] || null;
                    const price = Number(product.offerPrice ?? 0);

                    return (
                      <tr key={itemId}>
                        <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                          <div>
                            <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2 w-20 h-20 flex items-center justify-center">
                              {imageSrc ? (
                                <Image
                                  src={imageSrc}
                                  alt={product.name || "Product"}
                                  className="w-16 h-auto object-cover mix-blend-multiply"
                                  width={1280}
                                  height={720}
                                />
                              ) : (
                                <span className="text-[10px] text-gray-400">
                                  No image
                                </span>
                              )}
                            </div>
                            <button
                              className="md:hidden text-xs text-orange-600 mt-1"
                              onClick={() => updateCartQuantity(itemId, 0)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="text-sm hidden md:block">
                            <p className="text-gray-800">
                              {product.name || "Untitled product"}
                            </p>
                            <button
                              className="text-xs text-orange-600 mt-1"
                              onClick={() => updateCartQuantity(itemId, 0)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                        <td className="py-4 md:px-4 px-1 text-gray-600">
                          ${price.toFixed(2)}
                        </td>
                        <td className="py-4 md:px-4 px-1">
                          <div className="flex items-center md:gap-2 gap-1">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateCartQuantity(itemId, qty - 1)
                              }
                            >
                              <Image
                                src={assets.decrease_arrow}
                                alt="decrease_arrow"
                                className="w-4 h-4"
                              />
                            </button>
                            <input
                              type="number"
                              min={1}
                              value={qty}
                              onChange={(e) => {
                                const next = Number(e.target.value);
                                updateCartQuantity(
                                  itemId,
                                  Number.isFinite(next) && next > 0 ? next : 1,
                                );
                              }}
                              className="w-12 border text-center appearance-none"
                            />
                            <button
                              aria-label="Increase quantity"
                              onClick={() => addToCart(itemId)}
                            >
                              <Image
                                src={assets.increase_arrow}
                                alt="increase_arrow"
                                className="w-4 h-4"
                              />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 md:px-4 px-1 text-gray-600">
                          ${(price * qty).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <button
            onClick={() => router.push("/all-products")}
            className="group flex items-center mt-6 gap-2 text-orange-600"
          >
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
            />
            Continue Shopping
          </button>
        </div>
        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;
