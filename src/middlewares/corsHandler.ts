import type { Request, Response, NextFunction } from "express";
import { CONFIG } from "../configs/env.js";

export const corsHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const origin = req.headers.origin;

  if (origin && CONFIG.ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
};
