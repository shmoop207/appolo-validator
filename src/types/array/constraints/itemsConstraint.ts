import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {Promises} from "appolo-utils";
import {ValidationError} from "../../../common/errors/ValidationError";
import {any, AnySchema} from "../../any/anySchema";
import {ArraySchema} from "../arraySchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";

export class ItemsConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let schema = args.args[0] as AnySchema;

        if (Array.isArray(schema)) {
            schema = any().or(schema);
        }

        let results = await Promises.map(args.value, (item, index) =>
            args.validator.validate(schema, item, {
                ...(args.validateOptions || {}),
                object: args.value,
                property: index
            }));

        let errors: ValidationError[] = [];

        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (result.errors && result.errors.length) {
                errors.push(...result.errors);

                if (args.object) {
                    for (let j = 0; j < result.errors.length; j++) {
                        result.errors[j].addParent({property: args.property, object: args.object})
                    }
                }


            } else {
                args.value[i] = result.value;
            }
        }

        if (errors.length == 0) {
            return {isValid: true}
        }

        return {isValid: false, errors};
    }

    public get type(): string {
        return "array"
    }

    public defaultMessage(args: ValidationParams): string {
        return `is not a valid array`
    }
}

registerConstraint.extend({
    base: ArraySchema,
    name: "items",
    constraint: ItemsConstraint
});

declare module '../arraySchema' {

    interface ArraySchema {
        items(schema?: AnySchema | AnySchema[], options?: IConstraintOptions): this;
    }
}
