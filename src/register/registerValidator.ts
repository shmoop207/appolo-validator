import {IValidationClass} from "../validators/IValidator";
import {IValidationSchema,Schema} from "./schema";
import {Util} from "appolo-utils"


export class RegisterValidator {

    public extend(name, fn: (this: Schema, ...args: any[]) => Schema) {
        Schema.prototype[name] = fn;
    }

    public register(validator: Schema, schema: IValidationSchema) {

        validator.addValidation(schema);
        return validator;
    }
}

export const registerValidator = new RegisterValidator();
