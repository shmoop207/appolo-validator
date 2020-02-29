"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("appolo-utils/index");
const defaults_1 = require("../../defaults/defaults");
const registerDecorator_1 = require("../../decorators/registerDecorator");
class AnySchema {
    constructor(options = {}) {
        this._constraints = [];
        this._converters = [];
        this._options = index_1.Objects.defaults({}, options, defaults_1.SchemaDefaults);
        this._type = "any";
        this._params = {};
    }
    get converter() {
        return null;
    }
    get params() {
        return this._params;
    }
    get constraints() {
        return this._constraints;
    }
    get converters() {
        return this._converters;
    }
    options(options) {
        this._options = Object.assign({}, this._options, options);
        return this;
    }
    getOptions() {
        return this._options;
    }
    addConstraint(schema) {
        this._constraints.push(schema);
        return this;
    }
    addConverter(schema, top = false) {
        top ? this._converters.unshift(schema) : this._converters.push(schema);
        return this;
    }
}
exports.AnySchema = AnySchema;
function any(options) {
    let schema = new AnySchema(options);
    return registerDecorator_1.registerDecorator.extend({ schema });
}
exports.any = any;
//# sourceMappingURL=anySchema.js.map