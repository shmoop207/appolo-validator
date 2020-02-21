import {Objects, Promises} from "appolo-utils/index";
import {AnySchema} from "../../schema/types/anySchema";
import {ValidationError} from "../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";


export class ObjectConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let isValid = Objects.isPlain(args.value);

        if (!isValid) {
            return {isValid};
        }

        let schemasIndex = args.args[0] as { [index: string]: AnySchema };

        let keys = [...new Set(Object.keys(args.value).concat(Object.keys(schemasIndex)))];

        let results = await Promises.map(keys, key => this._validateProperty(schemasIndex, key, args));

        let error = new ValidationError();

        for (let i = 0; i < results.length; i++) {
            let result = results[i], key = keys[i];
            if (result.errors && result.errors.length) {

                error.constraints.push(...result.errors)

            } else if (!schemasIndex[key] && args.validateOptions.stripUnknown) {

                delete args.value[key];

            } else if (args.value[key]) {

                args.value[key] = result.value;
            }
        }

        if (error.constraints.length == 0) {
            return {isValid: true}
        }

        error.message = this.defaultMessage(args);
        error.property = args.property;
        error.target = args.object;
        error.type = this.type;

        return {isValid: false, error};
    }

    private async _validateProperty(schemasIndex: { [index: string]: AnySchema }, key: string, args: ValidationParams): Promise<{ errors: ValidationError[], value: any }> {
        let schema = schemasIndex[key], value = args.value[key];

        if (!schema) {
            return {errors: [], value: value}
        }

        return args.validator.validate(schema, value, {
            ...(args.validateOptions || {}),
            object: args.value,
            property: key
        })
    }

    public get type(): string {
        return "IsObject"
    }

    public defaultMessage(args: ValidationParams): string {
        return `is not a valid object`
    }
}

