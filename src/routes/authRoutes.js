import { Router } from "express";
import { signIn, signUp } from "../controllers/authControllers.js";
import { validateSignIn, validateSignUp } from "../middlewares/joiMiddleware.js";

const router = Router();

router
  .post("/signup", validateSignUp, signUp)
  .post("/signin", validateSignIn, signIn);

export default router;