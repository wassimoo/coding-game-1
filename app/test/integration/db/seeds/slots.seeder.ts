import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SlotEntity } from "../../../../src/db/entities/slotEntity";

export default class SlotsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const entityManager = dataSource.manager;

    await entityManager.getRepository(SlotEntity).save([
      {
        id: 1,
        startDate: new Date("2023-10-01T08:00:00Z"),
        endDate: new Date("2023-10-01T10:00:00Z"),
        booked: false,
        salesManager: { id: 1 },
      },
      {
        id: 2,
        startDate: new Date("2023-10-02T08:00:00Z"),
        endDate: new Date("2023-10-02T10:00:00Z"),
        booked: true,
        salesManager: { id: 2 },
      },
      {
        id: 3,
        startDate: new Date("2023-10-03T08:00:00Z"),
        endDate: new Date("2023-10-03T10:00:00Z"),
        booked: false,
        salesManager: { id: 3 },
      },
      {
        id: 4,
        startDate: new Date("2023-10-04T08:00:00Z"),
        endDate: new Date("2023-10-04T10:00:00Z"),
        booked: true,
        salesManager: { id: 1 },
      },
      {
        id: 5,
        startDate: new Date("2023-10-05T08:00:00Z"),
        endDate: new Date("2023-10-05T10:00:00Z"),
        booked: false,
        salesManager: { id: 2 },
      },
    ]);
  }
}
