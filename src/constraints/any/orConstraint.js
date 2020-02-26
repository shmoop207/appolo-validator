"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../schema/registerConstraint");
const anySchema_1 = require("../../schema/types/anySchema");
const appolo_utils_1 = require("appolo-utils");
class OrConstraint {
    async validate(params) {
        let schemas = params.args[0], value = params.value;
        if (!Array.isArray(schemas)) {
            schemas = [schemas];
        }
        let results = await appolo_utils_1.Promises.someResolved(schemas.map((schema) => this._validateSchema(schema, value, params)), {
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
    defaultMessage(args) {
        return `${args.property || args.value} is required`;
    }
}
exports.OrConstraint = OrConstraint;
registerConstraint_1.registerConstraint.extend({
    base: anySchema_1.AnySchema,
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