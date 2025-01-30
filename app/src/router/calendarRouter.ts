import { Router } from "express";
import { getAvailableSlotsHandler } from "../handlers/getAvailableSlotsHandler";

const router = Router();

router.post("/query", getAvailableSlotsHandler);

export default router;
