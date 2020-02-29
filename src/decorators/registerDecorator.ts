import {AnySchema} from "../schema/types/anySchema";
import {ReflectMetadata,Objects} from "appolo-utils";
import {registerConstraint} from "../schema/registerConstraint";
import {registerConverter} from "../schema/registerConverter";

type DecoratorFn = (target: any, propertyKey: string, descriptor?: PropertyDescriptor | number) => void
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

        let extended: { name: string }[] = (registerConstraint.constraints.get(schema.constructor as typeof AnySchema) as { name: string }[])
            .concat(registerConstraint.constraints.get(AnySchema) as { name: string }[])
            .concat(registerConverter.converters.get(schema.constructor as typeof AnySchema) as { name: string }[])
            .concat(registerConverter.converters.get(AnySchema)).concat([{name:"options"}]);

        for (let i=0;i<extended.length ;i++) {
            let constraint = extended[i];
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
