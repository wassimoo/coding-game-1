import { SlotEntity } from "../db/entities/slotEntity";

export const hasOverlappingSlot = (slots: SlotEntity[], slot: SlotEntity) => {
  return slots.some(
    (s) =>
      s.salesManager.id === slot.salesManager.id &&
      s.booked &&
      ((s.startDate <= slot.startDate && s.endDate > slot.startDate) ||
        (s.startDate < slot.endDate && s.endDate >= slot.endDate))
  );
};
