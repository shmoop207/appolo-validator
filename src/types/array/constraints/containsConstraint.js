"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
const registerConstraint_1 = require("../../../schema/registerConstraint");
const arraySchema_1 = require("../arraySchema");
class ContainsConstraint {
    validate(params) {
        let values = appolo_utils_1.Arrays.arrayify(params.args[0]);
        for (let i = 0; i < params.value.length; i++) {
            let result;
            result = values.every(value => {
                if (typeof params.args[0] == "function") {
                    return params.args[0](params.value[i]);
                }
                else {
                    return params.value[i] === params.args[0];
                }
            });
            if (result) {
                return { isValid: true };
            }
        }
        return { isValid: false };
    }
    get type() {
        return "Contains";
    }
    get defaultMessage() {
        return "${property} has invalid values";
    }
}
exports.ContainsConstraint = ContainsConstraint;
registerConstraint_1.registerConstraint.extend({
    base: arraySchema_1.ArraySchema,
    name: "contains",
    constraint: ContainsConstraint
});
// declare module '../../../../index' {
//
//
//     interface ArraySchema {
//         contains(item: any | Ref, options?: IConstraintOptions): this;
//     }
// }
//# sourceMappingURL=containsConstraint.js.map