import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_RAILWAYS_API_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_RAILWAYS_API_URL: process.env.NEXT_PUBLIC_RAILWAYS_API_URL,
  },
});
