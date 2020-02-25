"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("./anySchema");
const arrayConstraint_1 = require("../../constraints/arrays/arrayConstraint");
class ArraySchema extends anySchema_1.AnySchema {
    constructor(options = {}) {
        super(options);
        this._type = "array";
        this.addConstraint({
            constraint: arrayConstraint_1.ArrayConstraint,
            options: options,
            args: []
        });
    }
    beforeValidate(options) {
        if (options.convert) {
            this.addConverter({
                converter: require("../../converters/objects/jsonConverter").JsonConverter,
                args: []
            }, true);
        }
        return super.beforeValidate(options);
    }
}
exports.ArraySchema = ArraySchema;
function array(options) {
    return new ArraySchema(options);
}
exports.array = array;
//# sourceMappingURL=arraySchema.js.map