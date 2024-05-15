import { Router } from "express";
import createLogs from "./createLogs";
import fetchLogs from "./fetchLogs";
import fetchDateLog from "./fetchDateLog";

const router = Router();

router.get("/date", fetchDateLog);
router.post("/", createLogs);
router.get("/", fetchLogs);

export default router;