import { Router } from "express";
import {
  saveAlbum,
  getAlbums,
  getAlbumById,
  getAlbumAndPage,
  getAlbumsAndSortByYear,
} from "../controller/albumController.js";
import { getAlbum_c, updateAlbum_m } from "../controller/cacheController.js";
import { clearHash_ } from "../middlewares/clearCache.js";

export const router = Router();

router.route("/cache/:limit/:isPublication").get(getAlbum_c);

router.route("/").put(saveAlbum).get(getAlbums);

router.get("/page", getAlbumAndPage);

router.get("/sortingByYear", getAlbumsAndSortByYear);

router.route("/:id").get(getAlbumById).patch(clearHash_, updateAlbum_m);
