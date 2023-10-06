import express from "express";

import { router as albumRouter } from "./routers/albumRouter.js";

const app = express();

app.use(express.json());

app.use("/api/album", albumRouter);

export default app;
