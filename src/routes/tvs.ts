import { Router } from "express";
import { api, language } from "../configs/api.js";

const router: Router = Router();

router.get("/trending/tv/:timeWindow", async (req, res, next) => {
  const time = req.params.timeWindow;

  if (time !== "week" && time !== "day") {
    res
      .status(400)
      .json({ error: "Invalid time window. Use 'week' or 'day'." });
    return;
  }

  try {
    const response = await api.get(`/trending/tv/${time}?language=${language}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get("/genre/tv/list", async (_req, res, next) => {
  try {
    const response = await api.get(`/genre/tv/list?language=${language}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
});

export default router;
