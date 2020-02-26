"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("./anySchema");
const objectConstraint_1 = require("../../constraints/objects/objectConstraint");
class ObjectSchema extends anySchema_1.AnySchema {
    constructor(options = {}) {
        super(options);
        this._type = "object";
        this.addConstraint({
            constraint: objectConstraint_1.ObjectConstraint,
            options: options,
            args: []
        });
    }
    get converter() {
        return require("../../converters/objects/jsonConverter").JsonConverter;
    }
}
exports.ObjectSchema = ObjectSchema;
function object(options) {
    return new ObjectSchema(options);
}
exports.object = object;
//# sourceMappingURL=objectSchema.js.map