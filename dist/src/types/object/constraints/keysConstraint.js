"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
const appolo_utils_1 = require("appolo-utils");
const registerDecorator_1 = require("../../../decorators/registerDecorator");
class KeysConstraint {
    async validate(args) {
        if (!args.value) {
            return { isValid: false };
        }
        let schemasIndex = args.args[0];
        if (typeof schemasIndex == "function") {
            let meta = Reflect.getMetadata(registerDecorator_1.PropertySymbol, schemasIndex.prototype);
            if (!meta) {
                throw new Error("invalid schema");
            }
            schemasIndex = meta;
        }
        let keys = [...new Set(Object.keys(args.value || {}).concat(Object.keys(schemasIndex)))];
        let results = await appolo_utils_1.Promises.map(keys, key => this._validateProperty(schemasIndex, key, args, { convertOnly: true }));
        results = await Promise.all(keys.map(key => this._validateProperty(schemasIndex, key, args, { validateOnly: true })));
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
        }
        if (errors.length == 0) {
            return { isValid: true };
        }
        return { isValid: false, errors };
    }
    async _validateProperty(schemasIndex, key, args, runTypes = {}) {
        let schema = schemasIndex[key], value = args.value[key];
        if (!schema) {
            return { errors: [], value: value };
        }
        let result = await args.validator.validate(schema, value, Object.assign(Object.assign({}, (args.validateOptions || {})), { object: args.value, property: key, validateOnly: runTypes.validateOnly, convertOnly: runTypes.convertOnly }));
        if (runTypes.convertOnly && result.value != undefined) {
            args.value[key] = result.value;
        }
        return result;
    }
    get type() {
        return "IsObject";
    }
    get defaultMessage() {
        return "${property} has invalid keys";
    }
}
exports.KeysConstraint = KeysConstraint;
registerConstraint_1.registerConstraint.extend({
    base: objectSchema_1.ObjectSchema,
    name: "keys",
    constraint: KeysConstraint
});
//# sourceMappingURL=keysConstraint.js.map