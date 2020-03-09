"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerConstraint_1 = require("../schema/registerConstraint");
const anySchema_1 = require("../types/any/anySchema");
const ref_1 = require("../schema/ref");
class WhenConstraint {
    async validate(params) {
        let value = params.value, whenParams = params.args[0].params;
        let matchValue = this._getMatchedValue(whenParams, params);
        let matchedCase = await this._findMatchedCase(whenParams, params, matchValue);
        if (matchedCase && matchedCase.thenSchema) {
            return this._validateSchemaResult(matchedCase.thenSchema, value, params);
        }
        else if (whenParams.otherwise) {
            return this._validateSchemaResult(whenParams.otherwise, value, params);
        }
        else {
            return { isValid: true };
        }
    }
    _getMatchedValue(whenParams, params) {
        if (whenParams.prop instanceof ref_1.Ref) {
            return whenParams.prop.geValue(params);
        }
        if (typeof whenParams.prop === "function") {
            return whenParams.prop(params);
        }
        return params.value;
    }
    async _findMatchedCase(whenParams, params, value) {
        let matchedCase = null;
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
    async _matchCase(caseParams, params, value) {
        let groups = caseParams.groups, validationGroups = params.validateOptions.groups;
        if (groups && groups.length && validationGroups && validationGroups.length) {
            let validGroups = caseParams.groups.every(group => validationGroups.indexOf(group) > -1);
            return validGroups;
        }
        else if (caseParams.schema) {
            let result = await this._validateSchema(caseParams.schema, value, params);
            return result.errors.length == 0;
        }
        else if (caseParams.fn && typeof caseParams.fn == "function") {
            return caseParams.fn(params, value);
        }
        else if (caseParams.value !== undefined) {
            return value === caseParams.value;
        }
        else {
            return false;
        }
    }
    async _validateSchemaResult(schema, value, params) {
        let result = await this._validateSchema(schema, value, params);
        return { isValid: result.errors.length == 0, errors: result.errors, value: result.value };
    }
    _validateSchema(schema, value, params) {
        return params.validator.validate(schema, value, Object.assign(Object.assign({}, (params.validateOptions || {})), { object: params.object, property: params.property }));
    }
    get type() {
        return "condition";
    }
    get defaultMessage() {
        return "";
    }
}
exports.WhenConstraint = WhenConstraint;
registerConstraint_1.registerConstraint.extend({
    base: anySchema_1.AnySchema,
    name: "if",
    constraint: WhenConstraint,
    blackList: true
});
//# sourceMappingURL=whenConstraint.js.map