import {AnySchema} from "../schema/types/anySchema";
import {ReflectMetadata, Objects} from "appolo-utils";
import {registerConstraint} from "../constraints/registerConstraint";
import {registerConverter} from "../converters/registerConverter";

export type DecoratorFn = (target: any, propertyKey: string, descriptor?: PropertyDescriptor | number) => void
export const PropertySymbol = "__PropertySymbol__";
export const SchemaFnSymbol = "@schema";

export class RegisterDecorator {


    public extend<T extends AnySchema>(params: { schema: AnySchema }): DecoratorFn & T {

        let {schema} = params;

        let fn = function (this: AnySchema, target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            let validations = ReflectMetadata.getNestedMetadata<{ [index: string]: AnySchema }>(PropertySymbol, target, {});
            validations[propertyKey] = schema;
        };

        fn[SchemaFnSymbol] = schema;

        let schemaProto = Object.getPrototypeOf(schema);
        let fnNames = [{name: "options"}];

        while (schemaProto) {
            fnNames.push(...registerConstraint.constraints.get(schemaProto.constructor) || []);
            fnNames.push(...registerConverter.converters.get(schemaProto.constructor)||[]);
            schemaProto = Object.getPrototypeOf(schemaProto)
        }
        for (let i = 0; i < fnNames.length; i++) {
            let constraint = fnNames[i];
            fn[constraint.name] = function () {
                let schema = fn[SchemaFnSymbol];
                schema[constraint.name].apply(schema, arguments);
                return fn;
            }
        }


        return fn as any;

    }
}


export const registerDecorator = new RegisterDecorator();
