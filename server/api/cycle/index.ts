import { Router } from "express";
import isAuthenticated from "../../middlewares/isAuthenticated";
import getCycle from "./getCycle";

const router = Router();

router.get("/", isAuthenticated, getCycle);

export default router;