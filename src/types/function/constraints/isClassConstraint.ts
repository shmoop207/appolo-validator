import {Objects, Classes} from "appolo-utils/index";
import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {FunctionSchema} from "../functionSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {KeysConstraint} from "../../object/constraints/keysConstraint";

export class IsClassConstraint implements IConstraint {

    public  validate(args: ValidationParams): IConstraintValidateResult {

        let isValid = Classes.isClass(args.value);
        return {isValid};

    }

    public get type(): string {
        return "isClass"
    }

    public get defaultMessage(): string {
        return "${property} is not valid class"
    }
}

registerConstraint.extend({
    base: FunctionSchema,
    name: "isClass",
    constraint: IsClassConstraint
});

declare module '../functionSchema' {

    interface FunctionSchema {
        isClass( options?: IConstraintOptions): this;
    }
}

