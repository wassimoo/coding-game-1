import { Request, RequestHandler, Response } from "express";
import { getAvailableSlots } from "../services/getAvailableSlots";
import { getSlotsPayloadSchema } from "../types/getSlotsCriteria";
import logger from "../utils/logger";

export const getAvailableSlotsHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    logger.debug("req.body @ getAvailableSlotsHandler", { body: req.body });

    const validationResult = getSlotsPayloadSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({ error: validationResult.error });
      return;
    }

    const slots = await getAvailableSlots(validationResult.data);

    res.json(
      slots.map((slot: any) => ({
        available_count: parseInt(slot.available_count),
        start_date: slot.start_date.toISOString(),
      }))
    );
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
