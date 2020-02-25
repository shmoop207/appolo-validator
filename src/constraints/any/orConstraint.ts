import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../../schema/registerConstraint";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {AnySchema} from "../../schema/types/anySchema";
import {Promises} from "appolo-utils";
import {truncate} from "fs";
import {Validator} from "../../validator/validator";


export class OrConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let schemas: AnySchema[] = params.args[0], value = params.value;

        if (!Array.isArray(schemas)) {
            schemas = [schemas];
        }

        let results = await Promise.all(schemas.map((schema) => this._validateSchema(schema, value, params)));

        for (let i = 0; i < results.length; i++) {
            let result = results[i];

            if (result.errors.length == 0) {
                return {isValid: true, value: result.value}
            }
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

    public defaultMessage(args: ValidationParams): string {
        return `${args.property || args.value} is required`
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "or",
    constraint: OrConstraint,
    whiteList: true
});

declare module '../../schema/types/anySchema' {

    interface AnySchema {
        or(schemas: AnySchema[] | AnySchema, options?: IConstraintOptions): this;
    }
}
