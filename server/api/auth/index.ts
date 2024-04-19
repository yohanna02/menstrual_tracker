import { Router } from "express";
import SignupController from "./signup";

const router = Router();

router.post("/signup", SignupController);

export default router;