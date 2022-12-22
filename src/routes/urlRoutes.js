import { Router } from "express";
import { createUrl, readUrlById } from "../controllers/urlController.js";
import { validateUrl } from "../middlewares/joiMiddleware.js";
import { tokenValidation } from "../middlewares/tokenMiddleware.js";

const router = Router();

router
  .post("/urls/shorten", validateUrl, tokenValidation, createUrl)
  .get("/urls/:id", readUrlById);

export default router;