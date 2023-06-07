import "reflect-metadata"
import { DataSource } from "typeorm"
import { Poll } from "./entity/Poll"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "toluafo",
    database: "test-db",
    synchronize: true,
    logging: false,
    entities: [Poll],
    migrations: [],
    subscribers: [],
})
