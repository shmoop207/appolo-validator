"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../schema/registerConstraint");
const anySchema_1 = require("../../schema/types/anySchema");
class OrConstraint {
    async validate(params) {
        let schemas = params.args[0], value = params.value;
        if (!Array.isArray(schemas)) {
            schemas = [schemas];
        }
        let results = await Promise.all(schemas.map((schema) => this._validateSchema(schema, value, params)));
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (result.errors.length == 0) {
                return { isValid: true, value: result.value };
            }
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
//# sourceMappingURL=orConstraint.js.map