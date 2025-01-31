import { SalesManagerEntity } from "../../src/db/entities/salesManagerEntity";
import { SlotEntity } from "../../src/db/entities/slotEntity";
import { groupAvailableSlots } from "../../src/utils/groupAvailableSlots";

describe("groupAvailableSlots", () => {
  it("should group slots by start date", () => {
    const slots: SlotEntity[] = [
      {
        id: 1,
        startDate: new Date("2023-10-01T10:00:00Z"),
        endDate: new Date("2023-10-01T11:00:00Z"),
        booked: false,
        salesManager: { id: 1 } as SalesManagerEntity,
      },
      {
        id: 2,
        startDate: new Date("2023-10-01T10:00:00Z"),
        endDate: new Date("2023-10-01T11:00:00Z"),
        booked: false,
        salesManager: { id: 2 } as SalesManagerEntity,
      },
      {
        id: 3,
        startDate: new Date("2023-10-02T10:00:00Z"),
        endDate: new Date("2023-10-02T11:00:00Z"),
        booked: false,
        salesManager: { id: 2 } as SalesManagerEntity,
      },
    ];

    const groupedSlots = groupAvailableSlots(slots);

    expect(groupedSlots).toEqual([
      { start_date: new Date("2023-10-01T10:00:00Z"), available_count: 2 },
      { start_date: new Date("2023-10-02T10:00:00Z"), available_count: 1 },
    ]);
  });

  it("should return an empty array if no slots are provided", () => {
    const slots: SlotEntity[] = [];

    const groupedSlots = groupAvailableSlots(slots);

    expect(groupedSlots).toEqual([]);
  });

  it("should handle slots with the same start date and time", () => {
    const slots: SlotEntity[] = [
      {
        id: 1,
        startDate: new Date("2023-10-01T10:00:00Z"),
        endDate: new Date("2023-10-01T11:00:00Z"),
        booked: false,
        salesManager: { id: 1 } as SalesManagerEntity,
      },
      {
        id: 2,
        startDate: new Date("2023-10-01T10:00:00Z"),
        endDate: new Date("2023-10-01T11:00:00Z"),
        booked: false,
        salesManager: { id: 2 } as SalesManagerEntity,
      },
    ];

    const groupedSlots = groupAvailableSlots(slots);

    expect(groupedSlots).toEqual([
      { start_date: new Date("2023-10-01T10:00:00Z"), available_count: 2 },
    ]);
  });

  it("should handle slots with different start dates and times", () => {
    const slots: SlotEntity[] = [
      {
        id: 1,
        startDate: new Date("2023-10-01T10:00:00Z"),
        endDate: new Date("2023-10-01T11:00:00Z"),
        booked: false,
        salesManager: { id: 1 } as SalesManagerEntity,
      },
      {
        id: 2,
        startDate: new Date("2023-10-02T11:00:00Z"),
        endDate: new Date("2023-10-02T12:00:00Z"),
        booked: false,
        salesManager: { id: 2 } as SalesManagerEntity,
      },
      {
        id: 3,
        startDate: new Date("2023-10-03T12:00:00Z"),
        endDate: new Date("2023-10-03T13:00:00Z"),
        booked: false,
        salesManager: { id: 3 } as SalesManagerEntity,
      },
    ];

    const groupedSlots = groupAvailableSlots(slots);

    expect(groupedSlots).toEqual([
      { start_date: new Date("2023-10-01T10:00:00Z"), available_count: 1 },
      { start_date: new Date("2023-10-02T11:00:00Z"), available_count: 1 },
      { start_date: new Date("2023-10-03T12:00:00Z"), available_count: 1 },
    ]);
  });

  it("should handle an array with a single slot", () => {
    const slots: SlotEntity[] = [
      {
        id: 1,
        startDate: new Date("2023-10-01T10:00:00Z"),
        endDate: new Date("2023-10-01T11:00:00Z"),
        booked: false,
        salesManager: { id: 1 } as SalesManagerEntity,
      },
    ];

    const groupedSlots = groupAvailableSlots(slots);

    expect(groupedSlots).toEqual([
      { start_date: new Date("2023-10-01T10:00:00Z"), available_count: 1 },
    ]);
  });
});
