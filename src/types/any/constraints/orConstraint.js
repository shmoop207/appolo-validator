"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.or = exports.OrConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const __1 = require("../../../../");
const utils_1 = require("@appolo/utils");
class OrConstraint {
    async validate(params) {
        let schemas = params.args[0], value = params.value;
        if (!Array.isArray(schemas)) {
            schemas = [schemas];
        }
        let results = await utils_1.Promises.someResolved(schemas.map((schema) => this._validateSchema(schema, value, params)), {
            fn: value => value.errors.length == 0
        });
        if (results.length > 0) {
            return { isValid: true, value: results[0].value.value };
        }
        return { isValid: false };
    }
    _validateSchema(schema, value, params) {
        return params.validator.validate(schema, value, Object.assign(Object.assign({}, (params.validateOptions || {})), { object: params.object, property: params.property }));
    }
    get type() {
        return "or";
    }
    get defaultMessage() {
        return "";
    }
}
exports.OrConstraint = OrConstraint;
registerConstraint_1.registerConstraint.extend({
    base: __1.AnySchema,
    name: "or",
    constraint: OrConstraint,
    whiteList: true
});
function or(schema) {
    if (Array.isArray(schema)) {
        let [first, ...rest] = schema;
        return first.or(rest);
    }
    return schema;
}
exports.or = or;
//# sourceMappingURL=orConstraint.js.map