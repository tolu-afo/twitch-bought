import "reflect-metadata"
import { DataSource } from "typeorm"
import { Poll } from "./entity/Poll"
import authConfig from "./auth.config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: authConfig.db_host,
    port: 5432,
    username: authConfig.db_username,
    password: authConfig.db_password,
    database: authConfig.db_name,
    synchronize: true,
    logging: false,
    entities: [Poll],
    migrations: [],
    subscribers: [],
})
