import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {ObjectSchema} from "../objectSchema";
import {When} from "../../../when/when";
import {Promises} from "@appolo/utils";
import {PropertySymbol} from "../../../decorators/registerDecorator";

export class KeysConstraint implements IConstraint {

    public async validate(args: ValidationParams): Promise<IConstraintValidateResult> {

        if (!args.value) {
            return {isValid: false}
        }

        let schemasIndex = args.args[0] as { [index: string]: AnySchema };

        if (typeof schemasIndex == "function") {
            let meta = Reflect.getMetadata(PropertySymbol, (schemasIndex as Function).prototype);

            if (!meta) {
                throw new Error("invalid schema")
            }

            schemasIndex = meta;
        }


        let keys = [...new Set(Object.keys(args.value || {}).concat(Object.keys(schemasIndex)))];

        let results = await Promises.map<string, { invalidGroup?: boolean, errors: ValidationError[], value: any }>(keys, key => this._validateProperty(schemasIndex, key, args, {convertOnly: true}));

        results = await Promise.all(keys.map(key => this._validateProperty(schemasIndex, key, args, {validateOnly: true})));

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


            } else if (args.validateOptions.stripUnknown && (!schemasIndex[key] || result.invalidGroup)) {

                delete args.value[key];

            }
        }

        if (errors.length == 0) {
            return {isValid: true}
        }


        return {isValid: false, errors};
    }

    private async _validateProperty(schemasIndex: { [index: string]: AnySchema }, key: string, args: ValidationParams, runTypes: { validateOnly?: boolean, convertOnly?: boolean } = {}): Promise<{ invalidGroup?: boolean, errors: ValidationError[], value: any }> {
        let schema = schemasIndex[key], value = args.value[key];

        if (!schema) {
            return {errors: [], value: value}
        }

        let schem = args.validator.getSchema(schema);

        let constraintOptions = schem.getConstraintOptions();

        if (this._checkForInValidGroup(constraintOptions.groups, args.validateOptions.groups)) {
            return {errors: [], value: value, invalidGroup: true}
        }

        let result = await args.validator.validate(schem, value, {
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

    private _checkForInValidGroup(constraintGroups: string[], validatorGroups: string[]): boolean {
        return (constraintGroups
            && constraintGroups.length
            && validatorGroups
            && validatorGroups.length
            && !constraintGroups.every(group => validatorGroups.indexOf(group) > -1))
    }


    public get type(): string {
        return "IsObject"
    }

    public get defaultMessage(): string {
        return "${property} has invalid keys"
    }
}

registerConstraint
    .extend({
        base: ObjectSchema,
        name: "keys",
        constraint: KeysConstraint
    });



