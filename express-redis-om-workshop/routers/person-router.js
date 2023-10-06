import { Router } from "express";

import {
  savePerson,
  getPerson,
  updatePerson,
  deletePerson,
} from "../controller/personController.js";

export const router = Router();

router.put("/", savePerson);

router.route("/:id").get(getPerson).post(updatePerson).delete(deletePerson);
