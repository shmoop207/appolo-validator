import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {StringSchema} from "../stringSchema";

export class UuidStringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {
        const value: string = params.value;

        let regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i

        return {isValid: typeof value == "string" && regex.test(value)};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid uuid string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "uuid",
    constraint: UuidStringConstraint
});

declare module '../stringSchema' {

    interface StringSchema {
        uuid(options?: IConstraintOptions): this;
    }
}
