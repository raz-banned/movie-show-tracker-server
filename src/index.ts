import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env["TMDB_TOKEN"];

const language = "en-US";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
};

app.get("/trending/movie/:timeWindow", (req, res) => {
  const time = req.params.timeWindow || "week";

  const fetchResponse = fetch(
    `${BASE_URL}/trending/movie/${time}?language=${language}`,
    options,
  );
  res.send(fetchResponse);
});

app.get("/trending/tv/:timeWindow", (req, res) => {
  const time = req.params.timeWindow || "week";

  const fetchResponse = fetch(
    `${BASE_URL}/trending/tv/${time}?language=${language}`,
    options,
  );
  res.send(fetchResponse);
});

app.get("/search/movie", (req, res) => {
  const title = req.query["title"];

  if (!title || typeof title !== "string") {
    res
      .status(400)
      .json({ error: "Missing or invalid 'title' query parameter" });
    return;
  }

  const fetchResponse = fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(title)}&language=${language}&page=1&include_adult=false`,
    options,
  );
  res.send(fetchResponse);
});

app.get("/movie/:movieId/videos", (req, res) => {
  const movieId = req.params.movieId;

  const fetchResponse = fetch(`${BASE_URL}/movie/${movieId}/videos`, options);
  res.send(fetchResponse);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
