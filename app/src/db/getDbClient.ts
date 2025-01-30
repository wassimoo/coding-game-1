import { DataSource } from "typeorm";
import { AppDataSource } from "./dataSource";

let dataSource: DataSource;

export const getDbClient = async () => {
  if (!dataSource) {
    dataSource = AppDataSource;

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
  }

  return dataSource;
};
