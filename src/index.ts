import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { env, exit } from "process";

dotenv.config();

if (!env["TMDB_TOKEN"]) {
  console.error("TMDB_TOKEN is not set in the environment variables.");
  exit(1);
}

const app = express();
const PORT = Number(env["PORT"] || "3000");
const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = env["TMDB_TOKEN"];
const CORS_ORIGINS = env["CORS_ORIGINS"]?.split(",") || [];

app.use(cors({ origin: CORS_ORIGINS }));

const language = "en-US";
const options = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

const fetch = async (url: string, options: RequestInit) => {
  const response = await globalThis.fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response;
};

app.get("/trending/movie/:timeWindow", async (req, res) => {
  const time = req.params.timeWindow;

  if (time !== "week" && time !== "day") {
    res
      .status(400)
      .json({ error: "Invalid time window. Use 'week' or 'day'." });
    return;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/${time}?language=${language}`,
      options(),
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/trending/tv/:timeWindow", async (req, res) => {
  const time = req.params.timeWindow;

  if (time !== "week" && time !== "day") {
    res
      .status(400)
      .json({ error: "Invalid time window. Use 'week' or 'day'." });
    return;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/trending/tv/${time}?language=${language}`,
      options(),
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error fetching trending TV shows:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/search/movie", async (req, res) => {
  const title = req.query["title"];

  if (!title || typeof title !== "string") {
    res
      .status(400)
      .json({ error: "Missing or invalid 'title' query parameter" });
    return;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(title)}&language=${language}&page=1&include_adult=false`,
      options(),
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/movie/:movieId/videos", async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?language=${language}`,
      options(),
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
