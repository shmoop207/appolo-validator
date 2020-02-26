"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../schema/registerConstraint");
const appolo_utils_1 = require("appolo-utils");
const anySchema_1 = require("../../schema/types/anySchema");
const arraySchema_1 = require("../../schema/types/arraySchema");
class ItemsConstraint {
    async validate(args) {
        let schema = args.args[0];
        if (Array.isArray(schema)) {
            schema = anySchema_1.any().or(schema);
        }
        let results = await appolo_utils_1.Promises.map(args.value, (item, index) => args.validator.validate(schema, item, Object.assign(Object.assign({}, (args.validateOptions || {})), { object: args.value, property: index })));
        let errors = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (result.errors && result.errors.length) {
                errors.push(...result.errors);
                if (args.object) {
                    for (let j = 0; j < result.errors.length; j++) {
                        result.errors[j].addParent({ property: args.property, object: args.object });
                    }
                }
            }
            else {
                args.value[i] = result.value;
            }
        }
        if (errors.length == 0) {
            return { isValid: true };
        }
        return { isValid: false, errors };
    }
    get type() {
        return "array";
    }
    defaultMessage(args) {
        return `is not a valid array`;
    }
}
exports.ItemsConstraint = ItemsConstraint;
registerConstraint_1.registerConstraint.extend({
    base: arraySchema_1.ArraySchema,
    name: "items",
    constraint: ItemsConstraint
});
//# sourceMappingURL=itemsConstraint.js.map