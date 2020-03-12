"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaults_1 = require("../../defaults/defaults");
const registerSchema_1 = require("../../schema/registerSchema");
const appolo_utils_1 = require("appolo-utils");
class AnySchema {
    constructor(options = {}) {
        this._constraints = [];
        this._converters = [];
        this._contexts = [];
        this._options = appolo_utils_1.Objects.defaults({}, defaults_1.SchemaDefaults);
        this._type = "any";
        this._context = {};
    }
    get context() {
        return this._context;
    }
    get constraints() {
        return this._constraints;
    }
    get converters() {
        return this._converters;
    }
    get contexts() {
        return this._contexts;
    }
    options(options) {
        this._options = Object.assign({}, this._options, options);
        return this;
    }
    getContext(name) {
        return this._contexts[name];
    }
    setContext(name, value) {
        this._contexts[name] = value;
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
    addContext(schema, top = false) {
        top ? this._contexts.unshift(schema) : this._contexts.push(schema);
        return this;
    }
}
exports.AnySchema = AnySchema;
function any(options) {
    return registerSchema_1.registerSchema.extend({ type: AnySchema, options });
}
exports.any = any;
//# sourceMappingURL=anySchema.js.map