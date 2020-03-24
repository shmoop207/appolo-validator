import {AnySchema} from "../../any/anySchema";
import {Arrays} from "appolo-utils";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";
import {ArraySchema} from "../arraySchema";
import {Promises} from "appolo-utils/index";
import {ValidationError} from "../../../common/errors/ValidationError";


export class ContainsConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let schema: AnySchema = params.args[0];

       let promises=  params.value.map((item, i) => {
            return params.validator.validate(schema, item, {
                ...(params.validateOptions || {}),
                object: params.value,
                property: i
            });
        });

        let result = await Promises.someResolved<{ errors: ValidationError[], value: any }>(promises, {fn: value => value.errors.length ==0});

        return   {isValid: result.length >0};

    }

    public get type(): string {
        return "Contains"
    }

    public get defaultMessage(): string {
        return "${property} has invalid array values"
    }
}

registerConstraint.extend({
    base: ArraySchema,
    name: "has",
    constraint: ContainsConstraint
});


