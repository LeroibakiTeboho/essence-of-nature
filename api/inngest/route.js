import { serve } from "inngest/next";
import {
  inngest,
  syncUserCreate,
  syncUserUpdate,
  syncUserDelete,
} from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreate, syncUserUpdate, syncUserDelete],
});
