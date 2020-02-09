import {registerValidator} from "../register/registerValidator";
import {IValidator, ValidationArguments} from "./IValidator";
import {IValidationOptions} from "../register/validatorOptions";

export interface INumberValidatorOptions {
    allowInfinity?: boolean
    allowNaN?: boolean
}

export class IsNumberValidator implements IValidator {

    public async validate(args: ValidationArguments): Promise<boolean> {

        let options = args.options as INumberValidatorOptions, value = args.value;

        if (typeof args.value !== "number") {
            return false;
        }

        if (options.allowInfinity && (args.value === Infinity || args.value === -Infinity)) {
            return true;
        }

        if (options.allowNaN && Number.isNaN(args.value)) {
            return true;
        }

        return Number.isFinite(value);
    }

    public get name():string {
        return "IsNumber"
    }

    public defaultMessage(args: ValidationArguments): string {
        return `${args.value} is not a number`
    }
}


registerValidator.extend("isNumber", function (options: IValidationOptions & { allowInfinity: boolean }) {
    return registerValidator.register(this, {options: options, validationClass: IsNumberValidator})
});

declare module '../register/schema' {
    interface Schema {
        isNumber(options?: IValidationOptions): this;
    }
}
