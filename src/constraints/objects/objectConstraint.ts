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

        let keys = Object.keys(args.value);

        let results = await Promises.map(keys, (key, index) =>
            args.validator.validate(schemasIndex[key], args.value[key], {
                ...(args.validateOptions || {}),
                object: args.value,
                property: key
            }));

        let error = new ValidationError();

        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (result.error) {
                error.constraints.push(...result.error.constraints)
            } else {
                args.value[keys[i]] = result.value;
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

    public get type(): string {
        return "IsObject"
    }

    public defaultMessage(args: ValidationParams): string {
        return `is not a valid object`
    }
}

