import { clearHash } from "../models-mongodb/albumModel-M.js";

export const clearHash_ = async (req, res, next) => {
  await next();
  clearHash("");
};
