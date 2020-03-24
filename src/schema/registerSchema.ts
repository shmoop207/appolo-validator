import {AnySchema} from "../types/any/anySchema";
import {DecoratorFn, PropertySymbol, registerDecorator} from "../decorators/registerDecorator";
import {IConstraintOptions} from "../interfaces/IConstraintOptions";


interface IExtendParams {
    type: typeof AnySchema,
    options: IConstraintOptions
}


export class RegisterSchema {

    public extend<T extends AnySchema>(params: IExtendParams): DecoratorFn & T {

        let schema = new params.type(params.options || {});

        let fn = registerDecorator.extend<T>({schema});

        return fn as DecoratorFn & T
    }
}

export const registerSchema = new RegisterSchema();
