import {Objects, Promises} from "appolo-utils/index";
import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ObjectSchema} from "../../object/objectSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";
import {FunctionSchema} from "../functionSchema";


export class ArgsSizeConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = params.value.length == params.args[0] ;

        return {isValid};

    }

    public get type(): string {
        return "ArgsSize"
    }

    public defaultMessage(args: ValidationParams): string {
        return `is not valid size`
    }
}

registerConstraint.extend({
    base: FunctionSchema,
    name: "argsSize",
    constraint: ArgsSizeConstraint
});

declare module '../functionSchema' {


    interface FunctionSchema {
        argsSize(limit: number | Ref, options?: IConstraintOptions): this;
    }
}
