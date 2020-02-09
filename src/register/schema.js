"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_utils_1 = require("appolo-utils");
const appolo_engine_1 = require("appolo-engine");
const defaults_1 = require("../defaults/defaults");
let Schema = class Schema {
    constructor(options) {
        this._validators = [];
        this._schemaOptions = options;
    }
    addValidation(schema) {
        this._validators.push(schema);
        return this;
    }
    type(type) {
    }
    async validate(value, options = {}) {
        options = appolo_utils_1.Objects.defaults({}, options, this._schemaOptions, defaults_1.ValidateDefaults);
        let { error } = await this.schemaValidator.validate(value, this._validators, options);
        return { error, value };
    }
    async validateAndTrow(value, options) {
        let { error, value: resultValue } = await this.validate(value, options);
        if (error) {
            throw error;
        }
        return resultValue;
    }
};
tslib_1.__decorate([
    appolo_engine_1.inject()
], Schema.prototype, "schemaValidator", void 0);
Schema = tslib_1.__decorate([
    appolo_engine_1.define()
], Schema);
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map