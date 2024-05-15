import { Router } from "express";
import SignupController from "./signup";
import LoginController from "./login";
import OnBoardingController from "./onboarding";
import isAuthenticated from "../../middlewares/isAuthenticated";
import updateProfile from "./updateProfile";
import updatePassword from "./updatePassword";

const router = Router();

router.post("/onboarding", isAuthenticated, OnBoardingController);
router.post("/login", LoginController);
router.post("/signup", SignupController);
router.post("/update-profile", isAuthenticated, updateProfile);
router.post("/update-password", isAuthenticated, updatePassword);

export default router;