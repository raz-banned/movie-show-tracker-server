import { env } from "node:process";

const create_CONFIG = () => {
  if (!env["TMDB_TOKEN"]) {
    console.error("TMDB_TOKEN is not set in the environment variables.");
    process.exit(1);
  }

  return {
    PORT: Number(env["PORT"] || "3000"),
    TMDB_TOKEN: env["TMDB_TOKEN"],
    ALLOWED_ORIGINS: env["CORS_ORIGINS"]?.split(",") || [],
  };
};

export const CONFIG = create_CONFIG();
