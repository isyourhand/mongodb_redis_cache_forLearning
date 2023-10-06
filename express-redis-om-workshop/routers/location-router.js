import { Router } from "express";

import { locationOfId } from "../controller/locationController.js";

export const router = Router();

router.patch("/:id/location/:lng,:lat", locationOfId);
