import {Objects, Classes} from "appolo-utils/index";
import {AnySchema} from "../../schema/types/anySchema";
import {ValidationError} from "../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../registerConstraint";
import {FunctionSchema} from "../../schema/types/functionSchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {KeysConstraint} from "../objects/keysConstraint";

export class IsClassConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = Classes.isClass(args.value);
        return {isValid};

    }

    public get type(): string {
        return "isClass"
    }

    public defaultMessage(args: ValidationParams): string {
        return `is not a valid class`
    }
}

registerConstraint.extend({
    base: FunctionSchema,
    name: "isClass",
    constraint: IsClassConstraint
});

declare module '../../schema/types/functionSchema' {

    interface FunctionSchema {
        isClass( options?: IConstraintOptions): this;
    }
}

