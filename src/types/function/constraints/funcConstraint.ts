import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {FunctionSchema} from "../functionSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {KeysConstraint} from "../../object/constraints/keysConstraint";

export class FuncConstraint implements IConstraint {

    public  validate(args: ValidationParams): IConstraintValidateResult {

        let isValid = typeof args.value ==="function";
        return {isValid};

    }

    public get type(): string {
        return "isFunction"
    }

    public get defaultMessage(): string {
        return "${property}  is not valid function"
    }
}

registerConstraint.extend({
    base: FunctionSchema,
    name: "isFunction",
    constraint: FuncConstraint
});



