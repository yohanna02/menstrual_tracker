import { Router } from "express";
import SignupController from "./signup";
import LoginController from "./login";
import OnBoardingController from "./onboarding";
import isAuthenticated from "../../middlewares/isAuthenticated";

const router = Router();

router.post("/onboarding", isAuthenticated, OnBoardingController);
router.post("/login", LoginController);
router.post("/signup", SignupController);

export default router;