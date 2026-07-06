import type { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || "Ошибка сервера";

  console.error(`[Ошибка] ${req.method} ${req.url} ->`, err.message);

  res.status(status).json({
    success: false,
    message,
  });
};
