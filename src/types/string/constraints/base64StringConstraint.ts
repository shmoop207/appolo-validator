import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ArraySchema} from "../../array/arraySchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {ArrayConstraint} from "../../array/constraints/arrayConstraint";
import {StringSchema} from "../stringSchema";


export class Base64StringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {
        const value = params.value as string;
        const len = value.length;
        if (!len || len % 4 !== 0 || /[^A-Z0-9+\/=]/i.test(value)) {
            return {isValid: false};
        }

        const firstPaddingChar = value.indexOf('=');
        let isValid = firstPaddingChar === -1 ||
            firstPaddingChar === len - 1 ||
            (firstPaddingChar === len - 2 && value[len - 1] === '=');

        return {isValid};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid base64 string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "base64",
    constraint: Base64StringConstraint
});

declare module '../stringSchema' {

    interface StringSchema {
        base64(options?: IConstraintOptions): this;
    }
}
