import {Objects, Promises} from "appolo-utils/index";
import {AnySchema} from "../../schema/types/anySchema";
import {ValidationError} from "../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../registerConstraint";
import {ObjectSchema} from "../../schema/types/objectSchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {Ref} from "../../schema/types/ref";
import {FunctionSchema} from "../../schema/types/functionSchema";


export class MinArgsConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = params.value.length >= params.args[0] ;

        return {isValid};

    }

    public get type(): string {
        return "MinArgs"
    }

    public defaultMessage(args: ValidationParams): string {
        return `is not valid size`
    }
}

registerConstraint.extend({
    base: FunctionSchema,
    name: "minArgs",
    constraint: MinArgsConstraint
});

declare module '../../schema/types/functionSchema' {


    interface FunctionSchema {
        minArgs(limit: number | Ref, options?: IConstraintOptions): this;
    }
}

