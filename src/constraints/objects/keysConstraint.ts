import {Objects, Promises} from "appolo-utils/index";
import {AnySchema} from "../../schema/types/anySchema";
import {ValidationError} from "../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../registerConstraint";
import {NumberSchema} from "../../schema/types/numberSchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {MinNumberConstraint} from "../numbers/minNumberConstraint";
import {ObjectSchema} from "../../schema/types/objectSchema";
import {When} from "../when/when";

export class KeysConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let schemasIndex = args.args[0] as { [index: string]: AnySchema };

        let keys = [...new Set(Object.keys(args.value).concat(Object.keys(schemasIndex)))];

        let results = await Promises.map(keys, key => this._validateProperty(schemasIndex, key, args));

        //let error = new ValidationError();

        let errors: ValidationError[] = [];

        for (let i = 0; i < results.length; i++) {
            let result = results[i], key = keys[i];
            if (result.errors && result.errors.length) {

                errors.push(...result.errors);

                if (args.object) {
                    for (let j = 0; j < result.errors.length; j++) {
                        result.errors[j].addParent({property: args.property, object: args.object})
                    }
                }


            } else if (!schemasIndex[key] && args.validateOptions.stripUnknown) {

                delete args.value[key];

            } else if (result.value !== undefined) {

                args.value[key] = result.value;
            }
        }

        if (errors.length == 0) {
            return {isValid: true}
        }


        return {isValid: false, errors};
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
        return `have in valid object keys`
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "keys",
    constraint: KeysConstraint
});

declare module '../../schema/types/objectSchema' {


    interface ObjectSchema {
        keys(schemaIndex: { [index: string]: AnySchema | Pick<When, any> }, options?: IConstraintOptions): this;
    }
}

