"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("./anySchema");
const appolo_utils_1 = require("appolo-utils");
const arrayConstraint_1 = require("../../constraints/arrays/arrayConstraint");
class ArraySchema extends anySchema_1.AnySchema {
    constructor(schema, validationOptions = {}, schemaOptions = {}) {
        super(validationOptions, schemaOptions);
        this._type = "array";
        this.addConstraint({
            constraint: arrayConstraint_1.ArrayConstraint,
            options: validationOptions,
            args: schema ? [schema] : []
        });
    }
    async convert(value) {
        return typeof value === 'string' ? appolo_utils_1.Util.objects.tryParseJSON(value) || value : value;
    }
}
exports.ArraySchema = ArraySchema;
//# sourceMappingURL=arraySchema.js.map