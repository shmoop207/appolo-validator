"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("appolo-utils/index");
const ValidationError_1 = require("../../common/errors/ValidationError");
class ObjectConstraint {
    async validate(args) {
        let isValid = index_1.Objects.isPlain(args.value);
        if (!isValid) {
            return { isValid };
        }
        let schemasIndex = args.args[0];
        let keys = [...new Set(Object.keys(args.value).concat(Object.keys(schemasIndex)))];
        let results = await index_1.Promises.map(keys, key => this._validateProperty(schemasIndex, key, args));
        let error = new ValidationError_1.ValidationError();
        for (let i = 0; i < results.length; i++) {
            let result = results[i], key = keys[i];
            if (result.errors && result.errors.length) {
                error.constraints.push(...result.errors);
            }
            else if (!schemasIndex[key] && args.validateOptions.stripUnknown) {
                delete args.value[key];
            }
            else if (args.value[key]) {
                args.value[key] = result.value;
            }
        }
        if (error.constraints.length == 0) {
            return { isValid: true };
        }
        error.message = this.defaultMessage(args);
        error.property = args.property;
        error.target = args.object;
        error.type = this.type;
        return { isValid: false, error };
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
        return `is not a valid object`;
    }
}
exports.ObjectConstraint = ObjectConstraint;
//# sourceMappingURL=objectConstraint.js.map