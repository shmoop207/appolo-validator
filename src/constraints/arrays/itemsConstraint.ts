import {registerConstraint} from "../../schema/registerConstraint";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {Promises} from "appolo-utils";
import {ValidationError} from "../../common/errors/ValidationError";
import {AnySchema} from "../../schema/types/anySchema";
import {ArraySchema} from "../../schema/types/arraySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";

export class ItemsConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let schema = args.args[0] as AnySchema;

        let results = await Promises.map(args.value, (item, index) =>
            args.validator.validate(schema, item, {
                ...(args.validateOptions || {}),
                object: args.value,
                property: index
            }));

        let error = new ValidationError();


        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (result.errors && result.errors.length) {
                error.constraints.push(...result.errors)
            } else {
                args.value[i] = result.value;
            }
        }

        if (error.constraints.length == 0) {
            return {isValid: true}
        }
        error.property = args.property;
        error.target = args.object;
        error.type = this.type;
        error.message = this.defaultMessage(args);

        return {isValid: false, error};
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

declare module '../../schema/types/arraySchema' {

    interface ArraySchema {
        items(schema?: AnySchema, options?: IConstraintOptions): this;
    }
}
