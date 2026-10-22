"use client";

import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    getToken,
    user,
    cartItems,
    setCartItems,
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  // ─────────────────────────────────────────────────────────────
  // Fetch addresses (also exposed so it can be called after
  // returning from /add-address, if you want)
  // ─────────────────────────────────────────────────────────────
  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress((prev) => prev ?? data.addresses[0]);
        }
      } else {
        toast.error(data.message || "Could not fetch addresses.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Could not fetch addresses.",
      );
    }
  };

  // ─────────────────────────────────────────────────────────────
  // Effect: fetch on mount — async IIFE keeps setState out of the
  // synchronous effect body (satisfies React 19's lint rule)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get("/api/user/get-address", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (cancelled) return;

        if (data.success) {
          setUserAddresses(data.addresses);
          if (data.addresses.length > 0) {
            setSelectedAddress(data.addresses[0]);
          }
        } else {
          toast.error(data.message || "Could not fetch addresses.");
        }
      } catch (error) {
        if (cancelled) return;
        toast.error(
          error?.response?.data?.message ||
            error.message ||
            "Could not fetch addresses.",
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [getToken]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  // Build a South-Africa-formatted one-liner for the address
  const formatAddress = (a) => {
    if (!a) return "Select Address";
    const parts = [
      a.streetAddress || a.area, // fallback to old field if needed
      a.suburb,
      a.city,
      a.province || a.state, // fallback to old field if needed
      a.postalCode,
    ].filter(Boolean);
    return `${a.fullName}, ${parts.join(", ")}`;
  };

  // Totals (computed once, reused below)
  const subtotal = getCartAmount();
  const tax = Math.floor(subtotal * 0.02);
  const total = subtotal + tax;

  const createOrder = async () => {
    if (!user) {
      toast.error("Please sign in to place an order.");
      return router.push("/");
    }
    if (!selectedAddress) {
      toast.error("Please select a shipping address.");
      return;
    }
    if (getCartCount() === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/order/create",
        {
          addressId: selectedAddress._id,
          items: cartItems,
          amount: total,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!data.success) throw new Error(data.message || "Order failed.");

      toast.success("Order placed!");
      setCartItems({});
      router.push("/orders");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Could not place order.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />

      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border">
            <button
              type="button"
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen((v) => !v)}
            >
              <span>{formatAddress(selectedAddress)}</span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5 max-h-60 overflow-y-auto">
                {userAddresses.length === 0 && (
                  <li className="px-4 py-2 text-gray-500 text-sm">
                    No addresses saved yet.
                  </li>
                )}
                {userAddresses.map((address) => (
                  <li
                    key={address._id}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {formatAddress(address)}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center text-orange-600"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <button className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800">
              {currency}
              {subtotal}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              {currency}
              {tax}
            </p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>
              {currency}
              {total}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        disabled={loading}
        className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Placing order…" : "Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;
