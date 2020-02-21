"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
const ValidationError_1 = require("../../common/errors/ValidationError");
class ArrayConstraint {
    async validate(args) {
        let isValid = Array.isArray(args.value);
        if (!isValid) {
            return { isValid };
        }
        let schema = args.args[0];
        if (!schema) {
            return { isValid };
        }
        let results = await appolo_utils_1.Promises.map(args.value, (item, index) => args.validator.validate(schema, item, Object.assign(Object.assign({}, (args.validateOptions || {})), { object: args.value, property: index })));
        let error = new ValidationError_1.ValidationError();
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (result.errors && result.errors.length) {
                error.constraints.push(...result.errors);
            }
            else {
                args.value[i] = result.value;
            }
        }
        if (error.constraints.length == 0) {
            return { isValid: true };
        }
        error.property = args.property;
        error.target = args.object;
        error.type = this.type;
        error.message = this.defaultMessage(args);
        return { isValid: false, error };
    }
    get type() {
        return "array";
    }
    defaultMessage(args) {
        return `is not a valid array`;
    }
}
exports.ArrayConstraint = ArrayConstraint;
// registerConstraint.extend("isArray", function (schema?: Schema, options?: IConstraintOptions) {
//     return registerConstraint.register(this, {
//         options: options,
//         args: schema ? [schema] : [],
//         constraint: IsArray
//     })
// });
//
// declare module '../../schema/schema' {
//     interface Schema {
//         isArray(schema?: Schema, options?: IConstraintOptions): this;
//     }
// }
// export function isNumber(): ((target: any, propertyKey: string, descriptor?: PropertyDescriptor) => any) & Schema {
//     let schema = schema()
//
//     let fn = function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         console.log(fn)
//     }
//
//     fn["@schema"] = schema;
//
//     Object.keys(schema.constructor.prototype).forEach(key => {
//         fn[key] = function () {
//             fn["@schema"][key].apply(fn["@schema"], arguments);
//             return fn;
//         }
//     })
//
//     return fn as any;
//
// }
//# sourceMappingURL=arrayConstraint.js.map