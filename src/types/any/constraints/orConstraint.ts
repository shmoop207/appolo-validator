import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {any, AnySchema} from "../../../../";
import {Promises} from "@appolo/utils";
import {truncate} from "fs";
import {Validator} from "../../../validator/validator";

export class OrConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let schemas: AnySchema[] = params.args[0], value = params.value;

        if (!Array.isArray(schemas)) {
            schemas = [schemas];
        }

        let results = await Promises.someResolved(schemas.map((schema) => this._validateSchema(schema, value, params)), {
            fn: value => value.errors.length == 0
        });

        if (results.length > 0) {
            return {isValid: true, value: results[0].value.value}
        }

        return {isValid: false};
    }

    private _validateSchema(schema: AnySchema, value: any, params: ValidationParams) {

        return params.validator.validate(schema, value, {
            ...(params.validateOptions || {}),
            object: params.object,
            property: params.property
        })
    }

    public get type(): string {
        return "or"
    }

    public get defaultMessage(): string {
        return ""
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "or",
    constraint: OrConstraint,
    whiteList: true
});



export function or(schema: AnySchema | AnySchema[]): AnySchema {

    if (Array.isArray(schema)) {
        let [first, ...rest] = schema;

        return (first.or(rest) as AnySchema);
    }

    return schema
}
