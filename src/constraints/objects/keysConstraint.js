"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("appolo-utils/index");
const registerConstraint_1 = require("../../schema/registerConstraint");
const objectSchema_1 = require("../../schema/types/objectSchema");
class KeysConstraint {
    async validate(args) {
        let schemasIndex = args.args[0];
        let keys = [...new Set(Object.keys(args.value).concat(Object.keys(schemasIndex)))];
        let results = await index_1.Promises.map(keys, key => this._validateProperty(schemasIndex, key, args));
        //let error = new ValidationError();
        let errors = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i], key = keys[i];
            if (result.errors && result.errors.length) {
                errors.push(...result.errors);
                if (args.object) {
                    for (let j = 0; j < result.errors.length; j++) {
                        result.errors[j].addParent({ property: args.property, object: args.object });
                    }
                }
            }
            else if (!schemasIndex[key] && args.validateOptions.stripUnknown) {
                delete args.value[key];
            }
            else if (result.value !== undefined) {
                args.value[key] = result.value;
            }
        }
        if (errors.length == 0) {
            return { isValid: true };
        }
        return { isValid: false, errors };
    }
    async _validateProperty(schemasIndex, key, args) {
        let schema = schemasIndex[key], value = args.value[key];
        if (!schema) {
            return { errors: [], value: value };
        }
        return args.validator.validate(schema, value, Object.assign(Object.assign({}, (args.validateOptions || {})), { object: args.value, property: key }));
    }
    get type() {
        return "IsObject";
    }
    defaultMessage(args) {
        return `have in valid object keys`;
    }
}
exports.KeysConstraint = KeysConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "keys",
    constraint: KeysConstraint
});
//# sourceMappingURL=keysConstraint.js.map