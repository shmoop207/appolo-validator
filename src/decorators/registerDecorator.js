"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anySchema_1 = require("../schema/types/anySchema");
const appolo_utils_1 = require("appolo-utils");
const registerConstraint_1 = require("../schema/registerConstraint");
const registerConverter_1 = require("../schema/registerConverter");
exports.PropertySymbol = "__PropertySymbol__";
exports.SchemaFnSymbol = "@schema";
class RegisterDecorator {
    extend(params) {
        let { schema } = params;
        let fn = function (target, propertyKey, descriptor) {
            let validations = appolo_utils_1.ReflectMetadata.getNestedMetadata(exports.PropertySymbol, target, {});
            validations[propertyKey] = schema;
        };
        fn[exports.SchemaFnSymbol] = schema;
        let extended = registerConstraint_1.registerConstraint.constraints.get(schema.constructor)
            .concat(registerConstraint_1.registerConstraint.constraints.get(anySchema_1.AnySchema))
            .concat(registerConverter_1.registerConverter.converters.get(schema.constructor))
            .concat(registerConverter_1.registerConverter.converters.get(anySchema_1.AnySchema)).concat([{ name: "options" }]);
        for (let i = 0; i < extended.length; i++) {
            let constraint = extended[i];
            fn[constraint.name] = function () {
                let schema = fn[exports.SchemaFnSymbol];
                schema[constraint.name].apply(schema, arguments);
                return fn;
            };
        }
        return fn;
    }
}
exports.RegisterDecorator = RegisterDecorator;
exports.registerDecorator = new RegisterDecorator();
//# sourceMappingURL=registerDecorator.js.map