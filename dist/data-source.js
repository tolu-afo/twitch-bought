"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Poll_1 = require("./entity/Poll");
var auth_config_1 = require("./auth.config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: auth_config_1.default.db_host,
    port: 5432,
    username: auth_config_1.default.db_username,
    password: auth_config_1.default.db_password,
    database: auth_config_1.default.db_name,
    synchronize: true,
    logging: false,
    entities: [Poll_1.Poll],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map