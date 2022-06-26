declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;

      SMTP_URL: string;
      EMAIL_FROM: string;

      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;

      MEILISEARCH_HOST: string;
      MEILISEARCH_API_KEY: string;

      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
