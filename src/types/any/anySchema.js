"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.any = exports.AnySchema = void 0;
const defaults_1 = require("../../defaults/defaults");
const registerSchema_1 = require("../../schema/registerSchema");
const utils_1 = require("@appolo/utils");
class AnySchema {
    constructor(constraintOptions = {}) {
        this._constraints = [];
        this._converters = [];
        this._contexts = [];
        this._options = utils_1.Objects.defaults({}, defaults_1.SchemaDefaults);
        this._type = "any";
        this._context = {};
        this._constraintOptions = constraintOptions || {};
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
    groups(group) {
        group = utils_1.Arrays.arrayify(group);
        this._constraintOptions.groups = group;
        this._constraints.forEach(constraint => constraint.options.groups = group);
        return this;
    }
    runIf(fn) {
        this._constraintOptions.runIf = fn;
        this._constraints.forEach(constraint => constraint.options.runIf = fn);
        return this;
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
    getConstraintOptions() {
        return this._constraintOptions;
    }
    addConstraint(schema) {
        schema.options = Object.assign({}, this._constraintOptions, schema.options);
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