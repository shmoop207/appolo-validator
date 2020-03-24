import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {any, AnySchema} from "../anySchema";
import {Promises} from "appolo-utils";
import {truncate} from "fs";
import {Validator} from "../../../validator/validator";
import {ValidationError} from "../../../common/errors/ValidationError";


export class AndConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let schemas: AnySchema[] = params.args[0], value = params.value;

        if (!Array.isArray(schemas)) {
            schemas = [schemas];
        }

        let results = await Promises.someRejected(schemas.map((schema) => this._validateSchema(schema, value, params)), {
            fn: value => value.errors.length == 0
        });

        if (results.length == 0) {
            return {isValid: true};
        }

        let errors = results[0].reason.errors;

        return {isValid: false, errors}

    }

    private _validateSchema(schema: AnySchema, value: any, params: ValidationParams) {

        return params.validator.validate(schema, value, {
            ...(params.validateOptions || {}),
            object: params.object,
            property: params.property
        })
    }

    public get type(): string {
        return "and"
    }

    public get defaultMessage(): string {
        return "${args.property} is not valid and condition"
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "and",
    constraint: AndConstraint,
    blackList: true
});



export function and(schema: AnySchema | AnySchema[]): AnySchema {
    return any().and(schema);
}
