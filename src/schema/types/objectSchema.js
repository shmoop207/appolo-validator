"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("./anySchema");
const objectConstraint_1 = require("../../constraints/objects/objectConstraint");
const registerDecorator_1 = require("../../decorators/registerDecorator");
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
    let schema = new ObjectSchema(options);
    return registerDecorator_1.registerDecorator.extend({ schema });
}
exports.object = object;
//# sourceMappingURL=objectSchema.js.map