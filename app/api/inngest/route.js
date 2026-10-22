import { serve } from "inngest/next";
import {
  inngest,
  syncUserCreate,
  syncUserUpdate,
  syncUserDelete,
  createUserOrder,
} from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreate, syncUserUpdate, syncUserDelete, createUserOrder],
});
