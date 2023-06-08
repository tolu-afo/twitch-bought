"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateManager = /** @class */ (function () {
    function StateManager() {
        this.state = {};
    }
    StateManager.prototype.get = function (k) {
        return this.state[k];
    };
    StateManager.prototype.add = function (k, v) {
        this.state[k] = v;
        return true;
    };
    return StateManager;
}());
exports.default = StateManager;
//# sourceMappingURL=StateManager.js.map