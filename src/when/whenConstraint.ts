import {IConstraint, IConstraintValidateResult, ValidationParams} from "../interfaces/IConstraint";
import {registerConstraint} from "../schema/registerConstraint";
import {IConstraintOptions} from "../interfaces/IConstraintOptions";
import {AnySchema} from "../types/any/anySchema";

import {ICaseParams} from "./ICaseParams";
import {IWhenParams} from "./IWhenParams";
import {When} from "./when";
import {Ref} from "../schema/ref";


export class WhenConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let value = params.value, whenParams = params.args[0].params as IWhenParams;

        let matchValue = this._getMatchedValue(whenParams, params);

        let matchedCase = await this._findMatchedCase(whenParams, params, matchValue);

        if (matchedCase && matchedCase.thenSchema) {
            return this._validateSchemaResult(matchedCase.thenSchema, value, params)
        } else if (whenParams.otherwise) {
            return this._validateSchemaResult(whenParams.otherwise, value, params)
        } else {
            return {isValid: true}
        }
    }

    private _getMatchedValue(whenParams: IWhenParams, params: ValidationParams): any {

        if (whenParams.prop instanceof Ref) {
            return whenParams.prop.geValue(params)
        }

        if (typeof whenParams.prop === "function") {
            return whenParams.prop(params);
        }

        return params.value;

    }

    private async _findMatchedCase(whenParams: IWhenParams, params: ValidationParams, value: any): Promise<ICaseParams> {
        let matchedCase: ICaseParams = null;
        for (let i = 0; i < whenParams.cases.length; i++) {
            let caseParams = whenParams.cases[i];
            let isMatch = await this._matchCase(caseParams, params, value);
            if (isMatch) {
                matchedCase = caseParams;
                break;
            }
        }

        return matchedCase;
    }

    private async _matchCase(caseParams: ICaseParams, params: ValidationParams, value: any): Promise<boolean> {

        let groups = caseParams.groups, validationGroups = params.validateOptions.groups;

        if (groups && groups.length && validationGroups && validationGroups.length) {

            let validGroups = caseParams.groups.every(group => validationGroups.indexOf(group) > -1);

            return validGroups;

        } else if (caseParams.schema) {

            let result = await this._validateSchema(caseParams.schema, value, params);
            return result.errors.length == 0;

        } else if (caseParams.fn && typeof caseParams.fn == "function") {

            return caseParams.fn(params, value);

        } else if (caseParams.value !== undefined) {

            return value === caseParams.value;

        } else {

            return false
        }
    }

    private async _validateSchemaResult(schema: AnySchema, value: any, params: ValidationParams):Promise<IConstraintValidateResult> {

        let result = await this._validateSchema(schema, value, params);

        return {isValid: result.errors.length == 0, errors: result.errors, value: result.value};
    }

    private _validateSchema(schema: AnySchema, value: any, params: ValidationParams) {

        return params.validator.validate(schema, value, {
            ...(params.validateOptions || {}),
            object: params.object,
            property: params.property
        });


    }


    public get type(): string {
        return "condition"
    }

    public defaultMessage(args: ValidationParams): string {
        return ``
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "if",
    constraint: WhenConstraint,
    blackList: true
});


declare module '../types/any/anySchema' {

    interface AnySchema {
        if(params: When): this;

    }
}
