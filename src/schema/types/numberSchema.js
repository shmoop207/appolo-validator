"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("./anySchema");
const numberConstraint_1 = require("../../constraints/numbers/numberConstraint");
const registerDecorator_1 = require("../../decorators/registerDecorator");
class NumberSchema extends anySchema_1.AnySchema {
    constructor(options = {}) {
        super(options);
        this._type = "number";
        this.addConstraint({
            constraint: numberConstraint_1.NumberConstraint,
            options: options,
            args: []
        });
    }
    get converter() {
        return require("../../converters/numbers/numberConverter").NumberConverter;
    }
}
exports.NumberSchema = NumberSchema;
function number(options) {
    let schema = new NumberSchema(options);
    return registerDecorator_1.registerDecorator.extend({ schema });
}
exports.number = number;
//# sourceMappingURL=numberSchema.js.map