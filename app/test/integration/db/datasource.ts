import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { SalesManagerEntity } from "../../../src/db/entities/salesManagerEntity";
import { SlotEntity } from "../../../src/db/entities/slotEntity";
import { SeederOptions } from "typeorm-extension";
import ManagerSeeder from "./seeds/manager.seeder";
import SlotsSeeder from "./seeds/slots.seeder";

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT ?? 5432) as number,
  schema: 'integration_tests',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [SalesManagerEntity, SlotEntity],
  seeds: [ManagerSeeder, SlotsSeeder],
};

export const AppDataSource: DataSource = new DataSource(options);
