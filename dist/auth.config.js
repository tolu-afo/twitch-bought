"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    oauth_token: process.env.BONGO_OAUTH_TOKEN,
    db_host: process.env.DB_HOST,
    db_username: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    debug: (process.env.DEBUG === 'true') ? true : false
};
//# sourceMappingURL=auth.config.js.map