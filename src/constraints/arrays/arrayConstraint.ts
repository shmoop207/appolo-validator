import {registerConstraint} from "../../schema/registerConstraint";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";



export class ArrayConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = Array.isArray(args.value);

        return {isValid};
    }

    public get type(): string {
        return "array"
    }

    public defaultMessage(args: ValidationParams): string {
        return `value is not a valid array`
    }
}




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
