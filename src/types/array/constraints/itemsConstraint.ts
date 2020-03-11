import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {Promises} from "appolo-utils";
import {ValidationError} from "../../../common/errors/ValidationError";
import {any, AnySchema} from "../../any/anySchema";
import {ArraySchema} from "../arraySchema";
import {IClass} from "appolo-engine";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Schema} from "../../../schema/registerSchema";

export class ItemsConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let schema = params.args[0] as AnySchema;

        if (Array.isArray(schema)) {
            schema = any().or(schema);
        }

        let results = await Promises.map(params.value, (item, index) =>
            params.validator.validate(schema, item, {
                ...(params.validateOptions || {}),
                object: params.value,
                property: index
            }));

        let errors = ItemsConstraint.handleErrors(params, results);

        return {isValid: errors.length == 0, errors};
    }

    public static handleErrors(params: ValidationParams, results: { errors: ValidationError[], value: any }[]): ValidationError[] {
        let errors: ValidationError[] = [];

        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (result.errors && result.errors.length) {
                errors.push(...result.errors);

                if (params.object) {
                    for (let j = 0; j < result.errors.length; j++) {
                        result.errors[j].addParent({property: params.property, object: params.object})
                    }
                }

            } else {
                params.value[i] = result.value;
            }
        }

        return errors;
    }

    public get type(): string {
        return "array"
    }

    public get defaultMessage(): string {
        return "${property} has invalid array items"
    }
}

registerConstraint.extend({
    base: ArraySchema,
    name: "items",
    constraint: ItemsConstraint
});

declare module '../arraySchema' {


    interface ArraySchema {
        items(schema?: Schema | Schema[] | IClass | IClass[], options?: IConstraintOptions): this;
    }
}
