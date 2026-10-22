import mongoose from "mongoose";

export const SA_PROVINCES = [
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

const addressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },

    fullName: { type: String, required: true, trim: true },
    // +27 XX XXX XXXX or 0XX XXX XXXX (mobile 06–08 or landline 01–05)
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^(\+27|0)[1-8]\d{8}$/,
        "Enter a valid South African phone number",
      ],
    },

    streetAddress: { type: String, required: true, trim: true }, // house no + street
    suburb: { type: String, required: true, trim: true }, // e.g. Sandton, Rondebosch
    city: { type: String, required: true, trim: true }, // e.g. Cape Town
    province: { type: String, required: true, enum: SA_PROVINCES },

    postalCode: {
      type: String,
      required: true,
      match: [/^\d{4}$/, "South African postal codes must be 4 digits"],
    },

    country: { type: String, default: "South Africa" },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address;
