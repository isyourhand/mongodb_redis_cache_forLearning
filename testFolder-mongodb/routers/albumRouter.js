import { Router } from "express";

import { createAlbum, getAlbum } from "../controller/albumController.js";

export const router = Router();

router.route("/").post(createAlbum).get(getAlbum);
