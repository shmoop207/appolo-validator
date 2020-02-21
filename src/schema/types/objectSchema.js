"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("./anySchema");
const objectConstraint_1 = require("../../constraints/objects/objectConstraint");
const index_1 = require("appolo-utils/index");
class ObjectSchema extends anySchema_1.AnySchema {
    constructor(schemaIndex, validationOptions = {}, schemaOptions = {}) {
        super(validationOptions, schemaOptions);
        this._type = "object";
        this.addConstraint({
            constraint: objectConstraint_1.ObjectConstraint,
            options: validationOptions,
            args: schemaIndex ? [schemaIndex] : []
        });
    }
    async convert(value) {
        return typeof value === 'string' ? index_1.Util.objects.tryParseJSON(value) || value : value;
    }
}
exports.ObjectSchema = ObjectSchema;
//# sourceMappingURL=objectSchema.js.map