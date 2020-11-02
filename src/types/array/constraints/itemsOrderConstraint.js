"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsOrderConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const arraySchema_1 = require("../arraySchema");
const utils_1 = require("@appolo/utils");
const itemsConstraint_1 = require("./itemsConstraint");
class ItemsOrderConstraint {
    async validate(params) {
        let schemas = params.args[0];
        if (params.value.length != schemas.length) {
            return { isValid: false };
        }
        let results = await utils_1.Promises.map(schemas, (schema, i) => {
            return params.validator.validate(schema, params.value[i], Object.assign(Object.assign({}, (params.validateOptions || {})), { object: params.value, property: i }));
        });
        let errors = itemsConstraint_1.ItemsConstraint.handleErrors(params, results);
        return { isValid: errors.length == 0, errors };
    }
    get type() {
        return "itemsOrder";
    }
    get defaultMessage() {
        return "${property} has invalid array values";
    }
}
exports.ItemsOrderConstraint = ItemsOrderConstraint;
registerConstraint_1.registerConstraint.extend({
    base: arraySchema_1.ArraySchema,
    name: "order",
    constraint: ItemsOrderConstraint
});
//# sourceMappingURL=itemsOrderConstraint.js.map