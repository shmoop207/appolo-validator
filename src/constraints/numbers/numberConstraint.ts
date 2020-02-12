import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";



export class NumberConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let options = args.options, value = args.value;

        if (typeof args.value !== "number") {
            return {isValid: false};
        }

        return {isValid: Number.isFinite(value)};
    }

    public get type(): string {
        return "number"
    }

    public defaultMessage(args: ValidationParams): string {
        return `${args.value} is not a number`
    }
}
