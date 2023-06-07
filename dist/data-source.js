"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Poll_1 = require("./entity/Poll");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "toluafo",
    database: "test-db",
    synchronize: true,
    logging: false,
    entities: [Poll_1.Poll],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map