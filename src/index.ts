import express from "express";
import { corsHandler } from "./middlewares/corsHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { CONFIG } from "./configs/env.js";
import moviesRouter from "./routes/movies.js";
import tvsRouter from "./routes/tvs.js";

const app = express();

app.use(corsHandler);

app.use(express.json());

app.use("/api/movies", moviesRouter);
app.use("/api/tvs", tvsRouter);

app.use(errorHandler);

app.listen(CONFIG.PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${CONFIG.PORT}`);
});
