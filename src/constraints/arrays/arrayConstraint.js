"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayConstraint {
    async validate(args) {
        let isValid = Array.isArray(args.value);
        return { isValid };
    }
    get type() {
        return "array";
    }
    defaultMessage(args) {
        return `value is not a valid array`;
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
// export function isNumber(): ((object: any, propertyKey: string, descriptor?: PropertyDescriptor) => any) & Schema {
//     let schema = schema()
//
//     let fn = function (object: any, propertyKey: string, descriptor: PropertyDescriptor) {
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