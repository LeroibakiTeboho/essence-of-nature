"use client";

import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios"; // 🔴 was missing — that was the crash

const SA_PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
];

const inputClass =
  "px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500";

const AddAddress = () => {
  const { getToken, router } = useAppContext();

  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    suburb: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const set = (field) => (e) =>
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Client-side validation matching the schema
    if (!address.province || !SA_PROVINCES.includes(address.province)) {
      return toast.error("Please select a valid South African province.");
    }
    if (!/^\d{4}$/.test(address.postalCode.trim())) {
      return toast.error("Postal code must be 4 digits (e.g. 2001).");
    }
    const phone = address.phoneNumber.replace(/[\s-]/g, "");
    if (!/^(\+27|0)[1-8]\d{8}$/.test(phone)) {
      return toast.error(
        "Enter a valid South African phone number (e.g. 0821234567 or +27821234567).",
      );
    }

    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/add-address",
        {
          address: { ...address, phoneNumber: phone },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.success) {
        toast.success(data.message);
        router.push("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Could not save address.",
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={onSubmitHandler} className="w-full">
          <p className="text-2xl md:text-3xl text-gray-500">
            Add Shipping{" "}
            <span className="font-semibold text-orange-600">Address</span>
          </p>

          <div className="space-y-3 max-w-sm mt-10">
            <input
              className={inputClass}
              type="text"
              placeholder="Full name"
              onChange={set("fullName")}
              value={address.fullName}
              required
            />

            <input
              className={inputClass}
              type="tel"
              placeholder="Phone number (e.g. 0821234567 or +27821234567)"
              onChange={set("phoneNumber")}
              value={address.phoneNumber}
              required
            />

            <input
              className={inputClass}
              type="text"
              placeholder="Street address (house no. & street)"
              onChange={set("streetAddress")}
              value={address.streetAddress}
              required
            />

            <input
              className={inputClass}
              type="text"
              placeholder="Suburb"
              onChange={set("suburb")}
              value={address.suburb}
              required
            />

            <div className="flex space-x-3">
              <input
                className={inputClass}
                type="text"
                placeholder="City"
                onChange={set("city")}
                value={address.city}
                required
              />

              <select
                className={inputClass}
                onChange={set("province")}
                value={address.province}
                required
              >
                <option value="" disabled>
                  Province
                </option>
                {SA_PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <input
              className={inputClass}
              type="text"
              inputMode="numeric"
              pattern="\d{4}"
              maxLength={4}
              placeholder="Postal code (4 digits)"
              onChange={set("postalCode")}
              value={address.postalCode}
              required
            />

            <p className="text-xs text-gray-400">Country: South Africa</p>
          </div>

          <button
            type="submit"
            className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase"
          >
            Save address
          </button>
        </form>

        <Image
          className="md:mr-16 mt-16 md:mt-0"
          src={assets.my_location_image}
          alt="my_location_image"
        />
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;
