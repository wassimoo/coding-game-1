import { z } from "zod";

export const getSlotsPayloadSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  products: z.array(z.enum(["SolarPanels", "Heatpumps"])),
  language: z.enum(["German", "English"]),
  rating: z.enum(["Gold", "Silver", "Bronze"]),
});

export type GetSlotsCriteria = z.infer<typeof getSlotsPayloadSchema>;
