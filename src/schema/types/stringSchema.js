"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("./anySchema");
const stringConstraint_1 = require("../../constraints/string/stringConstraint");
class StringSchema extends anySchema_1.AnySchema {
    constructor(options = {}) {
        super(options);
        this._type = "string";
        this.addConstraint({
            constraint: stringConstraint_1.StringConstraint,
            options: options,
            args: []
        });
    }
}
exports.StringSchema = StringSchema;
function string(options = {}) {
    return new StringSchema(options);
}
exports.string = string;
//# sourceMappingURL=stringSchema.js.map