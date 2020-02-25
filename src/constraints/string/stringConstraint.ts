import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";


export class StringConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let options = args.options, value = args.value;

        if (typeof args.value !== "string") {
            return {isValid: false};
        }

        return {isValid: true};
    }

    public get type(): string {
        return "string"
    }

    public defaultMessage(args: ValidationParams): string {
        return `${args.value} is not a string`
    }
}
