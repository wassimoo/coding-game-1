import { AppDataSource } from "./dataSource";
import { runSeeders } from "typeorm-extension";
require("ts-node/register");

process.env.LOG_LEVEL = "error";
const init = async () => {
  const dataSource = AppDataSource;
  const connection = await dataSource.initialize();

  await connection.manager.query(`
    DROP TABLE IF EXISTS slots, sales_managers CASCADE;
  `);

  await dataSource.destroy();

  await dataSource.initialize();

  await runSeeders(dataSource);

  await connection.destroy();
};

export default init;
