import { Router } from "express";
import { readRanking } from "../controllers/rankingControllers.js";

const router = Router();

router
  .get("/ranking", readRanking);

export default router;