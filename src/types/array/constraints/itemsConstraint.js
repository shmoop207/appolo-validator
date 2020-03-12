"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const appolo_utils_1 = require("appolo-utils");
const anySchema_1 = require("../../any/anySchema");
const arraySchema_1 = require("../arraySchema");
class ItemsConstraint {
    async validate(params) {
        let schema = params.args[0];
        if (Array.isArray(schema)) {
            schema = anySchema_1.any().or(schema);
        }
        let results = await appolo_utils_1.Promises.map(params.value, (item, index) => params.validator.validate(schema, item, Object.assign(Object.assign({}, (params.validateOptions || {})), { validateOnly: false, convertOnly: false, object: params.value, property: index })));
        let errors = ItemsConstraint.handleErrors(params, results);
        return { isValid: errors.length == 0, errors };
    }
    static handleErrors(params, results) {
        let errors = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (result.errors && result.errors.length) {
                errors.push(...result.errors);
                if (params.object) {
                    for (let j = 0; j < result.errors.length; j++) {
                        result.errors[j].addParent({ property: params.property, object: params.object });
                    }
                }
            }
            else {
                params.value[i] = result.value;
            }
        }
        return errors;
    }
    get type() {
        return "array";
    }
    get defaultMessage() {
        return "${property} has invalid array items";
    }
}
exports.ItemsConstraint = ItemsConstraint;
registerConstraint_1.registerConstraint.extend({
    base: arraySchema_1.ArraySchema,
    name: "items",
    constraint: ItemsConstraint
});
//# sourceMappingURL=itemsConstraint.js.map