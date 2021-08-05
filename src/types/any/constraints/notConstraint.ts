import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {any, AnySchema} from "../anySchema";
import {Promises} from "@appolo/utils";
import {truncate} from "fs";
import {Validator} from "../../../validator/validator";
import {ValidationError} from "../../../common/errors/ValidationError";


export class NotConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let schema: AnySchema = params.args[0], value = params.value;

        let result = await params.validator.validate(schema, value, {
            ...(params.validateOptions || {}),
            object: params.object,
            property: params.property
        })


        if (result.errors.length == 0) {
            return {isValid: false, errors: [new ValidationError(`${params.property} invalid not condition`)]};
        }

        return {isValid: true}

    }

    private _validateSchema(schema: AnySchema, value: any, params: ValidationParams) {

        return params.validator.validate(schema, value, {
            ...(params.validateOptions || {}),
            object: params.object,
            property: params.property
        })
    }

    public get type(): string {
        return "not"
    }

    public get defaultMessage(): string {
        return "${args.property} is not valid and condition"
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "not",
    constraint: NotConstraint,
    blackList: true
});


export function not(schema: AnySchema ): AnySchema {
    return any().not(schema);
}
