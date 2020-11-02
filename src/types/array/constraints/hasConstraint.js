"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainsConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const arraySchema_1 = require("../arraySchema");
const utils_1 = require("@appolo/utils");
class ContainsConstraint {
    async validate(params) {
        let schema = params.args[0];
        let promises = params.value.map((item, i) => {
            return params.validator.validate(schema, item, Object.assign(Object.assign({}, (params.validateOptions || {})), { object: params.value, property: i }));
        });
        let result = await utils_1.Promises.someResolved(promises, { fn: value => value.errors.length == 0 });
        return { isValid: result.length > 0 };
    }
    get type() {
        return "Contains";
    }
    get defaultMessage() {
        return "${property} has invalid array values";
    }
}
exports.ContainsConstraint = ContainsConstraint;
registerConstraint_1.registerConstraint.extend({
    base: arraySchema_1.ArraySchema,
    name: "has",
    constraint: ContainsConstraint
});
//# sourceMappingURL=hasConstraint.js.map