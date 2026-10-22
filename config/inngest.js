// src/inngest/client.ts

import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";
import Order from "@/models/Order";

export const inngest = new Inngest({
  id: "essence-of-nature-next",
});

// ----------------------------------------
// Sync user create
// ----------------------------------------

export const syncUserCreate = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: { event: "clerk/user.created" },
  },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      primary_email_address_id,
      image_url,
    } = event.data;

    const primaryEmail = email_addresses.find(
      (email) => email.id === primary_email_address_id,
    );

    if (!primaryEmail) {
      throw new Error("Primary email address not found");
    }

    const userData = {
      _id: id,
      email: primaryEmail.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      imageUrl: image_url,
    };

    await connectDB();

    await User.findOneAndUpdate({ _id: id }, userData, {
      upsert: true,
      new: true,
      runValidators: true,
    });

    console.log(`User created/synced: ${id}`);
  },
);

// ----------------------------------------
// Sync user update
// ----------------------------------------

export const syncUserUpdate = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: { event: "clerk/user.updated" },
  },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      primary_email_address_id,
      image_url,
    } = event.data;

    const primaryEmail = email_addresses.find(
      (email) => email.id === primary_email_address_id,
    );

    if (!primaryEmail) {
      throw new Error("Primary email address not found");
    }

    const userData = {
      email: primaryEmail.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      imageUrl: image_url,
    };

    await connectDB();

    await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });

    console.log(`User updated/synced: ${id}`);
  },
);

// ----------------------------------------
// Sync user delete
// ----------------------------------------

export const syncUserDelete = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
    triggers: { event: "clerk/user.deleted" },
  },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();

    await User.findByIdAndDelete(id);

    console.log(`User deleted: ${id}`);
  },
);


// ----------------------------------------
// Ingest Function to create user's order in database
// ----------------------------------------

export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 25,
      timeout: '5s'
    }
  },
  {event: 'order/created'},
  async ({ events }) => {
    const orders = events.map((event) => {
      return{ 
        userId: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address: event.data.address,
        date: event.data.date
      }
    })

    await connectDB();
    await Order.insertMany(orders)

    return { success: true, message: 'Orders created successfully' }
  }
)