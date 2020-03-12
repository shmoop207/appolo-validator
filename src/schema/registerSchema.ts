import {AnySchema} from "../types/any/anySchema";
import {DecoratorFn, PropertySymbol, registerDecorator} from "../decorators/registerDecorator";
import {IConstraintOptions} from "../interfaces/IConstraintOptions";


interface IExtendParams {
    type: typeof AnySchema,
    options: IConstraintOptions
}

type Omited =
    "context"
    | "constraints"
    | "converters"
    | "contexts"
    | "getContext"
    | "getOptions"
    | "addConstraint"
    | "addConverter"
    | "addContext"

export type Schema = Omit<AnySchema, Omited>

export class RegisterSchema {

    public extend<T extends Schema>(params: IExtendParams): Omit<DecoratorFn & T, Omited> {

        let schema = new params.type(params.options || {});

        let fn = registerDecorator.extend<T>({schema});

        return fn as Omit<DecoratorFn & T, Omited>
    }
}

export const registerSchema = new RegisterSchema();
