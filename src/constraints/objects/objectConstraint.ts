import {Objects, Promises} from "appolo-utils/index";
import {AnySchema} from "../../schema/types/anySchema";
import {ValidationError} from "../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";


export class ObjectConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = Objects.isPlain(args.value);

        return {isValid};

    }

    public get type(): string {
        return "IsObject"
    }

    public defaultMessage(args: ValidationParams): string {
        return `is not a valid object`
    }
}

