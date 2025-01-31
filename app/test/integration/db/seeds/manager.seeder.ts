import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SalesManagerEntity } from "../../../../src/db/entities/salesManagerEntity";

export default class ManagerSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const entityManager = dataSource.manager;

    await entityManager.getRepository(SalesManagerEntity).save([
      {
        id: 1,
        name: "Manager 1",
        languages: ["English", "German"],
        customerRatings: ["Gold", "Silver"],
        products: ["SolarPanels", "Heatpumps"],
      },
      {
        id: 2,
        name: "Manager 2",
        languages: ["German"],
        customerRatings: ["Silver"],
        products: ["Heatpumps"],
      },
      {
        id: 3,
        name: "Manager 3",
        languages: ["English"],
        customerRatings: ["Gold"],
        products: ["SolarPanels"],
      },
    ]);
  }
}
