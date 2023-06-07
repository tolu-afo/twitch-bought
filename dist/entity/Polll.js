"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poll = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
exports.Poll = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _question_decorators;
    let _question_initializers = [];
    let _option1_decorators;
    let _option1_initializers = [];
    let _option2_decorators;
    let _option2_initializers = [];
    let _count1_decorators;
    let _count1_initializers = [];
    let _count2_decorators;
    let _count2_initializers = [];
    var Poll = _classThis = class {
        constructor() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.question = __runInitializers(this, _question_initializers, void 0);
            this.option1 = __runInitializers(this, _option1_initializers, void 0);
            this.option2 = __runInitializers(this, _option2_initializers, void 0);
            this.count1 = __runInitializers(this, _count1_initializers, void 0);
            this.count2 = __runInitializers(this, _count2_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "Poll");
    (() => {
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _question_decorators = [(0, typeorm_1.Column)()];
        _option1_decorators = [(0, typeorm_1.Column)()];
        _option2_decorators = [(0, typeorm_1.Column)()];
        _count1_decorators = [(0, typeorm_1.Column)()];
        _count2_decorators = [(0, typeorm_1.Column)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } } }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _question_decorators, { kind: "field", name: "question", static: false, private: false, access: { has: obj => "question" in obj, get: obj => obj.question, set: (obj, value) => { obj.question = value; } } }, _question_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _option1_decorators, { kind: "field", name: "option1", static: false, private: false, access: { has: obj => "option1" in obj, get: obj => obj.option1, set: (obj, value) => { obj.option1 = value; } } }, _option1_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _option2_decorators, { kind: "field", name: "option2", static: false, private: false, access: { has: obj => "option2" in obj, get: obj => obj.option2, set: (obj, value) => { obj.option2 = value; } } }, _option2_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _count1_decorators, { kind: "field", name: "count1", static: false, private: false, access: { has: obj => "count1" in obj, get: obj => obj.count1, set: (obj, value) => { obj.count1 = value; } } }, _count1_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _count2_decorators, { kind: "field", name: "count2", static: false, private: false, access: { has: obj => "count2" in obj, get: obj => obj.count2, set: (obj, value) => { obj.count2 = value; } } }, _count2_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Poll = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Poll = _classThis;
})();
