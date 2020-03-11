"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerDecorator_1 = require("../decorators/registerDecorator");
class RegisterSchema {
    extend(params) {
        let schema = new params.type(params.options || {});
        let fn = registerDecorator_1.registerDecorator.extend({ schema });
        return fn;
    }
}
exports.RegisterSchema = RegisterSchema;
exports.registerSchema = new RegisterSchema();
//# sourceMappingURL=registerSchema.js.map