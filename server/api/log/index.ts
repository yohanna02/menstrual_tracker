import { Router } from "express";
import createLogs from "./createLogs";
import fetchLogs from "./fetchLogs";

const router = Router();

router.post("/", createLogs);
router.get("/", fetchLogs);

export default router;