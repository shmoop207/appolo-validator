"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const objectSchema_1 = require("../objectSchema");
const utils_1 = require("@appolo/utils");
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
        let results = await utils_1.Promises.map(keys, key => this._validateProperty(schemasIndex, key, args, { convertOnly: true }));
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
            else if (args.validateOptions.stripUnknown && (!schemasIndex[key] || result.invalidGroup)) {
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
        let schem = args.validator.getSchema(schema);
        let constraintOptions = schem.getConstraintOptions();
        if (this._checkForInValidGroup(constraintOptions.groups, args.validateOptions.groups)) {
            return { errors: [], value: value, invalidGroup: true };
        }
        let result = await args.validator.validate(schem, value, Object.assign(Object.assign({}, (args.validateOptions || {})), { object: args.value, property: key, validateOnly: runTypes.validateOnly, convertOnly: runTypes.convertOnly }));
        if (runTypes.convertOnly && result.value != undefined) {
            args.value[key] = result.value;
        }
        return result;
    }
    _checkForInValidGroup(constraintGroups, validatorGroups) {
        return (constraintGroups
            && constraintGroups.length
            && validatorGroups
            && validatorGroups.length
            && !constraintGroups.every(group => validatorGroups.indexOf(group) > -1));
    }
    get type() {
        return "IsObject";
    }
    get defaultMessage() {
        return "${property} has invalid keys";
    }
}
exports.KeysConstraint = KeysConstraint;
registerConstraint_1.registerConstraint
    .extend({
    base: objectSchema_1.ObjectSchema,
    name: "keys",
    constraint: KeysConstraint
});
//# sourceMappingURL=keysConstraint.js.map