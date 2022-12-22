import { Router } from "express";
import { signUp } from "../controllers/authControllers.js";
import { validateSignUp } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", validateSignUp, signUp)

export default router;