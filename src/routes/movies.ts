import { Router } from "express";
import { api, language } from "../configs/api.js";

const router: Router = Router();

router.get("/trending/movie/:timeWindow", async (req, res, next) => {
  const time = req.params.timeWindow;

  if (time !== "week" && time !== "day") {
    res
      .status(400)
      .json({ error: "Invalid time window. Use 'week' or 'day'." });
    return;
  }

  try {
    const response = await api.get(
      `/trending/movie/${time}?language=${language}`,
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get("/search/movie", async (req, res, next) => {
  const title = req.query["title"];

  if (!title || typeof title !== "string") {
    res
      .status(400)
      .json({ error: "Missing or invalid 'title' query parameter" });
    return;
  }

  try {
    const response = await api.get(
      `/search/movie?query=${encodeURIComponent(title)}&language=${language}&page=1&include_adult=false`,
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get("/movie/:movieId/videos", async (req, res, next) => {
  const movieId = req.params.movieId;

  if (isNaN(Number(movieId))) {
    res.status(400).json({ error: "Invalid movie ID" });
    return;
  }

  try {
    const response = await api.get(
      `/movie/${movieId}/videos?language=${language}`,
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get("/genre/movie/list", async (_req, res, next) => {
  try {
    const response = await api.get(`/genre/movie/list?language=${language}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
});

export default router;
