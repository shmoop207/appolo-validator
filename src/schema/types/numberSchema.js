"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("./anySchema");
const numberConstraint_1 = require("../../constraints/numbers/numberConstraint");
class NumberSchema extends anySchema_1.AnySchema {
    constructor(validationOptions = {}, schemaOptions = {}) {
        super(validationOptions, schemaOptions);
        this._type = "number";
        this.addConstraint({
            constraint: numberConstraint_1.NumberConstraint,
            options: validationOptions,
            args: []
        });
    }
    async convert(value) {
        return typeof value === 'string' ? parseFloat(value) : value;
    }
}
exports.NumberSchema = NumberSchema;
//# sourceMappingURL=numberSchema.js.map