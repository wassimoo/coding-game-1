/**
 * Data source for the application.
 * We set synchronize option to false and no migrations to avoid database schema changes
 */

import { DataSource } from "typeorm";
import { SalesManagerEntity } from "./entities/salesManagerEntity";
import { SlotEntity } from "./entities/slotEntity";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT ?? 5432) as number,
  schema: process.env.NODE_ENV === "test" ? "integration_tests" : "public",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  migrations: [],
  logging: false,
  entities: [SalesManagerEntity, SlotEntity],
});
