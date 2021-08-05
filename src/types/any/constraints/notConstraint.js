"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.not = exports.NotConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const anySchema_1 = require("../anySchema");
const ValidationError_1 = require("../../../common/errors/ValidationError");
class NotConstraint {
    async validate(params) {
        let schema = params.args[0], value = params.value;
        let result = await params.validator.validate(schema, value, Object.assign(Object.assign({}, (params.validateOptions || {})), { object: params.object, property: params.property }));
        if (result.errors.length == 0) {
            return { isValid: false, errors: [new ValidationError_1.ValidationError(`${params.property} invalid not condition`)] };
        }
        return { isValid: true };
    }
    _validateSchema(schema, value, params) {
        return params.validator.validate(schema, value, Object.assign(Object.assign({}, (params.validateOptions || {})), { object: params.object, property: params.property }));
    }
    get type() {
        return "not";
    }
    get defaultMessage() {
        return "${args.property} is not valid and condition";
    }
}
exports.NotConstraint = NotConstraint;
registerConstraint_1.registerConstraint.extend({
    base: anySchema_1.AnySchema,
    name: "not",
    constraint: NotConstraint,
    blackList: true
});
function not(schema) {
    return anySchema_1.any().not(schema);
}
exports.not = not;
//# sourceMappingURL=notConstraint.js.map