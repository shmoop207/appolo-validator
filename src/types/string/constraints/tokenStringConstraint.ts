import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {StringSchema} from "../stringSchema";

export class TokenStringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {
        const value: string = params.value;

        let regex = /^[a-zA-Z0-9_\-]+$/;

        return {isValid: typeof value == "string" && regex.test(value)};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid token string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "token",
    constraint: TokenStringConstraint
});

declare module '../stringSchema' {

    interface StringSchema {
        token(options?: IConstraintOptions): this;
    }
}
