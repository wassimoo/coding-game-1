import { SlotEntity } from "../db/entities/slotEntity";

export const groupAvailableSlots = (slots: SlotEntity[]) => {
  const groupedSlots = slots.reduce((acc, slot) => {
    const startDate = slot.startDate.toISOString();
    if (!acc[startDate]) {
      acc[startDate] = { start_date: slot.startDate, available_count: 0 };
    }
    acc[startDate].available_count += 1;
    return acc;
  }, {} as Record<string, { start_date: Date; available_count: number }>);

  return Object.values(groupedSlots);
};
