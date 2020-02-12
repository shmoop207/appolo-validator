import {registerConstraint} from "../../schema/registerConstraint";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {Schema} from "../../schema/schema";
import {Promises} from "appolo-utils";
import {ValidationError} from "../../common/errors/ValidationError";
import {AnySchema} from "../../schema/types/anySchema";


export class ArrayConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = Array.isArray(args.value);

        if (!isValid) {
            return {isValid};
        }

        let schema = args.args[0] as AnySchema;

        if (!schema) {
            return {isValid}
        }

        let results = await Promises.map(args.value, (item, index) =>
            args.validator.validate(schema, item, {
                ...(args.validateOptions || {}),
                object: args.value,
                property: index
            }));

        let error = new ValidationError();


        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (result.error) {
                error.constraints.push(...result.error.constraints)
            } else {
                args.value[i] = result.value;
            }
        }

        if (error.constraints.length == 0) {
            return {isValid: true}
        }
        error.property = args.property;
        error.target = args.object;
        error.type = this.type;
        error.message = this.defaultMessage(args);

        return {isValid: false, error};
    }

    public get type(): string {
        return "array"
    }

    public defaultMessage(args: ValidationParams): string {
        return `is not a valid array`
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
