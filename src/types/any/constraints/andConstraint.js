"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const anySchema_1 = require("../anySchema");
const appolo_utils_1 = require("appolo-utils");
class AndConstraint {
    async validate(params) {
        let schemas = params.args[0], value = params.value;
        if (!Array.isArray(schemas)) {
            schemas = [schemas];
        }
        let results = await appolo_utils_1.Promises.someRejected(schemas.map((schema) => this._validateSchema(schema, value, params)), {
            fn: value => value.errors.length == 0
        });
        if (results.length == 0) {
            return { isValid: true };
        }
        let errors = results[0].reason.errors;
        return { isValid: false, errors };
    }
    _validateSchema(schema, value, params) {
        return params.validator.validate(schema, value, Object.assign(Object.assign({}, (params.validateOptions || {})), { object: params.object, property: params.property }));
    }
    get type() {
        return "and";
    }
    get defaultMessage() {
        return "${args.property} is not valid and condition";
    }
}
exports.AndConstraint = AndConstraint;
registerConstraint_1.registerConstraint.extend({
    base: anySchema_1.AnySchema,
    name: "and",
    constraint: AndConstraint,
    blackList: true
});
function and(schema) {
    return anySchema_1.any().and(schema);
}
exports.and = and;
//# sourceMappingURL=andConstraint.js.map