import { Router } from "express";
import getCycle from "./getCycle";

const router = Router();

router.get("/", getCycle);

export default router;