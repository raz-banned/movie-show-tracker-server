import { create } from "axios";
import { CONFIG } from "./env.js";

export const api = create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${CONFIG.TMDB_TOKEN}`,
    Accept: "application/json",
  },
});

export const language = "en-US";
