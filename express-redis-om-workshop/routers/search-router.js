import { Router } from "express";

import searchController from "../controller/searchController.js";

export const router = Router();

router.get("/all", searchController.searchAll);

router.get("/by-last-name/:lastName", searchController.searchByLastname);

router.get("/old-enough-to-drink-in-america", searchController.searchByAge);

router.get("/non-verified", searchController.isVerified);

router.get(
  "/verified-drinkers-with-last-name/:lastName",
  searchController.isVerifiedAndGte21
);

router.get(
  "/with-statement-containing/:text",
  searchController.isStatementContaining
);

router.get("/near/:lng,:lat/radius/:radius", searchController.searchByLocation);
