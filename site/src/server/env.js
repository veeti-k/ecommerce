// @ts-check
var { z } = require("zod");

const envSchema = z.object({
  DATABASE_URL: z.string(),

  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),

  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.number().optional(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  EMAIL_FROM: z.string(),

  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  MEILISEARCH_HOST: z.string(),
  MEILISEARCH_API_KEY: z.string(),

  NODE_ENV: z.enum(["development", "production", "test"]),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(env.error.format(), null, 4)
  );
  process.exit(1);
}

module.exports = { env };
