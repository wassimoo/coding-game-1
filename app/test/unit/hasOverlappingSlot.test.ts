import { hasOverlappingSlot } from "../../src/utils/hasOverlappingSlot";
import { SlotEntity } from "../../src/db/entities/slotEntity";
import { SalesManagerEntity } from "../../src/db/entities/salesManagerEntity";

describe("hasOverlappingSlot", () => {
  const createSlot = (
    id: number,
    salesManagerId: number,
    startDate: string,
    endDate: string,
    booked: boolean
  ) => ({
    id,
    salesManager: { id: salesManagerId } as SalesManagerEntity,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    booked,
  });

  it("should return false when there are no slots", () => {
    const slots: SlotEntity[] = [];
    const slot = createSlot(
      1,
      1,
      "2023-10-01T10:00:00Z",
      "2023-10-01T11:00:00Z",
      true
    );
    expect(hasOverlappingSlot(slots, slot)).toBe(false);
  });

  it("should return false when there are no overlapping slots", () => {
    const slots: SlotEntity[] = [
      createSlot(1, 1, "2023-10-01T08:00:00Z", "2023-10-01T09:00:00Z", true),
      createSlot(2, 2, "2023-10-01T10:00:00Z", "2023-10-01T11:00:00Z", true),
    ];
    const slot = createSlot(
      3,
      1,
      "2023-10-01T11:00:00Z",
      "2023-10-01T12:00:00Z",
      true
    );
    expect(hasOverlappingSlot(slots, slot)).toBe(false);
  });

  it("should return true when there is an overlapping slot", () => {
    const slots: SlotEntity[] = [
      createSlot(1, 1, "2023-10-01T08:00:00Z", "2023-10-01T09:30:00Z", true),
      createSlot(2, 1, "2023-10-01T09:00:00Z", "2023-10-01T10:00:00Z", true),
    ];
    const slot = createSlot(
      3,
      1,
      "2023-10-01T09:15:00Z",
      "2023-10-01T10:15:00Z",
      true
    );
    expect(hasOverlappingSlot(slots, slot)).toBe(true);
  });

  it("should return false when the overlapping slot is not booked", () => {
    const slots: SlotEntity[] = [
      createSlot(1, 1, "2023-10-01T08:00:00Z", "2023-10-01T09:30:00Z", false),
    ];
    const slot = createSlot(
      2,
      1,
      "2023-10-01T09:00:00Z",
      "2023-10-01T10:00:00Z",
      true
    );
    expect(hasOverlappingSlot(slots, slot)).toBe(false);
  });

  it("should return false when the sales manager IDs do not match", () => {
    const slots: SlotEntity[] = [
      createSlot(1, 2, "2023-10-01T08:00:00Z", "2023-10-01T09:30:00Z", true),
    ];
    const slot = createSlot(
      2,
      1,
      "2023-10-01T09:00:00Z",
      "2023-10-01T10:00:00Z",
      true
    );
    expect(hasOverlappingSlot(slots, slot)).toBe(false);
  });
});
