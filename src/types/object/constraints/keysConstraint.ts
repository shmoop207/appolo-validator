import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {NumberSchema} from "../../number/numberSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {MinNumberConstraint} from "../../number/constraints/minNumberConstraint";
import {ObjectSchema} from "../objectSchema";
import {When} from "../../../when/when";
import {Promises} from "appolo-utils";

export class KeysConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        let schemasIndex = args.args[0] as { [index: string]: AnySchema };

        let keys = [...new Set(Object.keys(args.value).concat(Object.keys(schemasIndex)))];

        let results = await Promises.map(keys, key => this._validateProperty(schemasIndex, key, args, {convertOnly: true}));

        results = await Promises.map(keys, key => this._validateProperty(schemasIndex, key, args, {validateOnly: true}));

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

            }
        }

        if (errors.length == 0) {
            return {isValid: true}
        }


        return {isValid: false, errors};
    }

    private async _validateProperty(schemasIndex: { [index: string]: AnySchema }, key: string, args: ValidationParams, runTypes: { validateOnly?: boolean, convertOnly?: boolean } = {}): Promise<{ errors: ValidationError[], value: any }> {
        let schema = schemasIndex[key], value = args.value[key];

        if (!schema) {
            return {errors: [], value: value}
        }

        let result = await args.validator.validate(schema, value, {
            ...(args.validateOptions || {}),
            object: args.value,
            property: key,
            validateOnly: runTypes.validateOnly,
            convertOnly: runTypes.convertOnly
        });

        if (runTypes.convertOnly && result.value != undefined) {
            args.value[key] = result.value
        }

        return result;
    }

    public get type(): string {
        return "IsObject"
    }

    public get defaultMessage(): string {
        return "${property} has invalid keys"
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "keys",
    constraint: KeysConstraint
});

declare module '../objectSchema' {


    interface ObjectSchema {
        keys(schemaIndex: { [index: string]: AnySchema | Pick<When, any> }, options?: IConstraintOptions): this;
    }
}

