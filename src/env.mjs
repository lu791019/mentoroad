import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().min(1),
        NODE_ENV: z.enum(["development", "test", "production"]),
        NEXTAUTH_SECRET: process.env.NODE_ENV === "production" ?
            z.string().min(1) : z.string().min(1).optional(),
        NEXTAUTH_URL: z.preprocess(
            (str) => process.env.VERCEL_URL ?? str,
            process.env.VERCEL ? z.string().min(1) : z.string().url(),
        ),
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string(),
        LINKEDIN_CLIENT_ID: z.string(),
        LINKEDIN_CLIENT_SECRET: z.string(),
        STRIPE_SECRET_KEY: z.string(),
        GOOGLE_API_KEY: z.string(),
    },
    client: {
        // 客戶端環境變量（如果需要）
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
        LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});