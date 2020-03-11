import {AnySchema} from "../../any/anySchema";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";
import {ArraySchema} from "../arraySchema";
import {Arrays} from "appolo-utils/index";
import {ValidationError} from "../../../common/errors/ValidationError";


export class UniqConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let fn = params.args[0] || ((item) => item);

        let uniq = Arrays.uniqBy(params.value, fn);


        return {isValid: uniq.length === params.value.length};

    }

    public get type(): string {
        return "uniq"
    }

    public get defaultMessage(): string {
        return "${property} array is not uniq"
    }
}

registerConstraint.extend({
    base: ArraySchema,
    name: "uniq",
    constraint: UniqConstraint
});

declare module '../arraySchema' {


    interface ArraySchema {
        uniq(fn?: ((item: any, index?: number) => any), options?: IConstraintOptions): this;
    }
}

