import { Router } from "express";
import { readUser } from "../controllers/usersControllers.js";
import { tokenValidation } from "../middlewares/tokenMiddleware.js";

const router = Router();

router
  .get("/users/me", tokenValidation, readUser);

export default router;