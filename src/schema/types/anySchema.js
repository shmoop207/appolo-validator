"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("appolo-utils/index");
const defaults_1 = require("../../defaults/defaults");
class AnySchema {
    constructor(validationOptions = {}, schemaOptions = {}) {
        this._constraints = [];
        this._options = index_1.Objects.defaults({}, schemaOptions, defaults_1.SchemaDefaults);
        this._type = "any";
        this._params = {};
    }
    get params() {
        return this._params;
    }
    get constraints() {
        return this._constraints;
    }
    get options() {
        return this._options;
    }
    addConstraint(schema) {
        this._constraints.push(schema);
        return this;
    }
    async convert(value) {
        return value;
    }
}
exports.AnySchema = AnySchema;
//# sourceMappingURL=anySchema.js.map